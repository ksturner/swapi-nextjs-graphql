import axios from 'axios';
/**
 * populateIDFromUrl - Convenience function for populating an ID
 * on the resulting object based on the ID found in the object's URL.
 * This is necessary because ID is not officially a part of the
 * object schema from SWapi
 */
export const populateIDFromUrl = (obj: { url: string }) => {
    return obj?.url ? obj.url?.split('/').pop() : null;
};

/**
 * fetchListOfUrlObjects - Convenience function for fetching fields in SWapi
 * that are lists of URLs to other objects.
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
