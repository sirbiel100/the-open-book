"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const links = [
  ["Home", "#home"], ["Books", "#books"], ["Staff Picks", "#staff-picks"],
  ["Events", "#events"], ["About", "#about"],
];

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed z-20 w-full border-b border-[#ded7ca]/80 bg-[#f7f3eb]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <Link href="#home" className="w-fit font-serif text-2xl font-bold tracking-tight text-[#2c2925] sm:text-[1.7rem]">
          The Open Book<span className="text-[#8b4a3c]">.</span>
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:justify-end md:gap-5">
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[#756f66] sm:gap-x-5">
            {links.map(([label, href]) => <a key={href} href={href} className="rounded-sm py-1 transition-colors hover:text-[#8b4a3c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b4a3c]">{label}</a>)}
          </nav>
          <div className="flex items-center gap-3 text-sm font-semibold">
            {status === "loading" ? <span className="text-[#756f66]">Checking session…</span> : session?.user ? (
              <>
                <span className="max-w-32 truncate text-[#756f66]" title={session.user.email}>{session.user.name || session.user.email}</span>
                <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="rounded-full border border-[#8b4a3c] px-4 py-2 text-[#8b4a3c] transition hover:bg-[#8b4a3c] hover:text-white">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[#8b4a3c] hover:underline">Sign in</Link>
                <Link href="/signup" className="rounded-full bg-[#8b4a3c] px-4 py-2 text-white transition hover:bg-[#68362d]">Join us</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
