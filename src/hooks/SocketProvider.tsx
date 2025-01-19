// import { FC, createContext, useCallback, useContext, useEffect, useState } from "react"
// import { io, Socket } from "socket.io-client"

// type SocketProps = {
//     children: React.ReactNode
// }

// type DefaultEventsMap = Record<string, any>;
// type SocketTProps = Socket<DefaultEventsMap, DefaultEventsMap> | null;
// type UserJoinedProps = {
//     email: string;
//     id: string;
// }
// export type joinRoomData = {
//     email?: string,
//     room?: string,
// }
// type SocketContextProps = {
//     messages: any[];
//     isTyping: boolean,
//     remoteSocketId: string | null,
//     socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined
//     sendMessage: (msg: string) => void,
//     handleJoinRoom: (data: joinRoomData) => void,
//     onTypingStart: () => void
// }

// const SocketContext = createContext<SocketContextProps | null>(null);

// export const SocketProvider: FC<SocketProps> = ({ children }) => {
//     const [socket, setSocket] = useState<Socket>();
//     const [isTyping, setIsTyping] = useState<boolean>(false);
//     const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
    
//     const { messages, addMessage, bulkMessage, resetMessages } = useChatStore();

//     useEffect(() => {
//         const socket = io(`http://localhost:4000/chat`);
//         socket.on('message:receive', onMessageRec);
//         socket.on('typing', onTypingStatus);

//         setSocket(socket);
//         return () => {
//             socket.disconnect();
//             socket.off('message:receive', onMessageRec);
//             socket.off('typing', onTypingStatus);
//             setSocket(undefined);
//         }
//     }, []);

//     const onMessageRec = useCallback((msg: string) => {
//         addMessage({ content: msg });
//     }, [addMessage]);

//     const fetchMessagesFromAPI = async () => {
//         try {
//             const response = await fetch('http://localhost:4000/chat');
//             if (response.ok) {
//                 const data = await response.json();
//                 bulkMessage(data.messages);
//             } else {
//                 console.error('Failed to fetch messages from API');
//             }
//         } catch (error) {
//             console.error('Error fetching messages from API:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMessagesFromAPI();
//     }, []);
//     const sendMessage: SocketContextProps['sendMessage'] = useCallback((msg: string) => {
//         if (socket) {
//             socket.emit("message:send", { message: msg });
//         }
//     }, [socket]);

//     const handleJoinRoom = useCallback((data: joinRoomData) => {
//         if (socket) {
//             socket.emit("room:join", data);
//         }
//     }, [socket]);

//     const onTypingStart = useCallback(() => {
//         if (socket) {
//             socket.emit("event:typing", { isTyping: true });
//         }
//     }, [socket]);

//     const onTypingStatus = useCallback((status: boolean) => {
//         setIsTyping(status);
//     }, []);

//     return (
//         <SocketContext.Provider value={{
//             messages,
//             isTyping,
//             remoteSocketId,
//             socket,
//             sendMessage,
//             handleJoinRoom,
//             onTypingStart
//         }}>
//             {children}
//         </SocketContext.Provider>
//     )
// }

// export const useSocket = () => {
//     const context = useContext(SocketContext);
//     if (!context) {
//         throw new Error("useSocket must be used within a SocketProvider");
//     }
//     return context;
// }
