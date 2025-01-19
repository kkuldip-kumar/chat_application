import React, { useEffect, useRef } from "react";
import { format, isToday } from 'date-fns';
import ChatMessage from "./chat-message"
import { Message } from "@/types/message";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import user from '@/assets/user.jpg'

type messagesProps = {
    messages: Message[]
}
export const MessageWrapper: React.FC<messagesProps> = ({ messages }) => {
    const { currentUser } = useStore(
        useShallow((state) => ({
            currentUser: state.currentUser,
            // activeChatUser: state.activeChatUser,
        }))
    );
    // return (
    //     <div className="flex flex-col-reverse overflow-y-auto h-full">
    //         {messages.map((message: any) => (
    //             <ChatMessage message={message} key={message.createdAt} />
    //         ))}
    //     </div>
    // )
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    // Group messages by date
    const groupedMessages = messages.reduce((acc: Record<string, Message[]>, message) => {
        const messageDate = format(new Date(message.createdAt), 'yyyy-MM-dd');
        if (!acc[messageDate]) {
            acc[messageDate] = [];
        }
        acc[messageDate].push(message);
        return acc;
    }, {});

    const renderMessages = () =>
        Object.keys(groupedMessages).map((date) => (
            <div key={date}>
                {/* Date separator */}
                <div className="text-center text-gray-500 text-sm my-2">
                    {isToday(new Date(date)) ? 'Today' : format(new Date(date), 'MMMM dd, yyyy')}
                </div>
                {groupedMessages[date].map((message) => (
                    <div key={message.id} className="flex px-3 mb-2">
                        <div className="w-full space-y-2">
                            {/* Sender's message */}
                            {currentUser.id === message.sender.id ? (
                                <div className="flex items-start justify-end space-x-3 ">
                                    <div className="flex flex-col items-end">
                                        <div className="bg-purple-600 text-white px-2 py-1 mb-0.5 rounded-lg shadow-sm">
                                            <p className="text-sm">{message.content}</p>
                                        </div>
                                        <span className="text-gray-500 text-xs">
                                            {format(new Date(message.createdAt), 'hh:mm a')}
                                        </span>
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
                                        <span className="text-gray-500 text-xs">
                                            {format(new Date(message.createdAt), 'hh:mm a')}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ));

    return (
        <div
            ref={containerRef}
            className="h-[500px] overflow-y-auto bg-gray-100 rounded-lg p-4"
        >
            {renderMessages()}
        </div>
    );
};

