import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createUserSlice } from '@/store/user-slice';
import { createAuthSlice } from '@/store/auth-slice';
import { Store } from '@/types/store';

import { createChatSlice } from './chat-slice';
// import { createAuthSlice } from './auth-slice';

export const useStore = create<Store>()(
	devtools(
		persist(
			subscribeWithSelector(
				immer((...a) => ({
					...createUserSlice(...a),
					...createChatSlice(...a),
					...createAuthSlice(...a),
				}))
			),
			{
				name: 'local-storage',
				partialize: (state) => ({
					currentUser: state.currentUser,
					isAuthenticated: state.isAuthenticated,
					activeChatUser: state.activeChatUser,
				}),
				// storage: createJSONStorage(() => sessionStorage),
			}
		)
	)
);
