import {cloneDeep} from 'lodash';

type WithMethodName<K extends string> = `with${Capitalize<K>}`;

type BuilderMethods<T> = {
    [K in keyof T as WithMethodName<K & string>]: (value: T[K]) => Builder<T>;
}

export type Builder<T> = BuilderMethods<T> & {
    build: () => T
};

export function aBuilder<T extends Object>(template: Partial<T> = {}): Builder<T> {
    const builtObject: Partial<T> = cloneDeep(template);
    const builder =  new Proxy({} as Builder<T>, {
        get(target: Builder<T>, key: string) {
            if (key === 'build') {
                return () => cloneDeep(builtObject) as T;
            } else if (key.startsWith('with')) {
                return (value: any) => {
                    const propName = `${key.charAt(4).toLowerCase()}${key.substring(5)}`;
                    builtObject[propName as keyof T] = value;
                    return builder;
                }
            } else {
                return target[key as keyof Builder<T>];
            }
        }
    });

    return builder;
}


