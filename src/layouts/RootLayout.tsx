import React from 'react'
import { useStore } from '@/store/store'
import { Outlet } from 'react-router-dom';
import { SideBar } from '@/sidebar-section/sidebar';
export const RootLayout: React.FC = () => {
    const activeChatUser = useStore((state) => state.activeChatUser)
    console.log(import.meta.env.VITE_API, 'dd')
    return (
        <div className='flex h-screen overflow-hidden'>
            <div className="hidden w-1/5 md:block md:col-span-1 bg-white ">
                <SideBar />
            </div>
            <div className="col-span-4 flex-1">
                <main className=" ">
                    {/* <main className=" rounded-md max-h-screen w-full relative"> */}
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

