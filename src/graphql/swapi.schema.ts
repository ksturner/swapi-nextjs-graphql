import { gql } from 'apollo-server-micro';

const schema = gql`
    type People {
        id: ID!
        name: String
    }
    type Query {
        getPeople: [People]
    }
`;

export default schema;
