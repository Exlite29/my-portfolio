// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/** Field caps mirror the client-side maxLengths (types/client contract). */
const LIMITS = { name: 100, email: 150, message: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Naive in-memory rate limiter: 5 sends / 10 min per IP.
 * Good enough for a single-instance portfolio deploy; on serverless each
 * isolate keeps its own map, so scale beyond that would need an external
 * store (e.g. Upstash) — deliberately not added preemptively.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  // Prevent unbounded growth from spoofed/varied IPs.
  if (hits.size > 1000) hits.clear();

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent); // keep timestamps fresh for pruning
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );
}

/** The API never trusts the client's sanitizeInput — escape server-side. */
function sanitize(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim() : "";
}

let cachedTransporter: nodemailer.Transporter | null = null;

/** Lazily create one SMTP transport (reused across requests) after the env is validated. */
function getTransporter(): nodemailer.Transporter | null {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !EMAIL_TO) return null;
  if (cachedTransporter) return cachedTransporter;

  const port = Number(process.env.SMTP_PORT ?? 587);
  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 = implicit TLS; 587 etc. = STARTTLS (secure must be false there).
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return cachedTransporter;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many messages — please try again in a little while." },
        { status: 429 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    // Type checks first: numeric/null fields are rejected, not coerced.
    if (
      typeof body.name !== "string" ||
      typeof body.email !== "string" ||
      typeof body.message !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid field values" },
        { status: 400 },
      );
    }

    // Length caps are evaluated against the raw payload.
    if (
      body.name.length > LIMITS.name ||
      body.email.length > LIMITS.email ||
      body.message.length > LIMITS.message
    ) {
      return NextResponse.json(
        { message: "One or more fields exceed the maximum length" },
        { status: 400 },
      );
    }

    const name = body.name.trim();
    const email = body.email.trim();
    const message = body.message.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    const transporter = getTransporter();
    if (!transporter) {
      // Misconfigured deployment — user gets a soft message, we get a log.
      console.error("Contact API: SMTP env vars are not configured");
      return NextResponse.json(
        { message: "Email service is temporarily unavailable" },
        { status: 503 },
      );
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      // The subject never takes raw newlines (header-injection guard).
      subject: `New message from ${sanitize(name)}`,
      text: message,
      html: `<p>New message from <strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}):</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("API Error:", error);

    // Never leak internal SMTP error details to the client.
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
