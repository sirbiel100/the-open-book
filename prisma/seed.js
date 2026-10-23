const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const books = [
  { id: "night-circus", title: "The Night Circus", author: "Erin Morgenstern", price: 18, category: "Fiction", image: "/images/night-circus.jpg", alt: "The Night Circus by Erin Morgenstern book cover", featured: false },
  { id: "hail-mary", title: "Project Hail Mary", author: "Andy Weir", price: 20, category: "Fiction", image: "/images/hail-mary.jpg", alt: "Project Hail Mary by Andy Weir book cover", featured: false },
  { id: "normal-people", title: "Normal People", author: "Sally Rooney", price: 16, category: "Fiction", image: "/images/normal-people.jpg", alt: "Normal People by Sally Rooney book cover", featured: false },
  { id: "klara-sun", title: "Klara and the Sun", author: "Kazuo Ishiguro", price: 19, category: "Fiction", image: "/images/klara-and-the-sun.jpg", alt: "Klara and the Sun by Kazuo Ishiguro book cover", featured: false },
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", price: 17, category: "Nonfiction", image: "/images/atomic-habits.jpg", alt: "Atomic Habits by James Clear book cover", featured: false },
  { id: "sapiens", title: "Sapiens", author: "Yuval Noah Harari", price: 21, category: "Nonfiction", image: "/images/sapiens.jpg", alt: "Sapiens by Yuval Noah Harari book cover", featured: false },
  { id: "educated", title: "Educated", author: "Tara Westover", price: 18, category: "Nonfiction", image: "/images/educated.jpg", alt: "Educated by Tara Westover book cover", featured: false },
  { id: "creative-act", title: "The Creative Act", author: "Rick Rubin", price: 22, category: "Nonfiction", image: "/images/creative-act.jpg", alt: "The Creative Act by Rick Rubin book cover", featured: false },
  { id: "midnight-library", title: "The Midnight Library", author: "Matt Haig", price: 18, category: "Fiction", image: "/images/midnight-library.jpg", alt: "The Midnight Library by Matt Haig book cover", featured: true }
];
const staffPicks = [
  { id: "tomorrow", number: "01", title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", description: "A beautiful story about friendship, creativity, and the complicated relationships behind making something together." },
  { id: "pachinko", number: "02", title: "Pachinko", author: "Min Jin Lee", description: "An unforgettable multigenerational story about family, identity, and finding a place in the world." },
  { id: "deep-work", number: "03", title: "Deep Work", author: "Cal Newport", description: "A practical exploration of how focused work can help us create better results in an increasingly distracted world." }
];
const events = [
  { id: "local-authors", month: "OCT", day: "12", type: "Author Reading", title: "An Evening with Local Authors", time: "7:00 PM" },
  { id: "fiction-club", month: "OCT", day: "19", type: "Book Club", title: "October Fiction Club", time: "6:30 PM" },
  { id: "writing-evening", month: "OCT", day: "26", type: "Workshop", title: "Creative Writing Evening", time: "6:00 PM" }
];

async function main() {
  for (const book of books) await prisma.book.upsert({ where: { id: book.id }, update: book, create: book });
  for (const pick of staffPicks) await prisma.staffPick.upsert({ where: { id: pick.id }, update: pick, create: pick });
  for (const event of events) await prisma.storeEvent.upsert({ where: { id: event.id }, update: event, create: event });
  console.log(`Seeded ${books.length} books, ${staffPicks.length} staff picks, and ${events.length} events.`);
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
