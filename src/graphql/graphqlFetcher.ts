import { client } from './apolloClient';
import { gql } from "@apollo/client";

interface FetcherArgs {
    query: string;
    variables?: Record<string, any>;
}

export const graphqlFetcher = async <T>({
    query,
    variables,
}: FetcherArgs): Promise<T> => {
    const response = await client.query({
        query: gql(query),
        variables: variables || {},
    });
    return response.data as T;
};
