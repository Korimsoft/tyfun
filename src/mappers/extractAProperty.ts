import {ObjectWithId} from '../custom-types/objectWithId';
import {Mapper} from './mapper';

export function extractId(item: ObjectWithId) {
  return item.id;
}

export function extractAProperty<TObject, TProperty>(propertyName: keyof TObject): Mapper<TObject, TProperty> {
  return (inputObject: TObject) => (inputObject[propertyName] ?? null) as TProperty;
}
