import React from "react";
import { MessageSection } from "@/messages/message-section";
import ChatInput from "./input-section/ChatInput";
import { ChatWindowHeader } from "./components/ChatWindowHeader";


const ConversationLayout: React.FC = () => {

    return (
        <div className="flex flex-col h-screen ">
            <ChatWindowHeader />
            {/* <div className="">
            </div>  mx-auto  p-4 */}
            <div className="flex-1  overflow-y-auto ">
                <MessageSection />
            </div>
            <ChatInput />
            {/* <div className="">
            </div> */}
        </div>
    );
};

export default ConversationLayout;
