import React, { Suspense } from 'react'
import { useStore } from '@/store/store'

import { Loader } from '../components/loader';
import { Outlet } from 'react-router-dom';
export const ChatPage: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    )
}

