import {isNil} from 'lodash';

describe('isNil', () => {
    it.each([
        [null, true],
        [undefined, true],
        ['', false],
        [0, false],
        [{}, false],
        [[], false]
    ])('Should return true if the value is null or undefined', (input, expected) => {
        expect(isNil(input)).toBe(expected)
    })
})