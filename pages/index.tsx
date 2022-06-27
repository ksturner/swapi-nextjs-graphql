import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';

import styles from '../styles/Home.module.css';
import SearchCharacters from '../src/components/SearchCharacters';

const SearchPage: NextPage = () => {
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
                <SearchCharacters />
            </main>
        </div>
    );
};

export default SearchPage;
