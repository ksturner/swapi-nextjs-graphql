import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';

import styles from '../../styles/Home.module.css';
import { fileURLToPath } from 'url';

const CharacterID: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const CHARACTER_QUERY = gql`
        query {
            getCharacter(id: "${id}") {
                name
                height
                mass
                hair_color
                skin_color
                eye_color
                birth_year
                gender
                homeworld {
                    name
                }
                films {
                    id
			        title
                    release_date
                }
                vehicles {
                    id
                    name
                }
                species {
                    id
                    name
                }
                starships {
                    id
                    name
                }
            }
        }
    `;
    const { loading, error, data } = useQuery(CHARACTER_QUERY);
    if (loading) return <p>Loading</p>;
    if (error) {
        console.log(error);
        return <p>Error!</p>;
    }
    if (!data) return <p>No data</p>;
    const c = data.getCharacter;
    return (
        <div className={styles.searchcontainer}>
            <Head>
                <title>SWApi Search Page</title>
                <meta
                    name="description"
                    content="Sample application demonstrating StarWars GraphQL api within a Next.js app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.searchmain}>
                <div className="lg:w-1/2 md:w-3/4 sm:w-full grid grid-cols-1 place-items-center drop-shadow-lg bg-white pb-4">
                    <div className="text-center p-2 m-0">
                        <h1 className="text-4xl font-bold m-0 p-0">
                            {data && data.getCharacter.name}
                        </h1>
                    </div>
                    <div className="text-center pb-0 mb-0 p-1 pt-2 sm:w-full md:w-3/4 lg:w-1/2">
                        <span className="pb-4 block text-center text-sm text-gray-300">
                            As provided by SWAPI
                        </span>
                    </div>
                    <table className="min-w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Height (cm)
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Mass (kg)
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Birth Year
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Gender
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-0">
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                    {c.height}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.mass}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.birth_year}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.gender}
                                </td>
                            </tr>
                        </tbody>
                        <thead className="border-b">
                            <tr>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Hair Color
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Skin Color
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Eye Color
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Homeworld
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-0">
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                    {c.hair_color}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.skin_color}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.eye_color}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.homeworld.name}
                                </td>
                            </tr>
                        </tbody>
                        <thead className="border-b">
                            <tr>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Films
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Vehicles
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Starships
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Species
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-0">
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                    {c.films.map((f) => {
                                        // TODO: display better date
                                        return (
                                            <p key={`film-${f.id}`}>
                                                {f.title} ({f.release_date})
                                            </p>
                                        );
                                    })}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.vehicles.map((v) => {
                                        return (
                                            <p key={`vehicle-${v.id}`}>
                                                {v.name}
                                            </p>
                                        );
                                    })}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.starships.map((ss) => {
                                        return (
                                            <p key={`starship-${ss.id}`}>
                                                {ss.name}
                                            </p>
                                        );
                                    })}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.species.map((s) => {
                                        return (
                                            <p key={`species-${s.id}`}>
                                                {s.name}
                                            </p>
                                        );
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default CharacterID;
