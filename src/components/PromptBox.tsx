'use client'
import React, { useState } from 'react';
import { SendHorizonalIcon } from 'lucide-react';

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
        <div className="w-full max-w-xl mx-auto p-4">
            <div className="relative w-[578px] h-64 bg-bg rounded-xl shadow-[inset_8px_8px_0px_0px_rgba(246,205,187,1.00)] outline outline-2 outline-line">
                <textarea
                    className="w-full h-full p-4 justify-center text-zinc-400"
                    placeholder="บอกอาตามหน่อยว่าวันนี้เป็นยังไงบ้าง…อย่าส่งบ่อย ติด rate limit นะจ๊ะ"
                    value={message}
                    onChange={handleChange}
                />
                <button className="absolute right-2 bottom-2 bg-bg-shadow text-line font-medium px-4 py-2 rounded-md hover:bg-orange-400 transition-colors flex flex-row" onClick={handleSend}>
                    ส่งให้หลวงพ่อ
                    <SendHorizonalIcon className='ml-3'/>
                </button>
            </div>
        </div>
    );
};

export default PromptBox;
