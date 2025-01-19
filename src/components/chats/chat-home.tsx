import React from 'react'
import logo from '@/assets/chat-logo.png'
export const ChatHome: React.FC = () => {
    return (
        <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center h-screen">
            <div className="text-gray-500 text-lg">Chat Application</div>
            <div className="text-gray-400 text-sm">Send and receive messages without keeping your phone online.</div>
            <div className="mt-4">
                <img src={logo} alt='' className='w-[200px] h-auto' />
            </div>
        </div>
    )
}
