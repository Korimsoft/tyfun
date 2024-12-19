import { identity } from '../../src/mappers/identity';

describe('Identity', () => {
    it.each(
        [
            [null, null],
            [1, 1],
            ['hello', 'hello'],
            [{}, {}],
            [{prop: 'hello'}, {prop: 'hello'}]
        ]
    )('Should return the same value as input', (input, expected) => {
        expect(identity()(input)).toEqual(expected);
    });
});