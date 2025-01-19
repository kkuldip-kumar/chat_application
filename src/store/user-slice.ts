import { getCurrentUser, verifyToken } from '@/auth/request';
import { User } from '@/types/user';
import { StateCreator } from 'zustand';

type UserState = {
	currentUser: User,
	isAuthenticated: Boolean
};

type UserActions = {
	// setUser: (data: User) => void;
	getUser: () => void;
};

const userVal = {
	id: '',
	name: '',
	email: '',
	status: '',
	createdAt: ''
}

export type UserSlice = UserState & UserActions;
const initialState: UserState = {
	currentUser: userVal,
	isAuthenticated: true
};
export const createUserSlice: StateCreator<
	UserSlice,
	[['zustand/immer', never]],
	[],
	UserSlice
> = (set, get) => ({
	...initialState,
	getUser: async () => {
		const response = await verifyToken();
		if (!response.error) {
			const { __typename, ...userData } = response.user;
			set((state) => {
				state.currentUser = userData;
				state.isAuthenticated = true;
			});
		} else {
			set((state) => {
				state.isAuthenticated = false;
			});
		}
	},

});
