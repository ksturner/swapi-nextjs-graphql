import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import typeDefs from '../../src/graphql/swapi.schema';
import resolvers from '../../src/graphql/swapi.resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // @ts-ignore // typing is wrong or not available for playground even though it's allowed
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});
const startServer = server.start();

type Data = {}; // Generic json response type for GraphQL api endpoint
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // TODO: need to restrict playground to non-production environments
    await startServer;
    await server.createHandler({ path: '/api/playground' })(req, res);
}
export const config = {
    api: {
        bodyParser: false,
    },
};
