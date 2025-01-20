
import React from "react";
import { User } from "@/types/user";
import { ChatUser } from "./ChatUser";
type userProps = {
  users: User[]
}
export const ConversationList: React.FC<userProps> = ({ users }) => {
  return (
    <div className=" flex-1 overflow-y-auto border-r  dark:bg-gray-900 dark:border-gray-700">
      <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Chats</h2>
      <div className="space-y-2">
        {users.map((user: User) => (
          <ChatUser user={user} key={user.id} />
        ))}
      </div>
    </div>

  )
}
