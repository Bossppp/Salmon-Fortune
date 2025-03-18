"use client";
import AnswerBox from "@/components/AnswerBox";
import OptionPopUp from "@/components/OptionPopUp";
import PromptBox from "@/components/PromptBox";
import getAnswer from "@/libs/getAnswer";
import { createContext, useState } from "react";
import { json } from "stream/consumers";

export enum AppState {
  Prompt,
  Popup,
  Wait,
  Answer,
}

interface Context {
  appState?: AppState;
  setAppState?: (state: AppState) => void;
}
export const StateContext = createContext<Context>({});

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.Prompt);
  const [prompt, setPrompt] = useState<GeminiApiRecieverProps | null>({
    story: "",
    tones: [],
  });
  const [answer, setAnswer] = useState<GeminiApiResponseProps | null>(null);

  const handleSend = async (message: string) => {
    setAppState(AppState.Wait);
    const data = await getAnswer(
      prompt
        ? { story: message, tones: prompt.tones }
        : { story: message, tones: [] },
    );
    setAnswer(data);
    setAppState(AppState.Answer);
  };

  return (
    <main>
      <StateContext.Provider value={{ appState, setAppState }}>
        <main className="absolute w-full max-w-xl p-4 mx-auto transform -translate-x-1/2 -translate-y-1/2 border-2 bg-primary top-1/2 left-1/2 h-96 rounded-2xl border-line shadow-[8px_8px_0px_var(--color-secondary)]">
          <h1 className="text-center text-2xl font-bold">
            ดวงวันนี้เป็นยังไง ให้เราช่วยสิ
          </h1>
          <PromptBox
            onSend={(message) => handleSend(message)}
            onPopup={() => setAppState(AppState.Popup)}
          />
        </main>
        <OptionPopUp
          setPersona={(persona) =>
            setPrompt((oldPrompt) => {
              if (!oldPrompt) return { story: "", tones: persona };
              return { ...oldPrompt, tones: persona };
            })
          }
        />
        <AnswerBox answer={answer} />
      </StateContext.Provider>
    </main>
  );
}
