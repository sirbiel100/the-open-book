import SaveToggle from "./SaveToggle";

export default function BookCard({ book, saved, onSavedChange }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#ded7ca]/80 bg-[#fffdf8]/70 p-3 shadow-sm transition-transform duration-200 hover:-translate-y-1 sm:p-4">
      <div className="overflow-hidden rounded-lg bg-[#eee7da]"><img src={book.image} alt={book.alt} loading="lazy" className="aspect-[2/3] w-full object-cover" /></div>
      <div className="flex flex-1 flex-col pt-4"><p className="mb-2 w-fit rounded-full bg-[#8b4a3c]/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#8b4a3c]">{book.category}</p><h3 className="font-serif text-lg leading-snug text-[#2c2925] sm:text-xl">{book.title}</h3><p className="mt-1 text-sm text-[#756f66]">{book.author}</p><div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4"><p className="font-bold tabular-nums text-[#2c2925]">${Number(book.price).toFixed(2)}</p><SaveToggle title={book.title} checked={saved} onChange={onSavedChange} /></div></div>
    </article>
  );
}
