import { useState } from "react";
import { books, staffPicks, events } from "../data/storeData.js";
import BookCard from "./BookCard.jsx";

const categories = ["All", "Fiction", "Nonfiction"];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8b4a3c]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl leading-tight tracking-tight text-[#2c2925] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 leading-7 text-[#756f66]">{description}</p>
      )}
    </div>
  );
}

export default function MainContent() {
  // The selected category is state, so React re-renders when a filter is clicked.
  const [activeCategory, setActiveCategory] = useState("All");

  // The parent owns saved-book state and passes each value down to SaveToggle.
  const [savedBookIds, setSavedBookIds] = useState([]);

  const filteredBooks =
    activeCategory === "All"
      ? books
      : books.filter((book) => book.category === activeCategory);

  function updateSavedBook(bookId, shouldSave) {
    setSavedBookIds((currentIds) => {
      if (shouldSave) {
        return currentIds.includes(bookId)
          ? currentIds
          : [...currentIds, bookId];
      }
      return currentIds.filter((id) => id !== bookId);
    });
  }

  return (
    <main>
      <section
        id="books"
        className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="Browse our shelves"
            title="Find your next favorite book"
            description="From imaginative worlds to fascinating real-life stories, there's something for every kind of reader."
          />

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter books by category"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b4a3c] ${
                      isActive
                        ? "border-[#8b4a3c] bg-[#8b4a3c] text-white"
                        : "border-[#ded7ca] bg-[#fffdf8]/75 text-[#756f66] hover:border-[#8b4a3c] hover:text-[#8b4a3c] hover:cursor-pointer"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-[#756f66]" aria-live="polite">
              Showing{" "}
              <span className="font-bold text-[#2c2925]">
                {filteredBooks.length}
              </span>{" "}
              {filteredBooks.length === 1 ? "book" : "books"}
              {savedBookIds.length > 0 && (
                <span> · {savedBookIds.length} saved</span>
              )}
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                saved={savedBookIds.includes(book.id)}
                onSavedChange={(shouldSave) =>
                  updateSavedBook(book.id, shouldSave)
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="staff-picks"
        className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="Recommended by us"
            title="Staff Picks"
            description="The books currently sitting on our desks, nightstands, and coffee tables."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {staffPicks.map((pick) => (
              <div className="flex min-w-0 gap-4 rounded-2xl border border-[#ded7ca]/80 bg-[#fffdf8]/65 p-5 sm:p-6">
                <span className="font-serif text-2xl text-[#8b4a3c]/70">
                  {pick.number}
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-xl leading-snug text-[#2c2925]">
                    {pick.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#8b4a3c]">{pick.author}</p>
                  <p className="mt-4 text-sm leading-6 text-[#756f66]">
                    {pick.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="events"
        className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading eyebrow="Come read with us" title="Upcoming Events" />
          <div className="space-y-3">
            {events.map((event) => (
              <div className="flex min-w-0 flex-col gap-4 rounded-2xl border border-[#ded7ca]/80 bg-[#fffdf8]/65 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-[#8b4a3c]/10 text-[#8b4a3c]">
                  <span className="text-xs font-bold tracking-widest">
                    {event.month}
                  </span>
                  <strong className="font-serif text-2xl leading-none">
                    {event.day}
                  </strong>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8b4a3c]">
                    {event.type}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-[#2c2925]">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#756f66]">
                    {event.time} · The Open Book
                  </p>
                </div>
                <a
                  href="#events"
                  className="w-fit shrink-0 text-sm font-bold text-[#8b4a3c] underline-offset-4 hover:underline"
                >
                  Details <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 rounded-[1.75rem] border border-[#ded7ca]/80 bg-[#fffdf8]/65 p-6 sm:p-9 md:grid-cols-2 md:items-center md:gap-10 lg:p-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8b4a3c]">
              Our story
            </p>
            <h2 className="font-serif text-3xl leading-tight text-[#2c2925] sm:text-4xl">
              A bookstore built around readers.
            </h2>
          </div>
          <p className="leading-8 text-[#756f66]">
            The Open Book is an independent bookstore created for people who
            believe that a good book can change the way we see the world. We
            carefully select every title and love connecting readers with their
            next great story.
          </p>
        </div>
      </section>
    </main>
  );
}
