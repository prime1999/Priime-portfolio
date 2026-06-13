import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required.",
        },
        { status: 400 },
      );
    }

    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          message: "Mail service is not configured.",
        },
        { status: 500 },
      );
    }

    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "codingprime23@gmail.com",
      subject: `New lead from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #e5e7eb; background: #0f172a; padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
          <h2 style="margin: 0 0 16px; color: #60a5fa;">New portfolio message</h2>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 16px 0 0; white-space: pre-wrap; background: rgba(255,255,255,0.04); padding: 16px; border-radius: 8px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 },
    );
  }
}
