"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { motion } from "framer-motion";
import { Hexagon, Loader2, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { auth } from "@/lib/firebase";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [resetSent, setResetSent] = useState(false);

  const inactivityNotice = params.get("reason") === "inactivity";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      console.error(err);
      setError("Couldn't send reset email. Check the address and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh-radial px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-sm p-8"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forge-gradient">
            <Hexagon className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold text-white">
            PixelForge Admin
          </span>
        </div>

        {inactivityNotice && (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-forge-cyan/30 bg-forge-cyan/10 px-4 py-3 text-xs text-forge-cyan">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            You were signed out after a period of inactivity.
          </div>
        )}

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <h1 className="font-display text-xl font-semibold text-white">Sign in</h1>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-mist-500">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-700" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@pixelforgestudio.com"
                  className="input pl-9"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-mist-500">
                Password
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-700" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-9"
                />
              </div>
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-400">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("reset");
                setError(null);
              }}
              className="w-full text-center text-xs text-mist-500 hover:text-white"
            >
              Forgot your password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="mt-8 space-y-5">
            <h1 className="font-display text-xl font-semibold text-white">Reset password</h1>
            <p className="text-sm text-mist-500">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-mist-500">
                Email
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@pixelforgestudio.com"
                className="input"
              />
            </label>

            {resetSent && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-400">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                Reset email sent. Check your inbox.
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-400">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setResetSent(false);
              }}
              className="w-full text-center text-xs text-mist-500 hover:text-white"
            >
              Back to sign in
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
