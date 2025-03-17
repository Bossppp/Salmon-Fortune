'use client'
import React, { useState } from 'react';

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
            <div className="bg-orange-100 rounded-lg p-4 relative">
                <textarea
                    className="w-full h-24 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                    placeholder="บอกอาตามหน่อยว่าบัฟนี้เป็นยังไงบ้าง…อย่าส่งบ่อย ติด rate limit นะจ๊ะ"
                    value={message}
                    onChange={handleChange}
                />
                <button
                    className="bg-orange-500 text-white font-medium px-4 py-2 rounded-md absolute bottom-4 right-4 hover:bg-orange-600 transition-colors"
                    onClick={handleSend}
                >
                    ส่งให้หลวงพ่อ
                </button>
            </div>
        </div>
    );
};

export default PromptBox;
