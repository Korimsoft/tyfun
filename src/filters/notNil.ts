import {Predicate} from '../custom-types';
import {itemIsNil} from './itemIsNil'
import {not} from '../operators';

export function notNil<T>(): Predicate<T> {
    return not<T>(itemIsNil<T>());
}