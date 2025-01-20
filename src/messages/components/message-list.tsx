import { DateSeparator } from "@/conversations/components/date-separator";
import { Message } from "@/types/message";
import { format, isToday } from 'date-fns';
import { UserOwnMessage } from "./user-own-message";
import { SenderMessage } from "./sender-message";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

type messagesProps = {
    messages: Message[]
}
export const MessageList: React.FC<messagesProps> = ({ messages }) => {
    const { currentUser } = useStore(
        useShallow((state) => ({
            currentUser: state.currentUser,
        }))
    );
    // Group messages by date
    const groupedMessages = messages.reduce((acc: Record<string, Message[]>, message) => {
        const messageDate = format(new Date(message.createdAt), 'yyyy-MM-dd');
        if (!acc[messageDate]) {
            acc[messageDate] = [];
        }
        acc[messageDate].push(message);
        return acc;
    }, {});
    return (
        Object.keys(groupedMessages).map((date) => (
            <div key={date}>
                <DateSeparator date={date} />
                {groupedMessages[date].map((message) => (
                    <div key={message.id} className="flex px-3 mb-2">
                        <div className="w-full space-y-2">
                            {/* Sender's message */}
                            {currentUser.id === message.sender.id ? (
                                <UserOwnMessage message={message} />
                            ) : (
                                <SenderMessage message={message} />
                            )}
                        </div>
                    </div>
                ))}
            </div>

        ))
    )
}

