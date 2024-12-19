import {Mapper} from './mapper';

export function identity<T>(): Mapper<T, T> {
    return (from :T ) => from;
}