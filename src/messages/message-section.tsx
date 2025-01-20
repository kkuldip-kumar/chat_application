import { Message } from "@/types/message";
import { MessageList } from "./components/message-list";
import { useEffect, useRef, useState } from "react";

import { useStore } from "@/store/store";

import { CHAT_ROOM_MESSAGES, MESSAGE_SUBSCRIPTION } from "./gql/query";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { EmptyConversation } from "@/conversations/EmptyConversation";
import useAutoScroll from "@/hooks/useAutoScroll";

export const MessageSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);


    const activeChatUser = useStore((state) => state.activeChatUser);
    const { loading, error, data } = useQuery(CHAT_ROOM_MESSAGES, {
        variables: {
            chatRoomId: activeChatUser?.id,
        },
        skip: !activeChatUser?.id,
        onError: (error) => {
            console.error('GraphQL Error:', error);
        },
        fetchPolicy: 'network-only'
    });

    const { data: subscriptionData } = useSubscription(MESSAGE_SUBSCRIPTION, {
        variables: { chatRoomId: activeChatUser?.id },
        skip: !activeChatUser?.id
    });
    useEffect(() => {
        if (data?.getMessages) {
            setMessages(data.getMessages);
        }
    }, [data]);

    useEffect(() => {
        if (subscriptionData?.messageCreated) {
            console.log('New message received:', subscriptionData.messageCreated);
            setMessages(prevMessages => {
                // Check if message already exists
                const messageExists = prevMessages.some(
                    msg => msg.id === subscriptionData.messageCreated.id
                );

                if (messageExists) {
                    return prevMessages;
                }

                return [...prevMessages, subscriptionData.messageCreated];
            });
        }
    }, [subscriptionData]);

    // Scroll to the bottom when messages change
    // useAutoScroll({ ref: containerRef, dependencies: [messages] });


    if (!activeChatUser?.id) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No active chat user selected</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Error loading messages</p>
            </div>
        );
    }

    if (messages.length == 0) return <EmptyConversation />
    return (
        <div
            ref={containerRef}
            className="max-w-4xl mx-auto"
        >
            <MessageList messages={messages} />
        </div>
    );
}

