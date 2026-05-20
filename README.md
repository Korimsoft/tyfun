# Korimsoft's TyFun Library

A small TypeScript utility library containing reusable functions, types, predicates, mappers, builders, and value-check helpers.

TyFun is intended to make common TypeScript development tasks a little easier by providing simple, typed helpers for object building, filtering, mapping, predicate composition, and null/undefined checks.

---

**_WARNING_**

This is a library undergoing active development.
Use with care, as there may be incompatible changes between versions.

---

## Installation

```bash
npm install --save korimsoft-tyfun@latest
```

## Usage

Import utilities directly from the package root:

```typescript
import { aBuilder, byId, notNil, extractId, isNil } from 'korimsoft-tyfun';
```

## Feature Overview

- **Builders** - fluent builders for plain TypeScript objects
- **Filters / Predicates** - reusable predicate functions for `filter`, `find`, and similar operations
- **Mappers** - helpers for extracting and transforming values
- **Operators** - predicate combinators such as `not` and `and`
- **Value Checks** - utilities for null and undefined checks
- **Custom Types** - reusable generic TypeScript types

## Builders

### `aBuilder<T>()`

Creates a fluent builder for plain TypeScript objects.

```typescript
import { aBuilder } from 'korimsoft-tyfun';

type User = {
  id: string;
  name: string;
  age: number;
};

const user = aBuilder<User>()
  .withId('user-1')
  .withName('Alice')
  .withAge(30)
  .build();
```

You can also provide a partial template:

```typescript
import { aBuilder } from 'korimsoft-tyfun';

type User = {
  id: string;
  name: string;
  active: boolean;
};

const activeUserBuilder = aBuilder<User>({
  active: true
});

const user = activeUserBuilder
  .withId('user-1')
  .withName('Alice')
  .build();
```

For properties that start with an uppercase letter, the generated builder method uses `with_`:

```typescript
import { aBuilder } from 'korimsoft-tyfun';

type Config = {
  URL: string;
};

const config = aBuilder<Config>()
  .with_URL('https://example.com')
  .build();
```

## Filters and Predicates

TyFun provides predicate helpers that can be used with array methods such as `filter`, `find`, and `some`.

### `byId(id)`

Creates a predicate that matches objects with a specific `id`.

```typescript
import { byId } from 'korimsoft-tyfun';

const users = [
  { id: 'user-1', name: 'Alice' },
  { id: 'user-2', name: 'Bob' }
];

const user = users.find(byId('user-1'));
```

### `byProperty(propertyName, propertyValue)`

Creates a predicate that matches objects by a property value.

```typescript
import { byProperty } from 'korimsoft-tyfun';

const users = [
  { id: 'user-1', role: 'admin' },
  { id: 'user-2', role: 'user' }
];

const admins = users.filter(byProperty('role', 'admin'));
```

### `byValue(pattern)`

Creates a predicate that matches values using deep equality.

```typescript
import { byValue } from 'korimsoft-tyfun';

const values = [
  { enabled: true },
  { enabled: false },
  { enabled: true }
];

const enabledValues = values.filter(byValue({ enabled: true }));
```

### `notNil()`

Creates a predicate that excludes `null` and `undefined`.

```typescript
import { notNil } from 'korimsoft-tyfun';

const values = ['hello', null, 'world', undefined];

const definedValues = values.filter(notNil());
```

### `itemIsNil()`

Creates a predicate that matches `null` or `undefined`.

```typescript
import { itemIsNil } from 'korimsoft-tyfun';

const values = ['hello', null, 'world', undefined];

const emptyValues = values.filter(itemIsNil());
```

## Mappers

### `identity<T>()`

Returns a mapper that returns the input value unchanged.

```typescript
import { identity } from 'korimsoft-tyfun';

const values = [1, 2, 3];

const sameValues = values.map(identity<number>());
```

### `extractAProperty(propertyName)`

Creates a mapper that extracts a property from an object.

```typescript
import { extractAProperty } from 'korimsoft-tyfun';

const users = [
  { id: 'user-1', name: 'Alice' },
  { id: 'user-2', name: 'Bob' }
];

const names = users.map(extractAProperty('name'));
```

### `extractId(item)`

Extracts the `id` property from an object.

```typescript
import { extractId } from 'korimsoft-tyfun';

const users = [
  { id: 'user-1', name: 'Alice' },
  { id: 'user-2', name: 'Bob' }
];

const ids = users.map(extractId);
```

## Operators

### `not(predicate)`

Creates a predicate that negates another predicate.

```typescript
import { not, byProperty } from 'korimsoft-tyfun';

const users = [
  { id: 'user-1', active: true },
  { id: 'user-2', active: false }
];

const inactiveUsers = users.filter(not(byProperty('active', true)));
```

### `and(...predicates)`

Creates a predicate that returns `true` only when all provided predicates match.

```typescript
import { and, byProperty } from 'korimsoft-tyfun';

const users = [
  { id: 'user-1', role: 'admin', active: true },
  { id: 'user-2', role: 'admin', active: false },
  { id: 'user-3', role: 'user', active: true }
];

const activeAdmins = users.filter(
  and(
    byProperty('role', 'admin'),
    byProperty('active', true)
  )
);
```

## Value Checks

### `isNil(item)`

Checks whether a value is `null` or `undefined`.

```typescript
import { isNil } from 'korimsoft-tyfun';

isNil(null); // true
isNil(undefined); // true
isNil('hello'); // false
isNil(0); // false
```

## Custom Types

TyFun exports several reusable TypeScript types.

### `ObjectWithId<TId>`

Represents an object with an `id` property.

```typescript
import type { ObjectWithId } from 'korimsoft-tyfun';

type User = ObjectWithId<string> & {
  name: string;
};
```

### `ObjectMap<TValue>`

Represents an object indexed by string or number keys.

```typescript
import type { ObjectMap } from 'korimsoft-tyfun';

const usersById: ObjectMap<{ name: string }> = {
  'user-1': { name: 'Alice' },
  'user-2': { name: 'Bob' }
};
```

### `Predicate<T>`

Represents a function that receives an item and returns a boolean.

```typescript
import type { Predicate } from 'korimsoft-tyfun';

const isLongString: Predicate<string> = value => value.length > 10;
```

### `Mapper<FromType, ToType>`

Represents a function that maps one value to another.

```typescript
import type { Mapper } from 'korimsoft-tyfun';

const stringLength: Mapper<string, number> = value => value.length;
```

## Exported API

The package currently exports:

### Builders

- `aBuilder`
- `Builder`

### Filters

- `byId`
- `byProperty`
- `byValue`
- `notNil`
- `itemIsNil`

### Mappers

- `identity`
- `extractAProperty`
- `extractId`
- `Mapper`

### Operators

- `not`
- `and`

### Value Checks

- `isNil`

### Custom Types

- `ObjectWithId`
- `ObjectMap`
- `Predicate`

## License

MIT
