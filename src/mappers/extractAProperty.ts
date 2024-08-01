import {HasId} from '../types/hasId';
import {Mapper} from '../types/mapper';

export function extractId(item: HasId) {
  return item.id;
}

export function extractAProperty<TObject, TProperty>(propertyName: keyof TObject): Mapper<TObject, TProperty> {
  return (inputObject: TObject) => (inputObject[propertyName] ?? null) as TProperty;
}
