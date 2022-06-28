import React from 'react';
import { SearchResult } from './types';
import Link from 'next/link';

type Props = {
    searchInProgress: boolean;
    results?: SearchResult; // If null, search results are not yet loaded; empty array if no results.
};

/**
 * SearchResults displays all states of search results, including
 * search not started, search in progress, results found and results
 * not found.
 */
function SearchResults({ searchInProgress, results }: Props) {
    if (searchInProgress) {
        return (
            <div className="text-center p-4 text-sky-600 inline">
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-500 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <span>Searching...</span>
            </div>
        );
    } else if (results && results.length !== 0) {
        console.log(results);
        return (
            <div className="grid grid-cols-2">
                {results.map((r, idx) => {
                    const moreUrl = '/character/' + r.id;
                    let pronoun, birthed;

                    switch (r.gender) {
                        case 'male':
                            pronoun = 'He is';
                            birthed = 'born';
                            break;
                        case 'female':
                            pronoun = 'She is';
                            birthed = 'born';
                            break;
                        default:
                            pronoun = 'They are';
                            birthed = 'created';
                            break;
                    }
                    let extraInfo = `Eye color is ${r.eye_color}`;
                    if (r.hair_color !== 'n/a' && r.hair_color !== 'none') {
                        extraInfo += `, hair color is ${r.hair_color}`;
                    }
                    if (r.skin_color !== 'n/a') {
                        extraInfo += ` and skin color is ${r.skin_color}.`;
                    }

                    return (
                        <div
                            key={'person-' + idx}
                            className="flex justify-center"
                        >
                            <div className="block m-2 p-4 rounded-lg shadow-lg bg-white max-w-sm">
                                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                                    {r.name}
                                </h5>
                                <p className="text-gray-700 text-base mb-4">
                                    {pronoun} {r.height}cm tall, {r.mass}kg
                                    heavy, and {birthed} on {r.birth_year}.{' '}
                                    {extraInfo}
                                </p>

                                <Link href={moreUrl}>
                                    <button
                                        type="button"
                                        className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        See more
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else if (results && results.length === 0) {
        return (
            <div className="text-center p-4 text-sky-600 inline">
                No results
            </div>
        );
    }
    return null;
}

export default SearchResults;
