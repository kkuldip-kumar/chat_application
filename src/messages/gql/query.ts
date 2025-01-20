import { gql } from "@apollo/client";

export const CHAT_ROOM_MESSAGES = gql`
  query GetMessages($chatRoomId: String!) {
    getMessages(chatRoomId: $chatRoomId) {
      content
      createdAt
      id
      sender {
        id
      }
      status
      type
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageCreated($chatRoomId: String!) {
    messageCreated(chatRoomId: $chatRoomId) {
      content
      createdAt
      id
      sender {
        id
      }
      status
      type
    }
  }
`;

export type Message = {
  id: string;
  content: string;
  createdAt?: string;
  sender?: {
    id: string;
  };
  status?: string;
  type?: string;
}

