import { ApolloClient, createHttpLink, from, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

// Create the http link
const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    // credentials: 'include'
});

// Create the WebSocket link
const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:4000/graphql',
        connectionParams: () => {
            const token = localStorage.getItem('token');
            return {
                authorization: token ? `Bearer ${token}` : "", // Pass the token if available
            };
        },
        on: {
            connected: () => console.log('WebSocket connected'),
            closed: () => console.log('WebSocket disconnected'),
            error: (err) => console.error('WebSocket error', err),
        },
    })
);

// Create the auth link that will set the token in headers
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    console.log('auth link', token);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

// Create error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            console.error(`[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`);
            if (err.message === 'No bearer token provided') {
                // Optionally redirect to login
                // window.location.href = '/login';
            }
        }
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

// Split links based on operation type
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

// Create and export the Apollo Client instance
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, splitLink]),
});