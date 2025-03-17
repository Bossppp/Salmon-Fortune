'use client'
import PromptBox from "@/components/PromptBox";

export default function Home() {
  return (
    <div>
      <h1>Salmon 🍣</h1>
      <PromptBox onSend={(message) => console.log(message)} />
    </div>
  );
}
