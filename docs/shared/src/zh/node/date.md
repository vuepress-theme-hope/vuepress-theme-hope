---
title: 日期相关
---

### getDateInfo

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
export const getDateInfo: (
  date: string | Date | undefined,
  timezone?: string,
) => DateInfo | null;
```

::: details 示例

```ts
// or vuepress-shared/client
import { getDateInfo } from "vuepress-shared/node";

getDateInfo("2021-01-01 12:34:56");
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

getDateInfo("2021-01-01");
// {
//   value: Date("2021-01-01"),
//   info: {
//     year: 2021,
//     month: 1,
//     day: 1,
//   },
//   type: "date",
// }

getDateInfo("12:34:56");
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
getDateInfo("12:34:56", "Asia/Shanghai");

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

### compareDate

比较日期并将它们从最新到最旧排序。

无效日期会出现在最后。

```ts
/**
 * Recent date will returns positive value, so dates will be latest to oldest after sorting
 */
export const compareDate = (
  dateA: Date | number | string | undefined,
  dateB: Date | number | string | undefined,
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
