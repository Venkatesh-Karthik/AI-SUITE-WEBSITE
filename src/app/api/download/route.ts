import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDownloadInfo } from "@/lib/download";

export async function GET() {
  const info = getDownloadInfo();

  if (!info.configured || !info.url) {
    return NextResponse.json(
      { error: "The installer URL isn't configured yet. Set DOWNLOAD_URL in your environment." },
      { status: 503 }
    );
  }

  // Logging is best-effort and never blocks the actual download.
  const session = await getServerSession(authOptions).catch(() => null);
  prisma.downloadEvent
    .create({ data: { userId: session?.user?.id ?? null, version: info.version ?? "unknown" } })
    .catch((err) => console.error("Failed to log download event:", err));

  return NextResponse.redirect(info.url, { status: 302 });
}
