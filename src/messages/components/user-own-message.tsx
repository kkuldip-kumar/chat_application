import React from 'react'
import user from '@/assets/user.jpg'
import { timeAgo } from "@/utils/helper-fn";
import { Message } from '@/types/message';
type messageProp = {
    message: Message
}
const UserOwnMessage: React.FC<messageProp> = ({ message }) => {
    return (
        <div className="flex items-start justify-end space-x-3 ">
            <div className="flex flex-col items-end">
                <div className="bg-purple-600 text-white px-2 py-1 mb-0.5 rounded-lg shadow-sm">
                    <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-gray-500 text-xs">{timeAgo(message?.createdAt)}</span>
            </div>
            <img src={user} alt="Avatar" className="w-8 h-8 rounded-full" />
        </div>
    )
}

export { UserOwnMessage }