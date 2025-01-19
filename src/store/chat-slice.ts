import { StateCreator } from 'zustand';
import { User } from '@/types/user';
import { Message } from '@/types/message';

type ChatState = {
	messages: Message[];
	activeChatUser: User
};

type ChatActions = {
	setActiveChatUser: (user: User) => void;
	addMessage: (user: Message) => void;
	bulkMessage: (user: Message[]) => void;
	resetMessages: () => void;
};

const userVal = {
	id: '',
	name: '',
	email: '',
	createdAt: '',
	status: ''
}
export type ChatSlice = ChatState & ChatActions;

const initialState: ChatState = {
	messages: [],
	activeChatUser: userVal,
};
export const createChatSlice: StateCreator<
	ChatSlice,
	[['zustand/immer', never]],
	[],
	ChatSlice
> = (set) => ({
	...initialState,

	setActiveChatUser: (userData) =>
		set((state) => {
			state.activeChatUser = userData;
			console.log('set user', state.activeChatUser)
		}),
	addMessage: (message) =>
		set((state) => {
			state.messages.push(message);
		}),
	bulkMessage: (messageArr) =>
		set((state) => {
			state.messages = [...state.messages, ...messageArr]
		}),
	resetMessages: () => set((state) => {
		state.messages = [];
	}),
});
