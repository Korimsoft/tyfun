import {isNil} from '../../src/filters/isNil';


describe('isNil', () => {
    it.each([
        [null, true],
        [undefined, true],
        [1, false],
        ['', false],
        [[], false],
        [{}, false]
    ])('Should return a predicate that checks if an object is null or undefined', (input, expected) => {
        expect(isNil()(input)).toBe(expected);
    })
})