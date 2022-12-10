---
title: Shared
---

The following functions are available on both node and client.

## deepMerge

Deep merge objects to the first one, useful for merging user options with default options.

```ts
/**
 * Deep merge objects to the first one
 */
export const deepMerge: <
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
import { deepMerge } from "vuepress-shared/node";

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

deepMerge(defaultOptions, userOptions);
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

## date

Get date info from a string or Date object.

::: note

The function returns null instead of throw error when the date is invalid.

:::

```ts
export interface DateDetail {
  year?: number | undefined;
  month?: number | undefined;
  day?: number | undefined;
  hour?: number | undefined;
  minute?: number | undefined;
  second?: number | undefined;
}

export interface DateInfo {
  type: "date" | "time" | "full";
  info: DateDetail;
  value: Date | undefined;
}

/**
 * Get Date info
 *
 * @param date Date or date info
 * @param timezone (optional) date timezone
 */
export const getDate: (
  date: string | Date | undefined,
  timezone?: string
) => DateInfo | null;
```

::: details Example

```ts
// or vuepress-shared/client
import { getDate } from "vuepress-shared/node";

getDate("2021-01-01 12:34:56");
// {
//   value: Date("2021-01-01 12:34:56"),
//   info: {
//     year: 2021,
//     month: 1,
//     day: 1,
//     hour: 12,
//     minute: 34,
//     second: 56,
//   },
//   type: "full",
// }

getDate("2021-01-01");
// {
//   value: Date("2021-01-01"),
//   info: {
//     year: 2021,
//     month: 1,
//     day: 1,
//   },
//   type: "date",
// }

getDate("12:34:56");
// {
//   value: undefined,
//   info: {
//     hour: 12,
//     minute: 34,
//     second: 56,
//   },
//   type: "time",
// }

// if you are in UTC
// Asia/Shanghai is +8
getDate("12:34:56", "Asia/Shanghai");

// It will be 4AM in UTC
// {
//   value: undefined,
//   info: {
//     hour: 4,
//     minute: 34,
//     second: 56,
//   },
//   type: "time",
// }
```

:::

## compareDate

Compare dates and sort them from latest to oldest.

Invalid date will appear at last.

```ts
/**
 * Recent date will returns positive value, so dates will be latest to oldest after sorting
 */
export const compareDate: (
  dateA: Date | number | string | undefined,
  dateB: Date | number | string | undefined
) => number;
```

::: details Example

```ts
// or vuepress-shared/client
import { compareDate } from "vuepress-shared/node";

const dates = [
  "2021-01-01",
  "2022-04-05 08:00:00",
  "04:38:45",
  "19999",
  "2022-03-08",
];

dates.sort(compareDate);
// [
//   "2022-04-05 08:00:00",
//   "2022-03-08",
//   "2021-01-01",
//   "04:38:45",
//   "19999",
// ];
```

:::

## isUrl

Whether a variable is a valid url.

```ts
/**
 * Whether a variable is a valid url
 */
export const isUrl: (url: unknown) => boolean;
```

## isAbsoluteUrl

Whether a variable is a valid absolute url.

```ts
/**
 * Whether a variable is a valid absolute url
 */
export const isAbsoluteUrl: (url: unknown) => boolean;
```
