import React, { useState, useRef, useCallback } from 'react';
import { debounce } from 'lodash';
import { gql } from '@apollo/client';
import client from '../graphql/client';

import SearchResults from './SearchResults';
import { SearchResult } from './types';

type Props = {};

export default function SearchCharacters({}: Props) {
    const searchInputRef = useRef<HTMLInputElement>(null); // for using Enter-key to search
    const [searchText, setSearchText] = useState<string | null>(null);
    const [searchInProgress, setSearchInProgress] = React.useState(false);
    const [results, setResults] = React.useState<SearchResult>(null); // TODO: type this

    const checkIfEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.toLowerCase() === 'enter') {
            const t = searchInputRef.current?.value;
            if (t) {
                setSearchText(t);
                performSearch(t);
            }
        }
    };

    const onSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const text = e.target.value;
            setSearchText(text);
        },
        []
    );
    const performSearch = useCallback(async (text: string | null) => {
        if (!text) return;

        setSearchInProgress(true);
        setResults(null);
        try {
            const { data } = await client.query({
                query: gql`
                query {
                    searchCharacters(text: "${text}") {
                        name
                        height
                        mass
                        hair_color
                        skin_color
                        eye_color
                        birth_year
                        gender
                    }
                }
            `,
            });
            setResults(data.searchCharacters);
            setSearchInProgress(false);
            searchInputRef.current?.focus();
        } catch (err) {
            console.log(err);
            setSearchInProgress(false);
        }
    }, []);
    const onSearch = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            await performSearch(searchText);
        },
        []
    );

    return (
        <div className="lg:w-1/2 md:w-3/4 sm:w-full grid grid-cols-1 place-items-center drop-shadow-lg bg-white pb-4">
            <div className="text-center p-2 m-0">
                <h1 className="text-4xl font-bold m-0 p-0">
                    StarWars Character Search
                </h1>
            </div>
            <div className="text-center pb-0 mb-0 p-1 pt-2 sm:w-full md:w-3/4 lg:w-1/2">
                <span className="pb-4 block text-center text-sm text-gray-300">
                    As provided by SWAPI
                </span>
            </div>
            <div className="text-center p-2">
                <input
                    className="m-2 p-2 rounded bg-gray-50 hover:bg-white hover:border-blue-500 transition border-2"
                    type="text"
                    ref={searchInputRef}
                    name="search"
                    placeholder="Use the force, Luke ..."
                    size={36}
                    onChange={debounce(onSearchChange, 400)}
                    onKeyDown={checkIfEnter}
                    onBlur={onSearchChange}
                    disabled={searchInProgress}
                    autoFocus
                />{' '}
                <button
                    className={
                        'text-white m-2 p-2 rounded bg-blue-500 hover:bg-blue-600 transition' +
                        (searchText && !searchInProgress
                            ? ''
                            : ' opacity-50 cursor-not-allowed')
                    }
                    onClick={onSearch}
                    disabled={!searchText || searchInProgress}
                >
                    Search
                </button>
            </div>
            <SearchResults
                searchInProgress={searchInProgress}
                results={results}
            />
        </div>
    );
}
