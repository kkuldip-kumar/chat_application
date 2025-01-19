export type Sender = {
	id?: string;
	name?: string;
	email?: string;
};
export type Message = {
	sender: Sender;
	id: string;
	content: string;
	createdAt: string;
};


