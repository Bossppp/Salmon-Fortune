'use client'
import React, { useEffect, useState } from "react";
import getAnswer from "@/libs/getAnswer";
import ProgressBar from "./ProgessBar";

function AnswerBox() {
    const [answer, setAnswer] = useState<GeminiApiResponseProps| null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getAnswer({ story: "วันนี้ฉันได้พบกับประสบการณ์แปลกๆในชีวิต ทั้งความสำเร็จและความท้าทายในด้านการงาน การเงิน และความรัก ทำให้ฉันต้องมาคิดและหาทางปรับปรุงโชคชะตาในแต่ละด้าน \nให้คำตอบมีความโทนในการตอบตลก \nให้จำลองว่าถ้าเป็นคนเหล่าดังนี้ในการตอบคำถาม: พระพุทธเจ้า, เด็กแว๊น", tones: ["พระศิวะ","เด็กแว้น"] });
            setAnswer(data);
        }
        fetchData();
      }, []);

    return (
        <div className="w-full max-w-xl p-8 mx-auto">
            <div className="relative w-full h-64 bg-bg rounded-xl shadow-[inset_8px_8px_0px_0px_rgba(246,205,187,1.00)] border-2 focus-within:outline-none overflow-hidden overflow-y-auto">
                <div className="p-4 text-line">
                    <p className="mb-4">{answer?.advice}</p>
                    <div className="grid grid-cols-1 gap-4">
                        {answer?.luckyTopics.map((fortuneItem, index) => (
                        <div key={index} className="bg-bg-shadow bg-opacity-10 rounded-lg p-4 mx-4 shadow-md border-2 border-line">
                            <h2 className="text-lg font-bold text-line">{fortuneItem.topic}</h2>
                            <p className="text-sm text-orange-700 font-semibold">{fortuneItem.reason}</p>
                            <p className="flex flex-row mt-2">ค่าดวง:<ProgressBar percentage={fortuneItem.percentage}/> </p>
                            
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerBox;
