import {byValue} from '../../src/filters/byValue';

describe('byValue', () => {
    it.each([
        {
            pattern: 0,
            testedValue: 0,
            expected: true
        },
        {
            pattern: 1,
            testedValue: 0,
            expected: false
        },
        {
            pattern: 'Some Value',
            testedValue: 'Some Value',
            expected: true
        },
        {
            pattern: 'Some Value',
            testedValue: null as unknown as string,
            expected: false
        },
        {
            pattern: {property: 1},
            testedValue: {property: 1},
            expected: true
        },
        {
            pattern: {property: 1},
            testedValue: {property: 1, otherProperty: 'something'},
            expected: false
        },
        {
            pattern: {},
            testedValue: {},
            expected: true
        },
        {
            pattern: [],
            testedValue: [],
            expected: true
        },
        {
            pattern: [0],
            testedValue: [1],
            expected: false
        },
        {
            pattern: [{prop: 1}],
            testedValue: [{prop: 1}],
            expected: true
        },
        {
            pattern: [{prop: 1}],
            testedValue: [{prop: 2}],
            expected: false
        },
    ])('Returns a predicate that returns $expected when a tested value $testedValue equals the pattern $pattern.',
        ({pattern, testedValue, expected}) => {
            expect(byValue(pattern)(testedValue)).toEqual(expected);
        });
});