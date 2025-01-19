import React, { useEffect } from 'react'
import { useStore } from '@/store/store';
import { useShallow } from 'zustand/react/shallow';
export const UserProfile: React.FC = () => {
    const { currentUser } = useStore(
        useShallow((state) => ({
            currentUser: state.currentUser,
            // getUser: state.getUser,
        }))
    );
    // useEffect(() => {
    //     getUser()
    // }, [getUser])

    return (
        <div className="flex items-center w-full px-5 py-3 border-r  transition-colors duration-200 gap-x-2 focus:outline-none">
            <div className="relative">
                <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100" alt="" />
                {currentUser.status === 'active' ? <span className="h-2 w-2 rounded-full bg-emerald-500 absolute right-0.5 ring-1 ring-white bottom-0"></span> : null}
            </div>
            <div className="text-left rtl:text-right">
                <h1 className="text-sm font-medium text-gray-700 capitalize dark:text-white">{currentUser.name}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
            </div>
        </div>
    )
}