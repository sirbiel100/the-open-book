"use client";

export default function SaveToggle({ checked, onChange, title }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#756f66]">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} aria-label={`${checked ? "Remove" : "Save"} ${title} ${checked ? "from" : "to"} your saved books`} className="peer sr-only" />
      <span aria-hidden="true" className={`grid size-8 place-items-center rounded-full border transition ${checked ? "border-[#8b4a3c] bg-[#8b4a3c] text-white" : "border-[#ded7ca] bg-[#fffdf8] text-[#8b4a3c] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#8b4a3c]"}`}>{checked ? "♥" : "♡"}</span>
      <span>{checked ? "Saved" : "Save book"}</span>
    </label>
  );
}
