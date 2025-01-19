import { ChatHome } from '@/components/chats/chat-home';
import ChatsContainer from '@/components/chats/message_window/ChatsContainer';
import { RootLayout } from '@/components/RootLayout';
import { useStore } from '@/store/store';
import React, { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const PrivateRoute = () => {
    const activeChatUser = useStore((state) => state.activeChatUser)

    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path='auth/*' element={<Navigate to='/chat' />} />
                <Route
                    path='/chat'
                    element={
                        <Suspense>
                            {activeChatUser.id ? <ChatsContainer /> : <ChatHome />}
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
};

export { PrivateRoute };
