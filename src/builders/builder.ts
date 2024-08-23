import {cloneDeep} from 'lodash';

export type Builder<T> = {
  init: (prototype?: Partial<T>) => InitializedBuilder<T>;
};

type InitializedBuilder<T> = {
  setProperty: PropertyAssignment<T>;
  build: () => T;
};

type PropertyAssignment<T> = <TValue extends T[keyof T]>(propertyKey: keyof T, value: TValue) => InitializedBuilder<T>;

export function aBuilder<T>(prototype: T = null as T): InitializedBuilder<T> {
  const builtObject = cloneDeep(prototype) ?? ({} as T);

  return {
    setProperty: assignAProperty<T>(builtObject),
    build: () => builtObject,
  } as InitializedBuilder<T>;
}

function assignAProperty<T>(builtObject: T): PropertyAssignment<T> {
  return <TValue extends T[keyof T]>(propertyKey: keyof T, value: TValue) => {
    builtObject[propertyKey] = value;
    return aBuilder<T>(builtObject);
  };
}
