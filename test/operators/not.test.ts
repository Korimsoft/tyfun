import {not} from "../../src";

describe('An operator that negates a predicate result when called', () => {
    it.each([
        {
            description: 'Predicate returning true',
            predicate: () => true,
            expected: false
        },{
            description: 'Predicate returning false',
            predicate: () => false,
            expected: true
        },

    ])('Should negate the original predicate result: $description', ({predicate, expected}) => {
        const result = not(predicate)({});
        expect(result).toEqual(expected);
    })
})