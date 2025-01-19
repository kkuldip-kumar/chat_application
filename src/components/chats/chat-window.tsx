import React, { useCallback, useEffect, useState } from "react"
import { useStore } from "@/store/store";
import { useShallow } from 'zustand/react/shallow';
import ErrorPage from "@/error-page";
import { EmptyChat } from "./message_window/EmptyChat";
import { Loader } from "../loader";
import { MessageWrapper } from "./MessageWrapper";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "./gql/query";
import { useQuery, useSubscription } from "@apollo/client";
type messagesProps = {
    id: string,
    content: string,
}

const ChatWindow: React.FC<messagesProps> = ({ messages }) => {
    // const [socket, setSocket] = useState<Socket>();
    const { activeChatUser } = useStore(
        useShallow((state) => ({
            activeChatUser: state.activeChatUser,
        }))
    );
    // const onMessageRec = useCallback((messageData: any) => {
    //     sendMessage(messageData);
    // }, [socket]);
    // useEffect(() => {
    //     const socket = io(`http://localhost:4000/chat`);
    //     socket.on('message:receive', onMessageRec);
    //     setSocket(socket);
    //     return () => {
    //         socket.disconnect();
    //         socket.off('message:receive', onMessageRec);
    //         setSocket(undefined);
    //     }
    // }, []);

    // const { data: chatMessages, isError, isLoading } = useQuery({
    //     queryKey: [QUERIES.USERS_PRIVATE_MESSAGE, currentUser.id, activeChatUser.id],
    //     queryFn: () => getAllMessages(currentUser.id, activeChatUser.id),
    // });
    // if (isLoading) return (<Loader />)
    // if (isError) return (<ErrorPage />)



    // const combinedMessages = [...messages, ...(chatMessages || [])];
    // const [messageList, setMessages] = useState(messages);

    // // Query existing messages
    // const { loading, error, data } = useQuery(GET_MESSAGES, {
    //     variables: { chatRoomId: activeChatUser.id },
    //     fetchPolicy: 'network-only',
    // });

    // // Subscribe to new messages
    // const { data: subscriptionData } = useSubscription(MESSAGE_SUBSCRIPTION, {
    //     variables: { chatRoomId: activeChatUser.id },
    // });

    // // Initialize messages when query loads
    // useEffect(() => {
    //     if (data?.messages) {
    //         setMessages(data.messages);
    //     }
    // }, [data]);

    // // Handle new messages from subscription
    // useEffect(() => {
    //     if (subscriptionData?.messageCreated) {
    //         console.log("message", subscriptionData?.messageCreated)
    //         setMessages(prevMessages => [...prevMessages, subscriptionData.messageCreated]);
    //     }
    // }, [subscriptionData]);

    // // Scroll to bottom when new messages arrive
    // useEffect(() => {
    //     const chatContainer = document.getElementById('chat-container');
    //     if (chatContainer) {
    //         chatContainer.scrollTop = chatContainer.scrollHeight;
    //     }
    // }, [messageList]);

    // if (loading) return <Loader />;
    // if (error) return <ErrorPage />;
    return (
        <>
            {/* md:min-h-[500px] md:h-[580px] custom-scrollbar overflow-y-auto */}
            <div className="py-2 space-y-2  px-2">
                {messages.length == 0 ? <EmptyChat /> : <MessageWrapper messages={messages} />}
                {/* <ChatInvite /> */}

            </div>
        </>
    );
}

export { ChatWindow };