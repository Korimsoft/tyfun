import {Predicate} from "../custom-types";
import {isNil} from '../value-checks/isNil';

export function itemIsNil<T>(): Predicate<T> {
    return isNil;
}