import React, { Suspense } from 'react'
import { useStore } from '@/store/store'

import { Loader } from './loader';
import { Outlet } from 'react-router-dom';
export const ChatPage: React.FC = () => {
    console.log(import.meta.env.VITE_API, 'dd')
    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    )
}

