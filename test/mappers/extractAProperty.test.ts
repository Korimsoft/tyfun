import {extractAProperty, extractId} from '../../src/mappers/extractAProperty';
import {ObjectWithId} from '../../src/custom-types/objectWithId';
import {HasTestDescription} from '../testHelpers/hasTestDescription';

describe('extractId', () => {
  it('Should extract an Id property from an object', () => {
    const objectWithAnId: ObjectWithId = {
      id: 'anId',
    };
    expect(extractId(objectWithAnId)).toBe('anId');
  });
});

describe('extractAProperty function that returns a mapper selecting a property from an object', () => {
  type TestParam = {
    givenPropertyName: string;
    givenAnObject: any;
    expected: any;
  } & HasTestDescription;

  it.each([
    {
      description: 'When a property exists on the object, its value is returned',
      givenPropertyName: 'aProperty',
      givenAnObject: {aProperty: 69, otherProperty: 'something'},
      expected: 69,
    },
    {
      description: 'When a property does not exist on the object, its null is returned',
      givenPropertyName: 'nonexistentProperty',
      givenAnObject: {aProperty: 69, otherProperty: 'something'},
      expected: null,
    },
  ])(
    'Extracts a property from an object, case: $description',
    ({givenAnObject, givenPropertyName, expected}: TestParam) => {
      const mapper = extractAProperty(givenPropertyName);
      expect(mapper(givenAnObject)).toEqual(expected);
    },
  );
});
