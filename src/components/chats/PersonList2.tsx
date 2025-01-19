
import React from "react";
import { ChatUser } from "./message_window/ChatUser";
import { User } from "@/types/user";
type userProps = {
  id: string,
  name: string
}
export const PersonList2: React.FC<userProps> = ({ users }) => {
  // if(users.length==[]) return null
  return (
    <div className=" overflow-y-auto bg-white border-r h-[87vh]  dark:bg-gray-900 dark:border-gray-700">
      <h2 className="px-5 text-lg font-medium text-gray-800 dark:text-white">Chats</h2>
      <div className="space-y-2">
        {users.map((user: User) => (
          <ChatUser user={user} key={user.id} />
        ))}
      </div>
    </div>

  )
}
