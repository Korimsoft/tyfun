import {byProperty} from "../../src/filters/byProperty";

describe('byProperty', () => {
    type TestParam = {
        description: string,
        givenAnObject: any,
        givenPropertyName: string,
        givenPropertyValue: any,
        expected: boolean,
    }

    it.each([
        {
            description: 'returns true if a given property of an input object has given value',
            givenPropertyName: 'aProperty',
            givenPropertyValue: 69,
            givenAnObject: {aProperty: 69, otherProperty: 'something'},
            expected: true,
        },
        {
            description: 'returns false if a given property of an input object has a differing value',
            givenPropertyName: 'aProperty',
            givenPropertyValue: 70,
            givenAnObject: {aProperty: 69, otherProperty: 'something'},
            expected: false,
        },
    ])
    ('Creates a predicate that: $description',
        ({givenAnObject, givenPropertyName, givenPropertyValue, expected}: TestParam) => {
        const predicate = byProperty(givenPropertyName, givenPropertyValue);
        expect(predicate(givenAnObject)).toEqual(expected);
    })
})