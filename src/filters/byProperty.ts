import {Predicate} from "../custom-types/predicate";

export function byProperty<T>(propertyName: keyof T, propertyValue: any): Predicate<T> {
    return (item: T) => propertyValue === item[propertyName];
}