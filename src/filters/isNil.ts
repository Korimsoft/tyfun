import {Predicate} from "../custom-types";

export function isNil<T>(): Predicate<T> {
    return (item: T) => item === null || item === undefined;
}