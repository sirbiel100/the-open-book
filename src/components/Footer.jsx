import { Plasma } from "@cruxgarden/plasma-ui";

const footerLinks = [
  ["Books", "#books"],
  ["Staff Picks", "#staff-picks"],
  ["Events", "#events"],
  ["About", "#about"],
];

export default function Footer() {
  return (
    <div className="border-t border-[#ded7ca]/80 bg-[#eee7da]/75">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-7 px-5 py-9 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
        <div>
          <a href="#home" className="font-serif text-2xl font-bold tracking-tight text-[#2c2925]">
            The Open Book<span className="text-[#8b4a3c]">.</span>
          </a>
          <p className="mt-2 text-sm text-[#756f66]">Stories worth getting lost in.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#756f66]">
          {footerLinks.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-[#8b4a3c]">
              {label}
            </a>
          ))}
        </nav>
        <p className="text-xs leading-5 text-[#756f66] md:col-span-2">
          © 2026 The Open Book. Independent and reader-owned.
        </p>
      </div>
    </div>
  );
}