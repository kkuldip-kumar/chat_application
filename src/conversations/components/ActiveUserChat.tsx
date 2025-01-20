import React from 'react'
import { useStore } from '@/store/store';
export const ActiveUserChat: React.FC = () => {
    const activeChatUser = useStore((state) => state.activeChatUser)

    return (
        <div className="flex items-center w-full transition-colors duration-200 gap-x-2  focus:outline-none">
            <div className="relative">
                <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                {activeChatUser.status === 'active' ? <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span> : null}
            </div>
            <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{activeChatUser?.name}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Active ddsf</p>
            </div>
        </div>
    )
}
