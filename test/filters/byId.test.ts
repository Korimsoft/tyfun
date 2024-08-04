import {byId} from '../../src/filters/byId';
import {HasId} from '../../src/types/hasId';
import {HasTestDescription} from '../testHelpers/hasTestDescription';

type TestParams = {
  searchedId: string | number;
  givenAnObject: any & HasId;
  expected: boolean;
} & HasTestDescription;

describe('A search filter for filtering items by their ID', () => {
  it.each([
    {
      description: 'When Searched ID is null, return false',
      searchedId: null as unknown as string,
      givenAnObject: {id: 'someId'},
      expected: false,
    },
    {
      description: 'When input object is null, return false',
      searchedId: 'someId',
      givenAnObject: null,
      expected: false,
    },
    {
      description: 'When Searched ID matches object ID, return true',
      searchedId: 'someId',
      givenAnObject: {id: 'someId'},
      expected: true,
    },
    {
      description: 'When Searched ID does not match object ID, return false',
      searchedId: 'someId',
      givenAnObject: {id: 'otherId'},
      expected: false,
    },
  ])(
    'Should return a Predicate that tests if item has an id: $description',
    ({searchedId, givenAnObject, expected}: TestParams) => {
      const predicate = byId(searchedId);
      expect(predicate(givenAnObject)).toEqual(expected);
    },
  );
});
