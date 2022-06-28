import { populateIDFromUrl } from '.';

it('populateIDFromUrl should return the ID from the URL', () => {
    const o = {
        url: 'https://swapi.dev/api/people/100/',
    };
    expect(populateIDFromUrl(o)).toEqual('100');
    expect(populateIDFromUrl(o)).not.toEqual(100);

    const o2 = {
        url: 'https://swapi.dev/api/people/100',
    };
    expect(populateIDFromUrl(o2)).toEqual('100');
    expect(populateIDFromUrl(o2)).not.toEqual(100);
});

it('populateIDFromUrl should not return the ID from the URL', () => {
    const o = {
        url: '',
    };
    expect(populateIDFromUrl(o)).toBeNull();
});
