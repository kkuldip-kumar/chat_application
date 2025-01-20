import { gql } from "@apollo/client";

export const GET_Chat_Rooms = gql`
query{
  allChatRooms{
    id
    name
    }
}
`;