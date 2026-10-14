import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

const bodySchema = z.object({ email: z.string().email() });

const OTP_TTL_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 45;

function generateCode() {
  // Cryptographically secure 6-digit code, "000000"–"999999".
  const n = crypto.randomInt(0, 1_000_000);
  return n.toString().padStart(6, "0");
}

export async function POST(req: NextRequest) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const email = parsed.data.email.trim().toLowerCase();

  // Per-email cooldown (resend spam) + per-IP request limit (abuse).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const [cooldown, ipLimit] = await Promise.all([
    rateLimit(`otp:cooldown:${email}`, 1, RESEND_COOLDOWN_SECONDS),
    rateLimit(`otp:ip:${ip}`, 10, 60 * 60),
  ]);

  if (!cooldown.allowed) {
    return NextResponse.json(
      { error: `Please wait before requesting another code.`, cooldown: RESEND_COOLDOWN_SECONDS },
      { status: 429 }
    );
  }
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  // Invalidate any still-active codes for this email, then store the new one.
  await prisma.$transaction([
    prisma.otpCode.updateMany({
      where: { email, consumedAt: null },
      data: { consumedAt: new Date() },
    }),
    prisma.otpCode.create({ data: { email, codeHash, expiresAt } }),
  ]);

  try {
    await sendOtpEmail(email, code);
  } catch (err) {
    console.error("OTP email send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send the verification email. Check the email service configuration." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, expiresInMinutes: OTP_TTL_MINUTES });
}
