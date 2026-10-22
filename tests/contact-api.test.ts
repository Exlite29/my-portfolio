import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { sendMailMock } = vi.hoisted(() => ({ sendMailMock: vi.fn() }));

// Replace SMTP with a mock so the suite never touches the network.
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail: sendMailMock })),
  },
}));

import { POST } from "../app/api/contact/route";

let ipCounter = 0;

/** Unique source IP per request so the rate limiter never bleeds across tests. */
function uniqueIp(): string {
  ipCounter += 1;
  return `10.1.0.${ipCounter}`;
}

function makeRequest(
  body: unknown,
  { ip = uniqueIp(), raw = false }: { ip?: string; raw?: boolean } = {},
): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: raw ? (body as string) : JSON.stringify(body),
  });
}

async function post(
  body: unknown,
  options?: { ip?: string; raw?: boolean },
): Promise<{ status: number; json: { message?: string } }> {
  const response = await POST(makeRequest(body, options));
  return { status: response.status, json: await response.json() };
}

const validBody = {
  name: "Alice",
  email: "alice@example.com",
  message: "Hello from the test suite",
};

beforeEach(() => {
  process.env.SMTP_HOST = "smtp.test";
  process.env.SMTP_USER = "user";
  process.env.SMTP_PASS = "pass";
  process.env.EMAIL_FROM = "from@test.dev";
  process.env.EMAIL_TO = "to@test.dev";

  sendMailMock.mockReset();
  sendMailMock.mockResolvedValue({ messageId: "test-message" });
});

describe("POST /api/contact", () => {
  it("sends the email with an escaped HTML body", async () => {
    const result = await post({
      name: "Alice <b>",
      email: "alice@example.com",
      message: 'Hello <script>alert("x")</script>\nSecond line',
    });

    expect(result.status).toBe(200);
    expect(result.json.message).toBe("Message sent successfully!");
    expect(sendMailMock).toHaveBeenCalledTimes(1);

    const mail = sendMailMock.mock.calls[0][0] as Record<string, string>;
    // Injected HTML must arrive as text, never as markup.
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).toContain("&lt;b&gt;");
    expect(mail.html).not.toContain("<script>");
    // Newlines are preserved as line breaks in the HTML part.
    expect(mail.html).toContain("<br />");
    // Plain-text part stays readable.
    expect(mail.text).toBe('Hello <script>alert("x")</script>\nSecond line');
  });

  it("strips newlines from the subject (header injection guard)", async () => {
    const result = await post({ ...validBody, name: "Alice\r\nBcc: evil@example.com" });

    expect(result.status).toBe(200);
    const mail = sendMailMock.mock.calls[0][0] as Record<string, string>;
    expect(mail.subject).toBe("New message from Alice Bcc: evil@example.com");
    expect(mail.subject).not.toMatch(/[\r\n]/);
  });

  it("rejects empty fields", async () => {
    const result = await post({ name: "", email: "", message: "" });
    expect(result.status).toBe(400);
    expect(result.json.message).toBe("All fields are required");
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("rejects non-string field types", async () => {
    const result = await post({ name: 123, email: validBody.email, message: "hi" });
    expect(result.status).toBe(400);
    expect(result.json.message).toBe("Invalid field values");
  });

  it("rejects fields over the length caps", async () => {
    const result = await post({ ...validBody, message: "x".repeat(2001) });
    expect(result.status).toBe(400);
    expect(result.json.message).toMatch(/maximum length/);
  });

  it("rejects an invalid email address", async () => {
    const result = await post({ ...validBody, email: "not-an-email" });
    expect(result.status).toBe(400);
    expect(result.json.message).toBe("Please provide a valid email address");
  });

  it("rejects malformed JSON", async () => {
    const result = await post("this is not json", { raw: true });
    expect(result.status).toBe(400);
    expect(result.json.message).toBe("Invalid request body");
  });

  it("returns 503 without leaking config details when SMTP env is missing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    delete process.env.SMTP_HOST;

    const result = await post(validBody);

    expect(result.status).toBe(503);
    expect(result.json.message).toBe("Email service is temporarily unavailable");
    expect(JSON.stringify(result.json)).not.toMatch(/smtp|SMTP_HOST/i);
    errorSpy.mockRestore();
  });

  it("returns a generic 500 when SMTP fails (no internal leakage)", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    sendMailMock.mockRejectedValueOnce(new Error("535 5.7.8 authentication failed"));

    const result = await post(validBody);

    expect(result.status).toBe(500);
    expect(result.json.message).not.toMatch(/535|authentication/);
    errorSpy.mockRestore();
  });

  it("rate limits after 5 requests from the same IP", async () => {
    const ip = uniqueIp();

    for (let i = 0; i < 5; i += 1) {
      const allowed = await post(validBody, { ip });
      expect(allowed.status).toBe(200);
    }

    const blocked = await post(validBody, { ip });
    expect(blocked.status).toBe(429);
    expect(blocked.json.message).toMatch(/too many/i);
    expect(sendMailMock).toHaveBeenCalledTimes(5);
  });
});
