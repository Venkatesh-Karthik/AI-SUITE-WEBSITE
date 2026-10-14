import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDownloadInfo } from "@/lib/download";

// Downloads require an authenticated session. The real installer URL
// (Google Drive) is never exposed to unauthenticated visitors — it only
// ever appears in a server-side redirect issued AFTER the session check
// below passes. The button/link in the UI always points here, never at
// DOWNLOAD_URL directly, and hiding the button client-side is NOT relied
// on for security: this check is authoritative.
export async function GET(req: NextRequest) {
  const info = getDownloadInfo();

  if (!info.configured || !info.url) {
    return NextResponse.json(
      { error: "The installer URL isn't configured yet. Set DOWNLOAD_URL in your environment." },
      { status: 503 }
    );
  }

  const session = await getServerSession(authOptions).catch(() => null);

  if (!session?.user?.id) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", "/api/download");
    return NextResponse.redirect(loginUrl, { status: 302 });
  }

  // Only successful, authenticated requests are ever recorded. Logging is
  // best-effort and never blocks the actual download.
  const forwardedFor = req.headers.get("x-forwarded-for");
  prisma.downloadEvent
    .create({
      data: {
        userId: session.user.id,
        version: info.version ?? "unknown",
        ipAddress: forwardedFor ? forwardedFor.split(",")[0].trim() : null,
        userAgent: req.headers.get("user-agent"),
      },
    })
    .catch((err) => console.error("Failed to log download event:", err));

  return NextResponse.redirect(info.url, { status: 302 });
}
