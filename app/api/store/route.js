import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [books, featuredBook, staffPicks, events] = await Promise.all([
      prisma.book.findMany({ where: { featured: false }, orderBy: { title: "asc" } }),
      prisma.book.findFirst({ where: { featured: true } }),
      prisma.staffPick.findMany({ orderBy: { number: "asc" } }),
      prisma.storeEvent.findMany({ orderBy: [{ month: "asc" }, { day: "asc" }] }),
    ]);

    return NextResponse.json({ books, featuredBook, staffPicks, events });
  } catch (error) {
    console.error("Store API error:", error);
    return NextResponse.json({ error: "Store data is unavailable. Check the database connection and seed data." }, { status: 500 });
  }
}
