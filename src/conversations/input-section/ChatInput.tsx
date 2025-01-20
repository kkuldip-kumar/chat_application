import useFocusOnInput from "@/hooks/useFocusOnInput";
import React, { useCallback, useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useStore } from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import { formatISO } from "date-fns";
import { gql, useMutation } from "@apollo/client";

type Props = {};

const SEND_MESSAGE = gql`
  mutation SendMessage($chatRoomId: ID!, $content: String!) {
    sendMessage(chatRoomId: $chatRoomId, content: $content) {
      content
      status
      type
      updatedAt
    }
  }
`;

const ChatInput: React.FC<Props> = () => {
    const { activeChatUser, currentUser } = useStore(
        useShallow((state) => ({
            currentUser: state.currentUser,
            activeChatUser: state.activeChatUser,
        }))
    );
    const [sendMessage] = useMutation(SEND_MESSAGE);
    const inputRef = useFocusOnInput();
    const [message, setMessage] = useState<string>('')

    const sendMessageHandler = useCallback(async () => {


        let messageData = {
            chatRoomId: activeChatUser.id,
            content: message,
        };

        try {
            const { data } = await sendMessage({
                variables: {
                    chatRoomId: messageData.chatRoomId,
                    content: messageData.content,
                }
            });

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, [message, sendMessage]);


    const dynamicClass = message ? 'bg-gray-400' : '';
    const isDisabled = !message.trim();
    return (
        <div className="max-w-4xl py-3 w-full mx-auto">
            <div className="relative w-full">
                <input
                    ref={inputRef}
                    className="block w-full pr-11 border border-gray-200 px-5 py-2 leading-6 placeholder-gray-500 rounded-full focus-visible:ring-transparent focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !isDisabled) {
                            e.preventDefault();
                            sendMessageHandler();
                        }
                    }}
                    placeholder="your message..."
                />
                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!isDisabled) {
                            sendMessageHandler();
                        }
                    }}

                    className={`flex absolute right-0 top-0 justify-center items-center w-10 h-10 text-sm font-semibold rounded-full border border-transparent bg-gray-200 text-gray-800 hover:bg-gray-400 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${dynamicClass}`}
                >
                    <SendHorizontal size={18} />
                </button>
            </div>
        </div>
    );
}

export default ChatInput;

