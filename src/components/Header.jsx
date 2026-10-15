import { Plasma } from "@cruxgarden/plasma-ui";

const links = [
  ["Home", "#home"],
  ["Books", "#books"],
  ["Staff Picks", "#staff-picks"],
  ["Events", "#events"],
  ["About", "#about"],
];

export default function Header() {
  return (
    <Plasma
      as="header"
      lean={false}
      fuse={false}
      className="relative z-10 border-b border-[#ded7ca]/80 bg-[#f7f3eb]/75"
      tint="#f7f3eb"
      opacity={0.1}
      frost={0.3}
      elevation={0.12}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <a
          href="#home"
          className="w-fit font-serif text-2xl font-bold tracking-tight text-[#2c2925] sm:text-[1.7rem]"
        >
          The Open Book<span className="text-[#8b4a3c]">.</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[#756f66] sm:gap-x-6"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-sm py-1 transition-colors hover:text-[#8b4a3c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b4a3c]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </Plasma>
  );
}