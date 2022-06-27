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

const resolvers = {
    Query: {
        getPeople: () => sampleData,
    },
};

export default resolvers;
