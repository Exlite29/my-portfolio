// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Email setup (Yahoo SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New message from ${name}`,
      text: message,
      html: `<p>New message from ${name} (${email}):</p><p>${message}</p>`,
    });

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("API Error:", error);

    const errMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        message: "Failed to send message",
        error: errMessage,
      },
      { status: 500 }
    );
  }
}
