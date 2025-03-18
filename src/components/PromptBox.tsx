'use client'
import { CircleUserRound, SendHorizonalIcon } from 'lucide-react';
import React, { useState } from 'react';
import FAB from './FAB';

interface PromptBoxProps {
    onSend: (message: string) => void;
}

const PromptBox: React.FC<PromptBoxProps> = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (onSend) {
            onSend(message);
        }
        setMessage('');
    };

    return (
        <div className="w-full max-w-xl p-8 mx-auto">
            <div className="relative w-full h-64 bg-bg rounded-xl shadow-[inset_8px_8px_0px_0px_rgba(246,205,187,1.00)] border-2 focus-within:outline-none overflow-hidden">
                <textarea
                    className="justify-center w-full h-full p-4 placeholder:text-zinc-400 focus:outline-none resize-none overflow-x-hidden overflow-y"
                    placeholder="บอกอาตามหน่อยว่าวันนี้เป็นยังไงบ้าง…อย่าส่งบ่อย ติด rate limit นะจ๊ะ"
                    value={message}
                    onChange={handleChange}
                />
                <div className='absolute right-2 bottom-2 flex gap-2'>
                <FAB onClick={handleSend} text='เลือกคนคุย'>
                    <CircleUserRound/>
                </FAB>
                <FAB onClick={handleSend} text='ส่งให้หลวงพ่อ'>
                    <SendHorizonalIcon/>
                </FAB>
                </div>
            </div>
        </div>
    );
};

export default PromptBox;
