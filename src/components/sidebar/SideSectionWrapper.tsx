import React, { useRef } from 'react'
import { PersonList2 } from '../chats/PersonList2'
import { UserProfile } from '../UserPropfile'
import ErrorPage from '@/error-page'
import { Loader } from '../loader';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useLayoutView } from '@/LayoutProvider';
const GET_Chat_Rooms = gql`
query{
  allChatRooms{
    id
    name
    }
}
`;

export const SideSectionWrapper: React.FC = () => {
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
        <aside>

            <div
                onClick={() => setOpen(false)}
                className={`md:hidden fixed inset-0 max-h-screen z-[9] bg-black/50 ${open ? "block" : "hidden"
                    } `}
            > kjhkjhkj</div>
            <motion.div
                ref={sidebarRef}
                variants={Nav_animation}
                initial={{ x: isTabletMid ? -250 : 0 }}
                animate={open ? "open" : "closed"}
                className=" bg-white text-gray shadow-xl z-[10] overflow-hidden md:relative ">
                <div className="border-b">
                    <UserProfile />
                </div>
                <div className="">
                    {chatRooms.length > 0 ? <PersonList2 users={chatRooms} /> : null}
                </div>
            </motion.div>

        </aside>
    );
};