import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload received in request." },
      { status: 400 }
    );
  }

  try {
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    // 1. If Resend is configured via RESEND_API_KEY
    if (resendApiKey) {
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL || "kshitij.dev@example.com",
            subject: `Portfolio Message from ${name}: ${subject || "No Subject"}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });

        if (!resendResponse.ok) {
          const resendError = await resendResponse.json();
          console.error("Resend delivery failed:", resendError);
          return NextResponse.json(
            { error: "Failed to dispatch email via Resend." },
            { status: 502 }
          );
        }

        return NextResponse.json(
          { success: true, message: "Your message was sent successfully via Resend!" },
          { status: 200 }
        );
      } catch (err) {
        console.error("Resend dispatch exception:", err);
      }
    }

    // 2. If Formspree is configured via FORMSPREE_ENDPOINT
    if (formspreeEndpoint) {
      try {
        const formspreeResponse = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        });

        if (!formspreeResponse.ok) {
          return NextResponse.json(
            { error: "Failed to dispatch message to Formspree." },
            { status: 502 }
          );
        }

        return NextResponse.json(
          { success: true, message: "Your message was forwarded successfully via Formspree!" },
          { status: 200 }
        );
      } catch (err) {
        console.error("Formspree dispatch exception:", err);
      }
    }

    // 3. Development / Zero-Config fallback: logs to console and returns 200 OK
    console.log("[PORTFOLIO CONTACT FORM SUBMISSION RECEIVED]:", {
      name,
      email,
      subject: subject || "N/A",
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        simulated: true,
        message:
          "Thank you! Your message was received in development mode (Configure RESEND_API_KEY or FORMSPREE_ENDPOINT in .env for production forwarding).",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing message." },
      { status: 500 }
    );
  }
}
