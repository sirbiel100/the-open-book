"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isSignup) {
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Could not create account.");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (!result || result.error)
        throw new Error(
          isSignup
            ? "Account created, but sign-in failed. Please sign in."
            : "Email or password is incorrect.",
        );
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError.message || "Something went wrong. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#ded7ca] bg-[#fffdf8] p-6 shadow-xl shadow-[#2c2925]/5 sm:p-9">
        <Link href="/" className="font-serif text-2xl font-bold text-[#2c2925]">
          The Open Book<span className="text-[#8b4a3c]">.</span>
        </Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#8b4a3c]">
          Reader account
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[#2c2925]">
          {isSignup ? "Join our reading community" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#756f66]">
          {isSignup
            ? "Create an account to become part of The Open Book."
            : "Sign in to your account to continue."}
        </p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {isSignup && (
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-[#51473e]"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-[#ded7ca] bg-white px-3 text-sm outline-none focus:border-[#8b4a3c] focus:ring-2 focus:ring-[#8b4a3c]/15"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-[#51473e]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-[#ded7ca] bg-white px-3 text-sm outline-none focus:border-[#8b4a3c] focus:ring-2 focus:ring-[#8b4a3c]/15"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-[#51473e]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              required
              minLength={isSignup ? 8 : undefined}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-11 w-full rounded-xl border border-[#ded7ca] bg-white px-3 text-sm outline-none focus:border-[#8b4a3c] focus:ring-2 focus:ring-[#8b4a3c]/15"
            />
            {isSignup && (
              <p className="mt-1 text-xs text-[#756f66]">
                Use at least 8 characters.
              </p>
            )}
          </div>
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button
            disabled={busy}
            type="submit"
            className="min-h-12 w-full rounded-full bg-[#8b4a3c] px-5 py-3 text-sm font-bold hover:cursor-pointer text-white transition hover:bg-[#68362d] disabled:cursor-wait disabled:opacity-60"
          >
            {busy ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#756f66]">
          {isSignup ? "Already have an account?" : "New to The Open Book?"}{" "}
          <Link
            className="font-bold text-[#8b4a3c] hover:underline"
            href={isSignup ? "/login" : "/signup"}
          >
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
        <Link
          href="/"
          className="mt-5 block text-center text-sm text-[#756f66] hover:text-[#8b4a3c]"
        >
          ← Back to the bookstore
        </Link>
      </div>
    </main>
  );
}
