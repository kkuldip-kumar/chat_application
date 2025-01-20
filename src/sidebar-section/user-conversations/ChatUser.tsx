import React, { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@/store/store';
import { User } from '@/types/user';
export const ChatUser: React.FC<any> = ({ user }) => {

    const { setActiveChatUser, activeChatUser } = useStore(
        useShallow((state) => ({
            setActiveChatUser: state.setActiveChatUser,
            activeChatUser: state.activeChatUser,
        }))
    );
    const setUserHandler = useCallback((user: User) => {
        setActiveChatUser(user)
    }, [])
    return (
        // for active chat bg-gray-100
        <button onClick={() => setUserHandler(user)} className={`flex items-center w-full  px-5 py-2 transition-colors duration-200  gap-x-2  focus:outline-none ${activeChatUser.id === user.id ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            {/* <img className="object-cover w-8 h-8 rounded-full" src="./user.jpg" alt="" /> */}
            <div className="relative">
                <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
            </div>
            <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-gray-700 capitalize ">{user.name}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">11.2 Followers</p>
            </div>
        </button>
    )
}
