/* eslint-disable @typescript-eslint/ban-ts-comment */
// Russian [ru]
import type { Dayjs, default as dayjs } from "dayjs";
import type { Locale } from "./locale";

const monthFormat =
  "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split(
    "_"
  );
const monthStandalone =
  "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
    "_"
  );

const monthShortFormat =
  "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_");
const monthShortStandalone =
  "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_");

const MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

const plural = (word: string, num: number): string => {
  const forms = word.split("_");

  return num % 10 === 1 && num % 100 !== 11
    ? forms[0]
    : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
    ? forms[1]
    : forms[2]; // eslint-disable-line
};

const relativeTimeWithPlural = (
  number: number,
  withoutSuffix: boolean,
  key: string
): string => {
  const format: Record<string, string> = {
    mm: withoutSuffix ? "минута_минуты_минут" : "минуту_минуты_минут",
    hh: "час_часа_часов",
    dd: "день_дня_дней",
    MM: "месяц_месяца_месяцев",
    yy: "год_года_лет",
  };

  if (key === "m") return withoutSuffix ? "минута" : "минуту";

  return `${number} ${plural(format[key], +number)}`;
};

const months = (dayjsInstance: Dayjs, format: string): string => {
  if (MONTHS_IN_FORMAT.test(format)) return monthFormat[dayjsInstance.month()];

  return monthStandalone[dayjsInstance.month()];
};

months.s = monthStandalone;
months.f = monthFormat;

const monthsShort = (dayjsInstance: Dayjs, format: string): string => {
  if (MONTHS_IN_FORMAT.test(format))
    return monthShortFormat[dayjsInstance.month()];

  return monthShortStandalone[dayjsInstance.month()];
};

monthsShort.s = monthShortStandalone;
monthsShort.f = monthShortFormat;

const locale: Partial<Locale> = {
  name: "ru",
  weekdays:
    "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
  weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
  weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
  // @ts-ignore
  months,
  // @ts-ignore
  monthsShort,
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY г.",
    LLL: "D MMMM YYYY г., H:mm",
    LLLL: "dddd, D MMMM YYYY г., H:mm",
  },
  relativeTime: {
    future: "через %s",
    past: "%s назад",
    s: "несколько секунд",
    // @ts-ignore
    m: relativeTimeWithPlural,
    // @ts-ignore
    mm: relativeTimeWithPlural,
    h: "час",
    // @ts-ignore
    hh: relativeTimeWithPlural,
    d: "день",
    // @ts-ignore
    dd: relativeTimeWithPlural,
    M: "месяц",
    // @ts-ignore
    MM: relativeTimeWithPlural,
    y: "год",
    // @ts-ignore
    yy: relativeTimeWithPlural,
  },
  ordinal: (n) => n,
  meridiem: (hour) =>
    hour < 4 ? "ночи" : hour < 12 ? "утра" : hour < 17 ? "дня" : "вечера",
};

export const loadRuLocale = (extendeddayjs: typeof dayjs): void => {
  extendeddayjs.locale("ru", locale);
};
