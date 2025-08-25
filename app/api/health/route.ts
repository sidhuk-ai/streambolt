import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
      status: "ok",
      timestamp: Date.now(),
      app: "streambolt",
      version: "1.0.0",
      environment: process.env.NODE_ENV,
      uptime: process.uptime() + "s",
    },
    { status: 200 }
  );
}