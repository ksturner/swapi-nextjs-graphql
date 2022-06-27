import { gql } from 'apollo-server-micro';
import { GraphQLScalarType, Kind } from 'graphql';

/**
 * dateScalar is our custom scalar type for dates.
 */
export const dateScalar = new GraphQLScalarType({
    name: 'DateTime',
    parseValue(value: unknown): Date {
        if (typeof value !== 'string') {
            throw new Error('Can only parse string values');
        }
        return new Date(value);
    },
    serialize(value: unknown): string {
        if (!(value instanceof Date)) {
            throw new Error('Not a date');
        }
        return value.toISOString();
    },
    parseLiteral(ast: any): Date {
        if (ast.kind !== Kind.STRING) {
            throw new Error('Not a string');
        }
        return new Date(ast.value);
    },
});

export const typeDefs = gql`
    scalar DateTime

    type Homeworld {
        id: ID!
        name: String
        rotation_period: Int
        orbital_period: Int
        diameter: Int
        climate: String
        gravity: String
        terrain: String
        surface_water: String
        population: String
        residents: [String]
        films: [String]
        created: DateTime
        edited: DateTime
        url: String
    }
    type Film {
        id: ID!
        title: String
        director: String
        producer: String
        release_date: String
    }
    type Starship {
        id: ID!
        name: String
        model: String
        manufacturer: String
        cost_in_credits: Int
        length: Float
        max_atmosphering_speed: Int
        crew: Int
        passengers: Int
        cargo_capacity: Int
        consumables: String
        hyperdrive_rating: Float
        starship_class: String
        pilots: [String]
        created: DateTime
        edited: DateTime
        url: String
    }
    type Character {
        id: ID!
        name: String
        height: Int
        mass: Int
        hair_color: String
        skin_color: String
        eye_color: String
        birth_year: String
        gender: String
        homeworld: Homeworld
        films: [Film]
        species: [String]
        vehicles: [String]
        starships: [Starship]
        created: DateTime
        edited: DateTime
        url: String
    }
    type Query {
        getCharacters: [Character]
        getCharacter(id: ID!): Character
        searchCharacters(text: String): [Character]
    }
`;

export default typeDefs;
