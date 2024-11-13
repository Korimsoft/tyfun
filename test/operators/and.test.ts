import {and, Predicate} from '../../src';

describe('and operator', () => {
    it.each([
            {
                predicatesReturn: [true, true, true],
                expected: true
            },
            {
                predicatesReturn: [true, true, false],
                expected: false
            },
            {
                predicatesReturn: [true, false, true],
                expected: false
            },
            {
                predicatesReturn: [false, true, true],
                expected: false
            }
        ]
    )('Should perform a logical and operation over predicates with same input parametres. Case $predicatesReturn -> $expected',
        ({predicatesReturn, expected}) => {
            const predicates = givenPredicates(...predicatesReturn);

            expect(and(...predicates)('Irrelevant for Test')).toEqual(expected);
        });


    it('Should treat null as a predicate that always returns false (unlikely scenario)', () => {
        const p1: Predicate<number> = (input: number) => input !== 0;
        const p2: Predicate<number> = null as unknown as Predicate<number>;

        expect(and(p1, p2)(1)).toEqual(false);
    });
});

function givenPredicates(...returnValues: boolean[]): Predicate<string>[] {
    return returnValues.map(value => (input: string) => value);
}