import ConversationLayout from '@/conversations/Conversation';
import { ConversationWelcome } from '@/conversations/conversation-welcome';
import { RootLayout } from '@/layouts/RootLayout';
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
                            {activeChatUser.id ? <ConversationLayout /> : <ConversationWelcome />}
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
};

export { PrivateRoute };
