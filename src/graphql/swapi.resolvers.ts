import axios from 'axios';
import { dateScalar } from './swapi.schema';
import { populateIDFromUrl, fetchListOfUrlObjects } from './utils';

// See: https://www.apollographql.com/docs/apollo-server/data/resolvers/
const resolvers = {
    Query: {
        getCharacters: async () => {
            try {
                const r = await axios.get('https://swapi.dev/api/people');
                return r.data.results; // This has pagination information too
            } catch (err) {
                return [];
            }
        },
        getCharacter: async (parent: {}, args: {}, context: {}, info: {}) => {
            try {
                const r = await axios.get(
                    `https://swapi.dev/api/people/${args.id}`
                );
                return r.data;
            } catch (err) {
                return null;
            }
        },
        searchCharacters: async (
            parent: {},
            args: {},
            context: {},
            info: {}
        ) => {
            try {
                const r = await axios.get(
                    `https://swapi.dev/api/people/?search=${args.text}`
                );
                return r.data.results;
            } catch (err) {
                return null;
            }
        },
    },
    DateTime: dateScalar,
    Homeworld: {
        id: populateIDFromUrl,
    },
    Film: {
        id: populateIDFromUrl,
    },
    Starship: {
        id: populateIDFromUrl,
    },
    Character: {
        id: populateIDFromUrl,
        homeworld: async (character: any) => {
            try {
                const r = await axios.get(character.homeworld);
                return r.data;
            } catch (err) {
                return '';
            }
        },
        starships: async (character: any) => {
            return await fetchListOfUrlObjects(character.starships);
        },
        films: async (character: any) => {
            return await fetchListOfUrlObjects(character.films);
        },
    },
};

export default resolvers;
