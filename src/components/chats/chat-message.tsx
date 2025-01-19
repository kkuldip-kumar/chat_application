import React from "react";

import { timeAgo } from "@/utils/helper-fn";
import { Message } from "@/types/message";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import user from '@/assets/user.jpg'
type messageProp = {
    message: Message
}
const ChatMessage: React.FC<messageProp> = ({ message }) => {
    const { currentUser } = useStore(
        useShallow((state) => ({
            messages: state.messages,
            currentUser: state.currentUser,
            // activeChatUser: state.activeChatUser,
        }))
    );
    return (
        <div className="flex px-3 mb-2">
            <div className="w-full space-y-2">
                {/* Sender's message */}
                {currentUser.id === message.sender.id ? (
                    <div className="flex items-start justify-end space-x-3 ">
                        <div className="flex flex-col items-end">
                            <div className="bg-purple-600 text-white px-2 py-1 mb-0.5 rounded-lg shadow-sm">
                                <p className="text-sm">{message.content}</p>
                            </div>
                            <span className="text-gray-500 text-xs">{timeAgo(message?.createdAt)}</span>
                        </div>
                        <img src={user} alt="Avatar" className="w-8 h-8 rounded-full" />
                    </div>
                ) : (

                    <div className="flex items-start space-x-3">
                        <img src={user} alt="Avatar" className="w-8 h-8 rounded-full" />
                        <div className="flex flex-col items-start">
                            <div className="bg-white px-2 py-1 mb-0.5 rounded-lg shadow-sm">
                                <p className="text-gray-700">{message.content}</p>
                            </div>
                            <span className="text-gray-500 text-xs">{timeAgo(message?.createdAt)}</span>
                        </div>
                    </div>
                )}

            </div>
        </div>

    );
}

export default ChatMessage;