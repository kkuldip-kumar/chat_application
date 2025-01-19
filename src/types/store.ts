import { AuthSlice } from '@/store/auth-slice';
import { ChatSlice } from '@/store/chat-slice';
import { UserSlice } from '@/store/user-slice';

export type Store = AuthSlice & UserSlice & ChatSlice;
