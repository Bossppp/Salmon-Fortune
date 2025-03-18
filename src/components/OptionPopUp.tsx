import { useEffect, useRef, useState } from "react";
import OptionButton from "./OptionButton";
import Image from "next/image";
import { createPortal } from "react-dom";
export default function OptionPopUp() {
  const mockTones = [
    { text: "พระ", selected: false },
    { text: "แซลม่อน", selected: false },
    { text: "เด็กแว้น", selected: false },
    { text: "วัยรุ่น intania", selected: false },
    { text: "แม่หมอธรรมดา", selected: false },
  ];

  const [tones, setTones] = useState(mockTones);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest("#mainOption")) {
      setIsOpen(false);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle === true) {
      return;
    }
    setTones((prevTones) =>
      prevTones.map((tone) => ({ ...tone, selected: false })),
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted &&
    isOpen &&
    createPortal(
      <div
        className="fixed inset-0 top-0 left-0 w-[100vw] h-[100vh] bg-black/70 z-[1000]"
        onClick={handleClick}
      >
        <div
          id="mainOption"
          className="bg-[var(--color-bg)] w-[498px] h-[240px] rounded-[22px] absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)] flex flex-col items-center gap-5 index-2 /*fixed inset-0 */"
        >
          <p className="flex flex-col justify-center flex-shrink-0 text-[#762A19] text-center text-[24px] font-bold tracking-[0px] mt-2">
            อยากถามคนไหนน
          </p>
          {tones
            .slice(page * 3, page * 3 + 3)
            .map(({ text, selected }, index) => (
              <OptionButton
                key={page * 3 + index}
                tone={tones[page * 3 + index]}
                onClick={() => {
                  setTones((prevTones) =>
                    prevTones.map((tone, i) =>
                      i === page * 3 + index
                        ? { ...tone, selected: !tone.selected }
                        : tone,
                    ),
                  );
                  setToggle(false);
                }}
              />
            ))}
          {page == Math.floor((tones.length - 1) / 3) ? (
            <div
              className={`select-none w-[240px] h-[33px] font-bold flex-shrink-0 rounded-[8px] border-[1.5px] flex justify-center items-center ${!toggle ? "text-line" : "bg-line text-bg"} transition-colors hover:bg-line hover:text-bg`}
              onClick={handleToggle}
            >
              ถามใจเทอดู
            </div>
          ) : (
            ""
          )}
          {page >= Math.floor((tones.length - 1) / 3) ? (
            ""
          ) : (
            <Image
              src="next-btn.svg"
              alt="next-btn"
              width={25}
              height={24}
              onClick={() =>
                setPage(Math.min(Math.floor((tones.length - 1) / 3), page + 1))
              }
              className="absolute bottom-5 right-5 cursor-pointer"
            />
          )}
          {page <= 0 ? (
            ""
          ) : (
            <Image
              src="next-btn.svg"
              alt="prev-btn"
              width={25}
              height={24}
              onClick={() => setPage(Math.max(0, page - 1))}
              className="rotate-180 absolute bottom-5 left-5 cursor-pointer"
            />
          )}
        </div>
      </div>,
      document.body,
    )
  );
}
