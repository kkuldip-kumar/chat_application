import React, { useRef } from 'react'

import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useLayoutView } from '@/layouts/LayoutProvider';
import { GET_Chat_Rooms } from './gql/query';
import { Profile } from './components/Profile';
import { ConversationList } from './user-conversations/conversation-list';


export const SideBar: React.FC = () => {
    const sidebarRef = useRef();
    // const { pathname } = useLocation();
    const { open, setOpen, Nav_animation, isTabletMid } = useLayoutView()
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { loading, error, data } = useQuery(GET_Chat_Rooms, {
        onError: (error) => {
            console.error('GraphQL Error:', error);
            if (error.message.includes('No bearer token')) {
                // navigate('/login');
            }
        },
        fetchPolicy: 'network-only' // Override cache-only to ensure fresh data
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <div className="h-6 w-6 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-red-500">Error loading messages</p>
            </div>
        );
    }
    const chatRooms = data?.allChatRooms || [];

    return (
        <aside className=''>
            <motion.div
                ref={sidebarRef}
                variants={Nav_animation}
                initial={{ x: isTabletMid ? -250 : 0 }}
                animate={open ? "open" : "closed"}
                className=" text-gray  z-[10] overflow-hidden md:relative ">
                <div className="border-b">
                    <Profile />
                </div>
                {chatRooms.length > 0 ? <ConversationList users={chatRooms} /> : null}
            </motion.div>

        </aside>
    );
};