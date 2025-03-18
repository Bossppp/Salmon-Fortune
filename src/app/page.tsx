"use client";
import AnswerBox from "@/components/AnswerBox";
import OptionPopUp from "@/components/OptionPopUp";
import PromptBox from "@/components/PromptBox";
import getAnswer from "@/libs/getAnswer";
import { createContext, useState } from "react";

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
  const [answer, setAnswer] = useState<GeminiApiResponseProps | null>({ prompt: '', advice: '', luckyTopics: [] });

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
        <div className="absolute flex flex-col lg:flex-row flex-wrap transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-10/12 gap-8 justify-center items-center">
          <div className="flex flex-col gap-2 lg:w-5/12 sm:w-10/12 w-11/12 p-4 border-2 bg-primary h-[40vh] rounded-2xl border-line shadow-[8px_8px_0px_var(--color-secondary)]">
            <h1 className="text-center text-2xl font-bold">
              ดวงวันนี้เป็นยังไง ให้เราช่วยสิ
            </h1>
            <PromptBox
              onSend={(message) => handleSend(message)}
              onPopup={() => setAppState(AppState.Popup)}
            />
          </div>
          <AnswerBox answer={answer} />
        </div>
        <OptionPopUp
          setPersona={(persona) =>
            setPrompt((oldPrompt) => {
              if (!oldPrompt) return { story: "", tones: persona };
              return { ...oldPrompt, tones: persona };
            })
          }
        />
      </StateContext.Provider>
    </main>
  );
}
