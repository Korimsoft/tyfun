import { cloneDeep } from 'lodash';

type WithMethodName<K extends string> =
    K extends `${infer T}${string}`
        ? T extends Lowercase<T>
            ? `with${Capitalize<K>}`
            : `with_${K}`
        : never;

type BuilderMethods<T> = {
    [K in keyof T as WithMethodName<string & K>]: (value: T[K]) => Builder<T>;
}

export type Builder<T> = BuilderMethods<T> & {
    build: () => T;
};

export function aBuilder<T extends Record<string, any>>(template: Partial<T> = {}): Builder<T> {
    const builtObject: Partial<T> = cloneDeep(template);
    const handler = {
        get(target: Builder<T>, key: string) {
            if (key === 'build') {
                return () => cloneDeep(builtObject) as T;
            }
            else {
                const propName = resolvePropertyName(key);
                return (value: any) => {
                    builtObject[propName as keyof T] = value;
                    return new Proxy(target, handler);
                };
            }
        }
    };

    return new Proxy({} as Builder<T>, handler);
}

function resolvePropertyName(key: string): string {
    return  key.startsWith('with_')
        ? key.slice(5)
        : key.charAt(4).toLowerCase() + key.slice(5);
}