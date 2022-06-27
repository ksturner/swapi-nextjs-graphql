export interface Homeworld {
    id: string;
    name?: string;
    // TODO: add more fields when needed
}
export interface Film {
    id: string;
    name?: string;
    director?: string;
    producer?: string;
    release_date?: string;
    // TODO: add more fields when needed
}
export interface Starship {
    id: string;
    name?: string;
    // TODO: add more fields when needed
}
// TODO: Need to tighten down the DateTime type. It's
// left here as a placeholder type to distinguish date
// fields from other generic string fields.
export type DateTime = Date | string;

/**
 * TS type definition for resulting People (per SWAPI terminology) type.
 */
export interface Character {
    id: number;
    name?: string;
    height?: number;
    mass?: number;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    homeworld?: Homeworld;
    films?: Film[];
    species?: string[];
    vehicles?: string[];
    starships?: Starship[];
    created?: DateTime;
    edited?: DateTime;
    url?: string;
}

export type SearchResult = Character[] | null;
