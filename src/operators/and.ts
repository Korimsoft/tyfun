import {Predicate} from '../custom-types';
import {isNil} from '../value-checks';
import {not} from './not';

export function and<T>(...predicates: Predicate<T>[]): Predicate<T> {
    return (argument: T) => !predicates
            .map(onPredicateNilReturnAlwaysFalse)
            .some(isPredicateThatReturnsFalse(argument));
}

function onPredicateNilReturnAlwaysFalse<T>(predicate: Predicate<T>): Predicate<T> {
    return isNil(predicate) ? () => false : predicate;
}

function isPredicateThatReturnsFalse<T>(argument:T): Predicate<Predicate<T>> {
    return not((predicate: Predicate<T>) => predicate({...argument}));
}