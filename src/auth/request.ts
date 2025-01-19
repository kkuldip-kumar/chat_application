
import { client } from '@/graphql/apolloClient';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


// Define your GraphQL query
const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      email
      status
      createdAt
    }
  }
`;

// Define the response type
interface GetCurrentUserResponse {
  currentUser: {
    id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
  };
}

// Export the getCurrentUser function
export const getCurrentUser = async () => {
  try {
    const { data } = await client.query<GetCurrentUserResponse>({
      query: GET_CURRENT_USER,
      // Optional: fetch fresh data instead of using cache
      fetchPolicy: 'network-only',
    });

    return {
      user: data.currentUser,
      error: null,
    };
  } catch (error) {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        status: '',
        createdAt: '',
      },
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};

// verify userToken
const VERIFY_TOKEN = gql`
  query VerifyToken {
    verifyToken {
      id
      name
      email
    }
  }
`;

// Define response types
interface VerifyTokenResponse {
  verifyToken: {
    id: string;
    name: string;
    email: string;
  };
}

// Export the verifyToken function
export const verifyToken = async () => {
  try {
    const { data } = await client.query<VerifyTokenResponse>({
      query: VERIFY_TOKEN,
      fetchPolicy: 'network-only', // Override the default cache-only policy for this query
    });

    return {
      user: data.verifyToken,
      error: null,
    };
  } catch (error) {
    return {
      user: {
        id: '',
        name: '',
        email: '',
      },
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};