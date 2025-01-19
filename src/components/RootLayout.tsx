import React from 'react'
import { useStore } from '@/store/store'
import { ChatHome } from './chats/chat-home';
import { SideSectionWrapper } from './sidebar/SideSectionWrapper';
import ChatsContainer from './chats/message_window/ChatsContainer';
import { Outlet } from 'react-router-dom';
export const RootLayout: React.FC = () => {
    const activeChatUser = useStore((state) => state.activeChatUser)
    console.log(import.meta.env.VITE_API, 'dd')
    return (
        <div className='grid md:grid-cols-5 w-full'>
            <div className="hidden md:block md:col-span-1 bg-white shadow-md">
                <SideSectionWrapper />
            </div>
            <div className="col-span-4 md:col-span-4">
                <main className=" rounded-md max-h-screen w-full relative">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

