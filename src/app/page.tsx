"use client";
import PromptBox from "@/components/PromptBox";

export default function Home() {
  return (
    <main className="absolute w-full max-w-xl p-4 mx-auto transform -translate-x-1/2 -translate-y-1/2 border-2 bg-primary top-1/2 left-1/2 h-96 rounded-2xl border-line shadow-[8px_8px_0px_var(--color-secondary)]">
      <h1 className="text-center text-2xl font-bold">ดวงวันนี้เป็นยังไง ให้เราช่วยสิ</h1>
      <PromptBox onSend={(message) => console.log(message)} />
    </main>
  );
}
