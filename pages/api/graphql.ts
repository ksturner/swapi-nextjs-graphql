import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';

import typeDefs from '../../src/graphql/swapi.schema';
import resolvers from '../../src/graphql/swapi.resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
});
const startServer = server.start();

type Data = {}; // Generic json response type for GraphQL api endpoint
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await startServer;
    await server.createHandler({ path: '/api/graphql' })(req, res);
}
export const config = {
    api: {
        bodyParser: false,
    },
};
