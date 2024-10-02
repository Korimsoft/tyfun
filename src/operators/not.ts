import {Predicate} from "../custom-types";

export function not<T>(predicate: Predicate<T>): Predicate<T> {
    return (argument: T) => !predicate(argument);
}