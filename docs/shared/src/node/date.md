---
title: Date Related
---

### getDateInfo

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
export const getDateInfo: (
  date: string | Date | undefined,
  timezone?: string,
) => DateInfo | null;
```

::: details Example

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

// if you are in UTC
// Asia/Shanghai is +8
getDateInfo("12:34:56", "Asia/Shanghai");

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

### compareDate

Compare dates and sort them from latest to oldest.

Invalid date will appear at last.

```ts
/**
 * Recent date will returns positive value, so dates will be latest to oldest after sorting
 */
export const compareDate: (
  dateA: Date | number | string | undefined,
  dateB: Date | number | string | undefined,
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
