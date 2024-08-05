import {ObjectWithId} from '../custom-types';
import {Predicate} from '../custom-types';

export function byId<T>(id: T): Predicate<ObjectWithId<T>> {
  return (item: ObjectWithId<T>) => id === item?.id;
}
