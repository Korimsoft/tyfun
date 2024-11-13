import {itemIsNil} from '../../src/filters/itemIsNil';


describe('isNil', () => {
    it.each([
        [null, true],
        [undefined, true],
        [1, false],
        ['', false],
        [[], false],
        [{}, false]
    ])('Should return a predicate that checks if an object is null or undefined', (input, expected) => {
        expect(itemIsNil()(input)).toBe(expected);
    })
})