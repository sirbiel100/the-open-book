export default function Hero({ book }) {
  return (
    <section id="home" className="scroll-mt-28 pt-36 sm:pt-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 sm:py-20 md:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8b4a3c]">Independent bookstore</p>
          <h1 className="max-w-xl font-serif text-5xl leading-[1.04] tracking-tight text-[#2c2925] sm:text-6xl lg:text-7xl">Stories worth getting lost in.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#756f66] sm:text-lg">Discover carefully selected fiction, thoughtful nonfiction, and books recommended by readers who love getting lost in a good story.</p>
          <a href="#books" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#8b4a3c] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#8b4a3c]/15 transition hover:-translate-y-0.5 hover:bg-[#68362d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b4a3c]">Explore our books <span aria-hidden="true" className="ml-2">↗</span></a>
        </div>
        {book ? (
          <div className="relative mx-auto w-full max-w-xl rounded-[1.75rem] border border-[#ded7ca]/80 bg-[#fffdf8]/75 p-5 shadow-xl shadow-[#2c2925]/5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b4a3c]">Book of the week</p><span className="rounded-full border border-[#ded7ca] px-3 py-1 text-xs text-[#756f66]">Reader favorite</span></div>
            <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] items-center gap-5 sm:gap-7">
              <div className="overflow-hidden rounded-sm bg-[#eee4d5] shadow-xl shadow-[#2c2925]/15"><img src={book.image} alt={book.alt} className="aspect-[2/3] w-full object-cover" /></div>
              <div className="min-w-0 py-2"><h2 className="font-serif text-2xl leading-tight text-[#2c2925] sm:text-3xl">{book.title}</h2><p className="mt-2 text-sm text-[#756f66]">{book.author}</p><p className="mt-4 text-sm leading-6 text-[#51473e] sm:text-base sm:leading-7">Between life and death exists a library of second chances.</p><a href="#books" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8b4a3c] underline-offset-4 hover:underline">Discover the book <span aria-hidden="true">→</span></a></div>
            </div>
          </div>
        ) : <div className="min-h-72 animate-pulse rounded-[1.75rem] border border-[#ded7ca] bg-[#fffdf8]/50" aria-label="Loading featured book" />}
      </div>
    </section>
  );
}
