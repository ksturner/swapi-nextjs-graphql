import 'cross-fetch/polyfill';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const BASE_DOMAIN = process.env.BASE_DOMAIN || '';

const client = new ApolloClient({
    uri: BASE_DOMAIN + '/api/graphql',
    cache: new InMemoryCache(),
});

export default client;
