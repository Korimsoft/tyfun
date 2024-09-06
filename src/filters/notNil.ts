import {Predicate} from "../custom-types";

export function notNil<T>(): Predicate<T> {
    return (item: T) => !(item === undefined || item === null);
}