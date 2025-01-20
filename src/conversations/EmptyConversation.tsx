
import { MessageCircle } from "lucide-react";
import React from "react";

export const EmptyConversation: React.FC = () => {
  return (
    <div className="grid h-[25vh] place-items-center">
      <div className="py-10 text-center">
        <div className="grid h-auto place-items-center">
          <div className="grid h-14 w-14 place-content-center place-items-center justify-center rounded-full border ">
            <MessageCircle />
          </div>
        </div>
        <div className="my-4">
          <h3 className="text-base font-medium">Your Messages</h3>
        </div>
        <div className="mb-4">
          <p className="text-gray-400 text-sm font-normal">
            Send private photos ans messages to your friend or group
          </p>
        </div>
        <div className="">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Send Message</button>
        </div>
      </div>
    </div>
  );
};

