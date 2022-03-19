import { dayjs } from "./dayjs";

export interface DateOptions {
  /**
   * @default 'en'
   */
  lang?: string;
  timezone?: string;
  /**
   * @default 'full'
   */
  type?: "date" | "time" | "full";
}

export interface DateDetail {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface DateInfo {
  display: string;
  value: Date | undefined;
  detail: Partial<DateDetail>;
}

const getLang = (lang = "en"): string => {
  const langcode = lang.toLowerCase();

  if (langcode === "zh" || langcode === "zh-cn") return "zh";

  if (langcode === "en-us" || langcode === "en-uk" || langcode === "en")
    return "en";

  console.warn(`${lang} locale missing in config`);

  return "en";
};

export const timeTransformer = (
  date: Date,
  options: DateOptions = {}
): string => {
  const { lang, timezone, type } = options;

  dayjs.locale(getLang(lang));

  const dateText = timezone
    ? dayjs(date).tz(timezone).format("LL")
    : dayjs(date).format("LL");

  const timeText = timezone
    ? dayjs(date).tz(timezone).format("HH:mm")
    : dayjs(date).format("HH:mm");

  return type === "date"
    ? dateText
    : type === "time"
    ? timeText
    : `${dateText} ${timeText}`;
};

export const getDate = (
  date: string | Date | undefined,
  options: DateOptions = {}
): DateInfo | null => {
  const { timezone } = options;

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
        display: timeTransformer(value, {
          type: isDate ? "date" : "full",
          ...options,
        }),
        value,
        detail: {
          year,
          month,
          day,
          ...(isDate ? {} : { hour, minute, second }),
        },
      };
    }

    const timeRegPattern =
      /(?:(\d{2,4})[/-](\d{1,2})[/-](\d{1,2}))?\s*(?:(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/u;
    const result = timeRegPattern.exec((date as string).trim());

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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = dayjs({ ...detail, month: detail.month - 1 }).toDate();

      return {
        display: timeTransformer(value, {
          type: isDate ? "date" : isTime ? "time" : "full",
          ...options,
        }),
        value: isTime ? undefined : value,
        detail: isDate
          ? { year: detail.year, month: detail.month, day: detail.day }
          : isTime
          ? { hour: detail.hour, minute: detail.minute, second: detail.second }
          : detail,
      };
    }
  }

  return null;
};

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
