import React from "react";

import { ActiveUserChat } from "../ActiveUserChat";
import { Phone, Video } from "lucide-react";


export const ChatWindowHeader: React.FC = () => {

  return (
    <div className="flex w-full justify-between px-5 py-3 border-b shadow-md bg-white">
      <ActiveUserChat />
      <div className="flex items-center gap-2">
        <Phone size={16} />
        <Video size={16} />
      </div>
    </div>
  );
};
