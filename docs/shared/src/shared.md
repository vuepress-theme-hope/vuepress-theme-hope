---
title: Shared
icon: share-nodes
---

The following functions are available on both node and client.

## Props Related

Encode/decode and zip/unzip props.

This is useful in markdown plugins when you want to encode string content and pass it to the component through props.

You may simply achieve this with `encodeURIComponent` and `decodeURIComponent`, but it can be very large if the content contains lots of special characters.

So we provide `utoa` and `atou` to zip and encode content.

```ts
export const utoa: (data: string, level: DeflateOptions["level"] = 6) => string;

export const atou: (base64: string) => string;
```

::: details

```ts
const content = `
{
  "type": "bar",
  "data": {
    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    "datasets": [
      {
        "label": "# of Votes",
        "data": [12, 19, 3, 5, 2, 3],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {
    "scales": {
      "y": {
        "beginAtZero": true
      }
    }
  }
}
`;

const prop = utoa(content); // "eJyNUsFOwzAMve8rrHABKZqWlg5WxAE4cARxAMHEIV1NmQhNlaaCCe3fcdKtW0sLWGpjxy/v+UV512mlcIyfhTa2hHP4GgHYVYExsEQaxqlMpZWxbwAomaAqY5izO0wZB3apKnTrIyqlP1x2bRBzl9xWplC+eWNkniF7dmw1X4nWsfgaNtwNP2kfgH6Be22x9CPUUQ8yFwEHMeMQcog4UBFuiF0kcvGWGV3l6ZVW2uw0XDCTJfIwiOjYjAhESIcn4+BoT2MLio6pP6V+EBJ6AOSZgsmUwyl9A6ATwoiZn3lYTkTkRkycnuP8TU9ENPqUxuuA9i9BmxTNPy9A/G2/F9I23wtpW++FdIwPKzW2W5Afph+WqX2NQWz313XicT7XhV3qnB5f/ejKhVTYVACrXUqUmC3zC/uERsdgTYUdVr/Qb302+gZxe7S/"

atou(prop); // will be the original content

// if you use `encodeURIComponent`, it will be much longer
encodeURIComponent(content); // '%0A%7B%0A%20%20%22type%22%3A%20%22bar%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%22Red%22%2C%20%22Blue%22%2C%20%22Yellow%22%2C%20%22Green%22%2C%20%22Purple%22%2C%20%22Orange%22%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22label%22%3A%20%22%23%20of%20Votes%22%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B12%2C%2019%2C%203%2C%205%2C%202%2C%203%5D%2C%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%22rgba(255%2C%2099%2C%20132%2C%200.2)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(54%2C%20162%2C%20235%2C%200.2)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(255%2C%20206%2C%2086%2C%200.2)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(75%2C%20192%2C%20192%2C%200.2)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(153%2C%20102%2C%20255%2C%200.2)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(255%2C%20159%2C%2064%2C%200.2)%22%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%22rgba(255%2C%2099%2C%20132%2C%201)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(54%2C%20162%2C%20235%2C%201)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(255%2C%20206%2C%2086%2C%201)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(75%2C%20192%2C%20192%2C%201)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(153%2C%20102%2C%20255%2C%201)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22rgba(255%2C%20159%2C%2064%2C%201)%22%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%201%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22scales%22%3A%20%7B%0A%20%20%20%20%20%20%22y%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22beginAtZero%22%3A%20true%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A'
```

:::

## Utils

### isDef

Check if a value is defined.

```ts
/**
 * Check if a value is defined
 */
export const isDef: <T = any>(val?: T | undefined) => val is T;
```

### isBoolean

Check if a value is a boolean.

```ts
/**
 * Check if a value is a boolean
 */
export const isBoolean: (val: unknown) => val is boolean;
```

### isString

Check if a value is a string.

```ts
/**
 * Check if a value is a string
 */
export const isString: (val: unknown) => val is string;
```

### isNumber

Check if a value is a number.

```ts
/**
 * Check if a value is a number
 */
export const isNumber: (val: unknown) => val is number;
```

### isObject

Check if a value is an object.

```ts
/**
 * Check if a value is a object
 */
export const isObject: (val: unknown) => val is object;
```

### isPlainObject

Check if a value is a plain object.

```ts
/**
 * Check if a value is a plain object
 */
export const isPlainObject: <T extends Record<any, any> = Record<any, any>>(
  val: unknown
) => val is T;
```

### isFunction

Check if a value is a function.

```ts
/**
 * Check if a value is a function
 */
export const isFunction: (val: unknown) => val is Function;
```

### startsWith

Check if a string starts with a given substring.

```ts
/**
 * Check if a string starts with a given substring
 */
export const startsWith: (str: string, prefix: string) => boolean;
```

### endsWith

Check if a string ends with a given substring.

```ts
/**
 * Check if a string ends with a given substring
 */
export const endsWith: (str: string, suffix: string) => boolean;
```

### entries

Get the entries of an object.

```ts
/**
 * Get the entries of an object
 */
export const entries: {
  <T>(
    o:
      | {
          [s: string]: T;
        }
      | ArrayLike<T>
  ): [string, T][];
  (o: {}): [string, any][];
};
```

### fromEntries

Create an object from an iterable of key-value pairs.

```ts
/**
 * Create an object from an iterable of key-value pairs
 */
export const fromEntries: {
  <T = any>(entries: Iterable<readonly [PropertyKey, T]>): {
    [k: string]: T;
  };
  (entries: Iterable<readonly any[]>): any;
};
```

### keys

Get the keys of an object.

```ts
/**
 * Get the keys of an object
 */
export const keys: {
  (o: object): string[];
  (o: {}): string[];
};
```

### values

Get the values of an object.

```ts
/**
 * Get the values of an object
 */
export const values: {
  <T>(
    o:
      | {
          [s: string]: T;
        }
      | ArrayLike<T>
  ): T[];
  (o: {}): any[];
};
```

### deepAssign

Deep version of `Object.assign`, useful for merging user options with default options.

```ts
/**
 * Deep merge objects to the first one
 */
export const deepAssign: <
  T extends IAnyObject,
  U extends IAnyObject = T,
  V extends Partial<T> & Partial<U> = T & U
>(
  originObject: T,
  ...overrideObjects: U[]
) => V;
```

::: details Example

```ts
// or vuepress-shared/client
import { deepAssign } from "vuepress-shared/node";

const defaultOptions = {
  optionA: {
    optionA1: "defaultOptionA1",
    optionA2: "defaultOptionA2",
    optionA3: "defaultOptionA3",
  },
  optionB: true,
  optionC: "optionC",
};

const userOptions = {
  optionA: {
    optionA1: "optionA1",
    optionA2: "optionA2",
  },
  optionB: false,
};

deepAssign(defaultOptions, userOptions);
// {
//   optionA: {
//     optionA1: "optionA1",
//     optionA2: "optionA2",
//     optionA3: "defaultOptionA3",
//   },
//   optionB: false,
//   optionC: "optionC",
// }
```

:::

### isUrl

Whether a variable is a valid url.

```ts
/**
 * Whether a variable is a valid url
 */
export const isUrl: (url: unknown) => boolean;
```

### isAbsoluteUrl

Whether a variable is a valid absolute url.

```ts
/**
 * Whether a variable is a valid absolute url
 */
export const isAbsoluteUrl: (url: unknown) => boolean;
```
