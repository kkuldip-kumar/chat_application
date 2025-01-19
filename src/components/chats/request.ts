import { gql, useSubscription } from "@apollo/client";

// Example subscription hook
export const useMessageSubscription = (chatRoomId: string) => {
    const MESSAGE_SUBSCRIPTION = gql`
        subscription OnMessageCreated($chatRoomId: ID!) {
            messageCreated(chatRoomId: $chatRoomId) {
                id
                content
                sender {
                    id
                    name
                }
                createdAt
            }
        }
    `;

    return useSubscription(MESSAGE_SUBSCRIPTION, {
        variables: { chatRoomId }
    });
};