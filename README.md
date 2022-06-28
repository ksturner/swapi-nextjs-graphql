# StarWars API Demo Application

## Purpose

This application demonstrates a Next.js application that uses a variety of
frameworks, most notably, GraphQL, to search the StarWars database for
characters. Styling is via TailwindCSS and the GraphQL server is utilizing the
micro apollo server.

Admittedly, a lot of things here are just to demonstrate knowledge of tech, not
because they were necessary. For example, GraphQL was used to fetch the data
instead of traditional Rest api calls. This was overkill for such a small
project, but demonstrates setting up a schema and making various types of
queries.

Additionally, we have a separate dynamic character page to demonstrate a dynamic
route, not because it was the best UX to display detail information. The search
component on the index page uses a number of react hooks such as `useCallback`,
`useRef`, `useEffect`, and of course, `useState`. A number of these were not
necessary, but used for demo purposes.

Additionally, I brought in TailwindCSS for styling, but used traditional CSS
styling for a few areas of the app as well. You'll find the traditional styles
in the `styles` directory. A custom 404 page was added, to demonstrate
overloading of common NextJS app pages. TailwindCSS is just a step up from CSS
(offering simple aliases for common CSS styles), but provides no built-in UI.
There is no UI framework added to this project. All UI is utilizing standard
HTML elements with additional CSS applied via TailwindCSS macros. Icons were
provided via the awesome `react-icons` package.

Typescript was used, and while the use of GraphQL complicates getting a
consistent view of typing across typescript, resolvers, and schema, most of the
models were typed. As is usually the case with Typescript, more types can be
added to what is provided here.

## Getting Started

First, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

**NOTE:** Do pay attention to output of `yarn dev`, however as it will
incrementally try port numbers above 3000 if say, port 3000, is already in use
by another service.

## GraphQL Playground

Normally I wouldn't ship a GraphQL playground as a production route, but in this
project I've left it under the `/api/playground` route. Feel free to inspect the
schema docs and test some ad-hoc queries.

## Testing

For development purposes, you can run the test watcher via the `yarn test`
command. Otherwise, if you want to make a single pass over the tests and exit,
you can run `yarn test:ci`.

There were a number of tests yet to add to this project. I haven't added GraphQL
into Next.js like this before so I ran into some delays in getting
`react-testing-library` to mock out the apollo client hooks, etc. properly. As
such, I skipped those for the sake of time. I added a simple React-render test
for the index page, and another non-react, unit test for a utility function used
for the graphql schema. This barely scratches the surface of what would normally
be coded for tests, but leaves a good foundation for adding them.

## Reference

-   [React](https://reactjs.org/)
-   [NextJS](https://nextjs.org/)
-   [StarWars API](https://swapi.dev/)
-   [GraphQL](https://graphql.org/)
-   [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
-   [Apollo Micro Server](https://www.npmjs.com/package/apollo-server-micro)
-   [TailwindCSS](https://tailwindcss.com/)
