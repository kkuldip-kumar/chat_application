import React, { useEffect, useState } from "react";
import { ChatWindow } from "../chat-window";
import { ChatWindowHeader } from "./ChatWindowHeader";
import { ChatInputWrapper } from "./ChatInputWrapper";
import { Loader } from "@/components/loader";
import ErrorPage from "@/error-page";
import { useStore } from "@/store/store";

import { CHAT_ROOM_MESSAGES, Message, MESSAGE_SUBSCRIPTION } from "../gql/query";
import { useQuery, gql, useSubscription } from "@apollo/client";
import ChatInput from "../ChatInput";


const ChatsContainer: React.FC = () => {
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
  // console.log("subcriotion data", subscriptionData);
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

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

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
  return (
    <div className="relative ">
      <div className="">
        <ChatWindowHeader />
      </div>
      <div className="max-w-4xl mx-auto">
        <ChatWindow messages={messages} />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatsContainer;
