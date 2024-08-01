import {HasId} from '../types/hasId';
import {Predicate} from '../types/predicate';

export function byId<T>(id: T): Predicate<HasId<T>> {
  return (item: HasId<T>) => id === item?.id;
}
