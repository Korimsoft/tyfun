import {aBuilder} from '../../src/builders/builder';

describe('A generic object builder', () => {
  type TestingObject = {
    stringProperty: string;
    numberProperty: number;
    objectProperty: object;
    arrayProperty: any[];
  };

  it('Builds an instance of an object', () => {
    const builtObject = aBuilder<TestingObject>()
      .setProperty('stringProperty', 'test')
      .setProperty('numberProperty', 1024)
      .setProperty('objectProperty', { someProp: 'test' })
      .setProperty('arrayProperty', [1, 2, 4, 8, 16])
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

  it('Changes a value of an object while keeping the prototype object not mutated', () => {
    const prototype: TestingObject = {
      stringProperty: 'original',
      numberProperty: 1024,
      objectProperty: { someProp: 'test' },
      arrayProperty: [1, 2, 4, 8, 16],
    };

    const newObject = aBuilder<TestingObject>(prototype).setProperty('stringProperty', 'newValue').build();

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
