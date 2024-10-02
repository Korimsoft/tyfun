import {Predicate} from '../custom-types';
import {isNil} from "./isNil";
import {not} from "../operators";

export function notNil<T>(): Predicate<T> {
    return not<T>(isNil<T>());
    //return (item: T) => !(item === undefined || item === null);
}