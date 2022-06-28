import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { IoCarSport, IoMaleFemale } from 'react-icons/io5';
import { GiWeight } from 'react-icons/gi';
import { BsCalendar2Week } from 'react-icons/bs';
import {
    RiSendPlaneFill,
    RiGhostSmileLine,
    RiEyeLine,
    RiRulerLine,
    RiFilmFill,
} from 'react-icons/ri';
import { BiMap } from 'react-icons/bi';
import { MdFace } from 'react-icons/md';
import { Film, Species, Starship, Vehicle } from '../../src/components/types';

import styles from '../../styles/Home.module.css';

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
                <div className="lg:w-3/4 md:w-4/5 sm:w-full grid grid-cols-1 place-items-center drop-shadow-lg bg-white pb-4">
                    <div className="text-center p-2 m-0">
                        <h1 className="text-4xl font-bold m-0 p-0">
                            {data && data.getCharacter.name}
                        </h1>
                    </div>
                    <div className="text-center pb-8 mb-0 p-1 pt-2 sm:w-full md:w-3/4 lg:w-1/2">
                        <span className="pb-4 block text-center text-sm text-gray-300">
                            As provided by SWAPI
                        </span>
                        <span className="text-center text-sky-500 underline pb-4">
                            <FiArrowLeftCircle className="inline mr-2" />
                            <Link href="/">Back to Search</Link>
                        </span>
                    </div>
                    <table className="min-w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <RiRulerLine className="inline" />
                                    Height (cm)
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <GiWeight className="inline" />
                                    Mass (kg)
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <BsCalendar2Week className="inline" />
                                    Birth Year
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <IoMaleFemale className="inline" />
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
                                    <MdFace className="inline" />
                                    Hair Color
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    Skin Color
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <RiEyeLine className="inline" />
                                    Eye Color
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <BiMap className="inline" />
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
                                    <RiFilmFill className="inline" />
                                    Films
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <IoCarSport className="inline" />
                                    Vehicles
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <RiSendPlaneFill className="inline" />
                                    Starships
                                </th>
                                <th className="text-sm font-medium text-gray-900 px-4 py-2 text-center">
                                    <RiGhostSmileLine className="inline" />
                                    Species
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-0">
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                    {c.films.map((f: Film) => {
                                        // TODO: display better date
                                        return (
                                            <p key={`film-${f.id}`}>
                                                {f.title} ({f.release_date})
                                            </p>
                                        );
                                    })}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.vehicles.map((v: Vehicle) => {
                                        return (
                                            <p key={`vehicle-${v.id}`}>
                                                {v.name}
                                            </p>
                                        );
                                    })}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.starships.map((ss: Starship) => {
                                        return (
                                            <p key={`starship-${ss.id}`}>
                                                {ss.name}
                                            </p>
                                        );
                                    })}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap text-center">
                                    {c.species.map((s: Species) => {
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
