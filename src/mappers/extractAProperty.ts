import {ObjectWithId} from '../custom-types';
import {Mapper} from './mapper';

export function extractId<Tid>(item: ObjectWithId<Tid>): Tid {
  return extractAProperty<ObjectWithId<Tid>, Tid>('id')(item);
}

export function extractAProperty<TObject, TProperty>(propertyName: keyof TObject): Mapper<TObject, TProperty> {
  return (inputObject: TObject) => (inputObject[propertyName] ?? null) as TProperty;
}
