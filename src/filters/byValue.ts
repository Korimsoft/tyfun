import {Predicate} from '../custom-types';
import {isEqual} from 'lodash';

export function byValue<T>(pattern: T): Predicate<T> {
    return (item: T) => isEqual(item, pattern);
}