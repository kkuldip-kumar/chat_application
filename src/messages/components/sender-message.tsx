import React from 'react'
import user from '@/assets/user.jpg'
import { timeAgo } from "@/utils/helper-fn";
import { Message } from '@/types/message';
type messageProp = {
    message: Message
}
const SenderMessage: React.FC<messageProp> = ({ message }) => {
    return (
        <div className="flex items-start space-x-3">
            <img src={user} alt="Avatar" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col items-start">
                <div className="bg-white px-2 py-1 mb-0.5 rounded-lg shadow-sm">
                    <p className="text-gray-700">{message.content}</p>
                </div>
                <span className="text-gray-500 text-xs">{timeAgo(message?.createdAt)}</span>
            </div>
        </div>
    )
}

export { SenderMessage }