import {aBuilder} from '../../src/builders/builder';

describe('A generic object builder', () => {
  interface TestingObject {
    stringProperty: string;
    numberProperty: number;
    objectProperty: object;
    arrayProperty: any[];
  };

  type TestingObjectType = TestingObject;

  it('Builds an instance of an object - interface case', () => {
    const builtObject = aBuilder<TestingObject>()
      .withStringProperty('test')
      .withNumberProperty( 1024)
      .withObjectProperty({ someProp: 'test' })
      .withArrayProperty( [1, 2, 4, 8, 16])
      .build();

    expect(builtObject).toEqual({
      stringProperty: 'test',
      numberProperty: 1024,
      objectProperty: { someProp: 'test' },
      arrayProperty: [1, 2, 4, 8, 16],
    } as TestingObject);
  });

  it('Builds an instance of an object - typee case', () => {
    const builtObject = aBuilder<TestingObjectType>()
      .withStringProperty('test')
      .withNumberProperty( 1024)
      .withObjectProperty({ someProp: 'test' })
      .withArrayProperty( [1, 2, 4, 8, 16])
      .build();

    expect(builtObject).toEqual({
      stringProperty: 'test',
      numberProperty: 1024,
      objectProperty: { someProp: 'test' },
      arrayProperty: [1, 2, 4, 8, 16],
    } as TestingObject);
  });

  it('Builds an object from a prototype', () => {
    const prototype: TestingObject = {
      stringProperty: 'original',
      numberProperty: 1024,
      objectProperty: { someProp: test },
      arrayProperty: [1, 2, 4, 8, 16],
    };

    expect(aBuilder<TestingObject>(prototype).build()).toEqual(prototype);
  });

  it('Should use the correct property names (edge case scenario)', () => {
     type EdgeCaseObject = {
       ACapitalAtStart: string,
       thereIsAnAInside: string,
       thereIsABCinside: string
     }

     const result: EdgeCaseObject = aBuilder<EdgeCaseObject>()
         .with_ACapitalAtStart('hello')
         .withThereIsAnAInside('there')
         .withThereIsABCinside('General')
         .build();

     expect(result).toEqual({
       ACapitalAtStart: 'hello',
       thereIsAnAInside: 'there',
       thereIsABCinside: 'General',
     });

  });

  it('Changes a value of an object while keeping the prototype object not mutated', () => {
    const prototype: TestingObject = {
      stringProperty: 'original',
      numberProperty: 1024,
      objectProperty: { someProp: 'test' },
      arrayProperty: [1, 2, 4, 8, 16],
    };

    const newObject: TestingObject = aBuilder<TestingObject>(prototype).withStringProperty('newValue').build();

    expect(prototype).toEqual({
      stringProperty: 'original',
      numberProperty: 1024,
      objectProperty: { someProp: 'test' },
      arrayProperty: [1, 2, 4, 8, 16],
    });

    expect(newObject).toEqual({
      stringProperty: 'newValue',
      numberProperty: 1024,
      objectProperty: { someProp: 'test' },
      arrayProperty: [1, 2, 4, 8, 16],
    });
  });
});
