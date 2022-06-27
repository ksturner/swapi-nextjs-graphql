import React, { useState } from 'react';
import { debounce } from 'lodash';

type Props = {};

export default function SearchCharacters({}: Props) {
    const [searchText, setSearchText] = useState<string | null>(null);
    const [searchInProgress, setSearchInProgress] = React.useState(false);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setSearchText(text);
    };
    const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('button pressed');
        console.log('searching for ' + searchText);
        setSearchInProgress(!searchInProgress);
    };

    return (
        <div className="w-full grid grid-cols-1 place-items-center">
            <div className="text-center p-8">
                <h1 className="text-4xl font-bold">
                    StarWars Character Search
                </h1>
            </div>
            <div className="text-center pb-0 mb-0 p-2 pt-4 sm:w-full md:w-3/4 lg:w-1/2">
                <span className="pb-4 block text-left text-gray-500"></span>
            </div>
            <div className="text-center p-4">
                <input
                    className="m-2 p-2 rounded bg-gray-50 hover:bg-white hover:border-blue-500 transition border-2"
                    type="text"
                    name="search"
                    placeholder="Use the force, Luke ..."
                    size={44}
                    onChange={debounce(onSearchChange, 400)}
                    onBlur={onSearchChange}
                />{' '}
                <button
                    className={
                        'text-white m-2 p-2 rounded bg-blue-500 hover:bg-blue-600 transition' +
                        (searchText ? '' : ' opacity-50 cursor-not-allowed')
                    }
                    onClick={onSearch}
                    disabled={!searchText}
                >
                    Search
                </button>
            </div>
            {searchInProgress && (
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
            )}
        </div>
    );
}
