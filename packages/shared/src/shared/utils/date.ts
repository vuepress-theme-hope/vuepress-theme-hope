import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);

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
 * @description The function returns null instead of throw error when the date is invalid
 *
 * 获取日期信息
 *
 * @description 当日期无效时，函数返回 null 而不是抛出错误
 *
 * @param date Date or date info
 * @param timezone (optional) date timezone
 */
export const getDate = (
  date: string | Date | undefined,
  timezone?: string
): DateInfo | null => {
  if (date) {
    const time = dayjs(date instanceof Date ? date : date.trim());

    if (time.isValid()) {
      const currentTime = timezone ? dayjs(date).tz(timezone) : dayjs(date);
      const year = currentTime.year();
      const month = currentTime.month() + 1;
      const day = currentTime.date();
      const hour = currentTime.hour();
      const minute = currentTime.minute();
      const second = currentTime.second();
      const millisecond = currentTime.millisecond();
      const isDate =
        hour === 0 && minute === 0 && second === 0 && millisecond === 0;
      const value = currentTime.toDate();

      return {
        value,
        info: {
          year,
          month,
          day,
          ...(isDate ? {} : { hour, minute, second }),
        },
        type: isDate ? "date" : "full",
      };
    }

    const timeRegPattern =
      /(?:(\d{2,4})[/-](\d{1,2})[/-](\d{1,2}))?\s*(?:(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/u;
    const result = timeRegPattern.exec((<string>date).trim());

    if (result) {
      const [, year, month, day, hour, minute, second] = result;

      const getNumber = (a: string | undefined): number | undefined =>
        typeof a === "undefined" ? undefined : Number(a);

      const getYear = (yearNumber: number | undefined): number | undefined =>
        yearNumber && yearNumber < 100 ? yearNumber + 2000 : yearNumber;

      const getSecond = (
        secondNumber: number | undefined
      ): number | undefined => (hour && minute && !second ? 0 : secondNumber);

      const detail = {
        year: getYear(getNumber(year)),
        month: getNumber(month),
        day: getNumber(day),
        hour: getNumber(hour),
        minute: getNumber(minute),
        second: getSecond(getNumber(second)),
      };

      const isTime =
        year === undefined && month === undefined && day === undefined;
      const isDate =
        hour === undefined && minute === undefined && second === undefined;

      // @ts-ignore
      const value = dayjs({ ...detail, month: detail.month - 1 }).toDate();

      return {
        value: isTime ? undefined : value,
        info: isDate
          ? { year: detail.year, month: detail.month, day: detail.day }
          : isTime
          ? { hour: detail.hour, minute: detail.minute, second: detail.second }
          : detail,
        type: isTime ? "time" : isDate ? "date" : "full",
      };
    }
  }

  return null;
};

/**
 * Recent date will returns positive value, so dates will be latest to oldest after sorting
 *
 * @description Invalid date will appear at last
 *
 * 最近的日期将返回正值，因此在排序后日期将是最新到最旧
 *
 * @description 无效日期将出现在最后
 */
export const compareDate = (
  dateA: Date | number | string | undefined,
  dateB: Date | number | string | undefined
): number => {
  const parsedDateA = getDate(
    typeof dateA === "number" ? new Date(dateA) : dateA
  );
  const parsedDateB = getDate(
    typeof dateB === "number" ? new Date(dateB) : dateB
  );

  if (!parsedDateA || !parsedDateA.value) return 1;
  if (!parsedDateB || !parsedDateB.value) return -1;

  return parsedDateB.value.getTime() - parsedDateA.value.getTime();
};
