"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import MainContent from "./MainContent";
import Footer from "./Footer";

export default function HomeClient() {
  const [store, setStore] = useState({
    books: [],
    featuredBook: null,
    staffPicks: [],
    events: [],
  });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    async function loadStore() {
      try {
        const response = await fetch("/api/store", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Could not load store data.");
        if (!cancelled) {
          setStore(data);
          setStatus("ready");
        }
      } catch (error) {
        if (!cancelled)
          setStatus(error.message || "Could not connect to the store API.");
      }
    }
    loadStore();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f3eb] text-[#2c2925]">
      <Header />
      <Hero book={store.featuredBook} />
      {status === "loading" && (
        <p
          className="mx-auto max-w-7xl px-5 pb-5 text-sm text-[#756f66]"
          role="status"
        >
          Loading the catalogue from our database…
        </p>
      )}
      {status !== "loading" && status !== "ready" && (
        <div
          role="alert"
          className="mx-5 mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 sm:mx-8 lg:mx-auto lg:max-w-7xl"
        >
          {status} Make sure your database is configured and the seed script has
          been run.
        </div>
      )}
      <MainContent
        books={store.books}
        staffPicks={store.staffPicks}
        events={store.events}
      />
      <Footer />
    </div>
  );
}
