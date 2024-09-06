import {notNil} from "../../src";

describe('notNil', () => {
    it.each([
        [null, false],
        [undefined, false],
        [0, true],
        ['', true],
        [{}, true],
        [[], true]
    ])(
        'Should return a Predicate that test if an item is not null or undefined.', (input, expected) => {
            expect(notNil()(input)).toEqual(expected);
        }
    )
})