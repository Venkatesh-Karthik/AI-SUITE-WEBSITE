import { Resend } from "resend";

// Swap this file for another provider (Postmark/SES/SendGrid) if needed —
// nothing else in the auth flow depends on Resend specifically.

let resendClient: Resend | null = null;

function getClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to .env to enable OTP email delivery."
    );
  }
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

export async function sendOtpEmail(email: string, code: string) {
  const from = process.env.EMAIL_FROM;
  if (!from) {
    throw new Error("EMAIL_FROM is not set. Add it to .env to enable OTP email delivery.");
  }

  const client = getClient();

  const { error } = await client.emails.send({
    from,
    to: email,
    subject: `${code} is your AI Suite verification code`,
    text: `Your AI Suite verification code is ${code}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
    html: `
      <div style="font-family: sans-serif; background:#0A0E14; color:#E7ECF2; padding:32px;">
        <p style="letter-spacing:0.3em; font-size:12px; color:#8894A6; text-transform:uppercase;">AI Suite</p>
        <h1 style="font-size:32px; letter-spacing:0.1em; margin:8px 0 16px;">${code}</h1>
        <p style="color:#8894A6; font-size:14px;">This code expires in 10 minutes. If you didn't request it, ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}
