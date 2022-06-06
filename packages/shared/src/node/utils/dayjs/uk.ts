/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { default as dayjs, Dayjs } from "dayjs";
import type { Locale } from "./locale";

const monthFormat =
  "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split(
    "_"
  );
const monthStandalone =
  "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split(
    "_"
  );

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
  key: "m" | "h" | "ss" | "mm" | "hh" | "dd" | "MM" | "yy"
): string => {
  const format = {
    ss: withoutSuffix ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
    mm: withoutSuffix ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
    hh: withoutSuffix ? "година_години_годин" : "годину_години_годин",
    dd: "день_дні_днів",
    MM: "місяць_місяці_місяців",
    yy: "рік_роки_років",
  };

  if (key === "m") return withoutSuffix ? "хвилина" : "хвилину";
  if (key === "h") return withoutSuffix ? "година" : "годину";

  return `${number} ${plural(format[key], +number)}`;
};

const months = (dayjs: Dayjs, format: string): string => {
  if (MONTHS_IN_FORMAT.test(format)) return monthFormat[dayjs.month()];

  return monthStandalone[dayjs.month()];
};

months.s = monthStandalone;
months.f = monthFormat;

const locale: Partial<Locale> = {
  name: "uk",
  weekdays: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split(
    "_"
  ),
  weekdaysShort: "ндл_пнд_втр_срд_чтв_птн_сбт".split("_"),
  weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
  // @ts-ignore
  months,
  monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split(
    "_"
  ),
  weekStart: 1,
  relativeTime: {
    future: "за %s",
    past: "%s тому",
    s: "декілька секунд",
    // @ts-ignore
    m: relativeTimeWithPlural,
    // @ts-ignore
    mm: relativeTimeWithPlural,
    // @ts-ignore
    h: relativeTimeWithPlural,
    // @ts-ignore
    hh: relativeTimeWithPlural,
    d: "день",
    // @ts-ignore
    dd: relativeTimeWithPlural,
    M: "місяць",
    // @ts-ignore
    MM: relativeTimeWithPlural,
    y: "рік",
    // @ts-ignore
    yy: relativeTimeWithPlural,
  },
  ordinal: (n) => n,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY р.",
    LLL: "D MMMM YYYY р., HH:mm",
    LLLL: "dddd, D MMMM YYYY р., HH:mm",
  },
};

export const loadUkLocale = (extendeddayjs: typeof dayjs): void => {
  extendeddayjs.locale("uk", locale);
};
