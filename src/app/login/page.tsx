"use client";

import { Suspense, useState, useRef, useEffect, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Atmosphere } from "@/components/Atmosphere";

type Step = "email" | "otp";

const RESEND_COOLDOWN = 45;

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState<"idle" | "google" | "send" | "verify" | "resend">("idle");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // NextAuth redirects back here with ?error=... when Google OAuth fails
  // (denied consent, misconfigured callback URL, etc).
  useEffect(() => {
    const oauthError = params.get("error");
    if (oauthError) {
      setError(
        oauthError === "OAuthAccountNotLinked"
          ? "That email is already linked to a different sign-in method."
          : "Google sign-in failed. Please try again."
      );
    }
  }, [params]);

  useEffect(() => {
    if (cooldown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cooldown]);

  async function handleGoogle() {
    setError(null);
    setLoading("google");
    try {
      await signIn("google", { callbackUrl });
      // signIn navigates away on success; if it resolves here without
      // redirecting, NextAuth already surfaced an error via the URL.
    } catch {
      setError("Couldn't reach Google. Check your connection and try again.");
      setLoading("idle");
    }
  }

  async function requestCode(e?: FormEvent) {
    e?.preventDefault();
    setError(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(step === "otp" ? "resend" : "send");
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Couldn't send the code. Try again.");
        if (res.status === 429) setCooldown(data.cooldown ?? RESEND_COOLDOWN);
        setLoading("idle");
        return;
      }

      setStep("otp");
      setCode("");
      setCooldown(RESEND_COOLDOWN);
      setLoading("idle");
    } catch {
      setError("Network error. Check your connection and try again.");
      setLoading("idle");
    }
  }

  async function verifyCode(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the 6-digit code from your email.");
      return;
    }

    setLoading("verify");
    try {
      const result = await signIn("email-otp", { email, code, redirect: false, callbackUrl });
      if (result?.error) {
        setError("That code is invalid or has expired. Request a new one if needed.");
        setLoading("idle");
        return;
      }
      router.push(callbackUrl);
    } catch {
      setError("Network error verifying your code. Try again.");
      setLoading("idle");
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <Atmosphere variant="hero" />
      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-10">
          <Logo size={44} showWordmark={false} priority />
          <p className="font-display font-bold tracking-[0.3em] text-sm mt-4">AI SUITE</p>
          <h1 className="font-display text-2xl font-bold mt-3">
            {step === "email" ? "Welcome back" : "Verify your email"}
          </h1>
          {step === "otp" && (
            <p className="text-sm text-core-muted mt-2">
              We sent a code to <span className="text-core-text">{email}</span>
            </p>
          )}
        </div>

        <div className="glass-panel rounded-xl p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]">
          {step === "email" && (
            <>
              <button
                onClick={handleGoogle}
                disabled={loading === "google"}
                className="w-full flex items-center justify-center gap-3 rounded-md border border-core-line py-3 text-sm font-medium hover:border-suite/60 transition-colors disabled:opacity-50"
              >
                {loading === "google" ? "Connecting to Google…" : "Continue with Google"}
              </button>

              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-core-line" />
                <span className="text-xs text-core-muted uppercase tracking-widest">or</span>
                <div className="h-px flex-1 bg-core-line" />
              </div>

              <form onSubmit={requestCode} className="flex flex-col gap-3">
                <label htmlFor="email" className="text-xs text-core-muted uppercase tracking-widest">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-core-panel2 border border-core-line rounded-md px-4 py-3 text-sm focus:border-suite outline-none"
                />
                <button
                  type="submit"
                  disabled={loading === "send" || cooldown > 0}
                  className="mt-2 rounded-md bg-suite text-core-bg font-display font-semibold text-sm py-3 tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading === "send"
                    ? "Sending…"
                    : cooldown > 0
                    ? `Wait ${cooldown}s`
                    : "Send verification code"}
                </button>
              </form>
            </>
          )}

          {step === "otp" && (
            <form onSubmit={verifyCode} className="flex flex-col gap-3">
              <label htmlFor="code" className="text-xs text-core-muted uppercase tracking-widest">
                6-digit code
              </label>
              <input
                id="code"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className="bg-core-panel2 border border-core-line rounded-md px-4 py-3 text-center text-2xl tracking-[0.5em] font-mono focus:border-suite outline-none"
              />
              <button
                type="submit"
                disabled={loading === "verify"}
                className="mt-2 rounded-md bg-suite text-core-bg font-display font-semibold text-sm py-3 tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading === "verify" ? "Verifying…" : "Verify & continue"}
              </button>

              <div className="flex items-center justify-between text-xs text-core-muted mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setError(null);
                  }}
                  className="hover:text-core-text"
                >
                  ← Use a different email
                </button>
                <button
                  type="button"
                  onClick={() => requestCode()}
                  disabled={cooldown > 0 || loading === "resend"}
                  className="hover:text-core-text disabled:opacity-50"
                >
                  {loading === "resend" ? "Resending…" : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                </button>
              </div>
            </form>
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm text-friday text-center">
              {error}
            </p>
          )}
        </div>

        <p className="text-xs text-core-muted text-center mt-6">
          By continuing you agree to the{" "}
          <a href="/terms" className="hover:text-core-text underline">Terms</a> and{" "}
          <a href="/privacy" className="hover:text-core-text underline">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}
