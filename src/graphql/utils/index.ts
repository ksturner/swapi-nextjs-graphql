import axios from 'axios';
/**
 * populateIDFromUrl
 *
 * @param {string} obj - Any object with a url property ending with an ID
 */
export const populateIDFromUrl = (obj: { url: string }) => {
    return obj?.url ? obj.url?.split('/').pop() : null;
};

/**
 * fetchListOfUrlObjects
 *
 * @param {string} urls - list of urls to fetch and return objects in array
 */
export const fetchListOfUrlObjects = async (urls: string[]) => {
    type T = any; // should define as axios response type
    const allFetches: Promise<T>[] = [];
    try {
        for (const u of urls) {
            allFetches.push(axios.get(u));
        }
        const responses = await Promise.all(allFetches);
        return responses
            .map((r: any) => {
                if (r.status === 200) {
                    return r.data;
                }
                return null;
            })
            .filter((r: any) => r !== null);
    } catch (err) {
        console.log(err);
        return []; // TODO: better to define some common error response
    }
};
