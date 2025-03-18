import { useEffect, useState } from "react";
interface Tone {
  text: string;
  selected: boolean;
}
export default function OptionButton({
  tone,
  onClick,
}: {
  tone: Tone;
  onClick: () => void;
}) {
  return (
    <div
      className={`select-none w-[240px] h-[33px] flex-shrink-0 rounded-[8px] border-[2px] ${!tone.selected ? "bg-[var(--color-primary)] " : "bg-[#EA5E2F]"} flex justify-center items-center hover:bg-[#EA5E2F] hover:translate-y-0.5 transition-all`}
      onClick={onClick}
    >
      <p className="font-bold text-white">{tone.text}</p>
    </div>
  );
}
