"use client";
import { useContext } from "react";
import { StateContext, AppState } from "@/libs/context";
import ProgressBar from "./ProgessBar";
import Image from "next/image";
function AnswerBox({ answer }: { answer: GeminiApiResponseProps | null }) {
  const { appState } = useContext(StateContext);
  console.log(appState);
  if (appState === AppState.Wait) {
    return (
      <div className="lg:w-5/12 sm:w-10/12 w-11/12 h-[40vh] bg-bg rounded-2xl shadow-[inset_8px_8px_0px_0px_rgba(246,205,187,1.00)] border-2 flex items-center justify-center overflow-hidden">
        <div className="text-center">
        <Image alt="" width={0} height={0} className="w-fit h-fit" src="/loading.gif"/>
        </div>
      </div>
    );
  }

  return (
    answer && (
      <div className="lg:w-5/12 sm:w-10/12 w-11/12 h-[40vh] bg-bg rounded-2xl shadow-[inset_8px_8px_0px_0px_rgba(246,205,187,1.00)] border-2 focus-within:outline-none overflow-hidden overflow-y-auto">
        <div className="p-4 text-line">
          <p className="mb-4">{answer?.advice}</p>
          <div className="grid grid-cols-1 gap-4">
            {answer?.luckyTopics.map((fortuneItem, index) => (
              <div
                key={index}
                className="p-4 mx-4 border-2 rounded-lg shadow-md bg-bg-shadow bg-opacity-10 border-line"
              >
                <h2 className="text-lg font-bold text-line">
                  {fortuneItem.topic}
                </h2>
                <p className="text-sm font-semibold text-orange-700">
                  {fortuneItem.reason}
                </p>
                <div className="flex flex-row mt-2">
                  <span>ค่าดวง:</span>
                  <ProgressBar percentage={fortuneItem.percentage} />{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default AnswerBox;