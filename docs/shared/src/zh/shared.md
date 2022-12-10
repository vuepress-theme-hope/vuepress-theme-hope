---
title: 共享
---

以下函数在 Node 端和客户端上均可用。

## deepMerge

将多个对象深度合并到第一个对象，对于将用户选项与默认选项合并很有用。

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

::: details 示例

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

从字符串或日期对象中获取日期信息。

::: note

当日期无效时，函数返回 null 而不是抛出错误。

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
 * 获取日期信息
 *
 * @param date Date or date info
 * @param timezone (optional) date timezone
 */
export const getDate: (
  date: string | Date | undefined,
  timezone?: string
) => DateInfo | null;
```

::: details 示例

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

// 如果你在 UTC 时区
// Asia/Shanghai 是 +8
getDate("12:34:56", "Asia/Shanghai");

// 所以在 UTC 是 上午 4 点
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

比较日期并将它们从最新到最旧排序。

无效日期会出现在最后。

```ts
/**
 * Recent date will returns positive value, so dates will be latest to oldest after sorting
 */
export const compareDate = (
  dateA: Date | number | string | undefined,
  dateB: Date | number | string | undefined
) => number;
```

::: details 示例

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

变量是否是有效的 URL。

```ts
/**
 * Whether a variable is a valid url
 */
export const isUrl: (url: unknown) => boolean;
```

## isAbsoluteUrl

变量是否是有效的绝对 URL。

```ts
/**
 * Whether a variable is a valid absolute url
 */
export const isAbsoluteUrl: (url: unknown) => boolean;
```
