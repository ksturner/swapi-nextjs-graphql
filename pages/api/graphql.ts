import type { NextApiRequest, NextApiResponse } from 'next';
import { gql, ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

let sampleData = [
    {
        id: '1',
        name: 'Luke Skywalker',
    },
    {
        id: '2',
        name: 'Darth Vader',
    },
];
const typeDefs = gql`
    type People {
        id: ID!
        name: String
    }
    type Query {
        getPeople: [People]
    }
`;
const resolvers = {
    Query: {
        getPeople: () => sampleData,
    },
};

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
    await startServer;
    await server.createHandler({ path: '/api/graphql' })(req, res);
}
export const config = {
    api: {
        bodyParser: false,
    },
};
