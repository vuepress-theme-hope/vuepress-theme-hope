/* eslint-disable @typescript-eslint/ban-ts-comment */
// German (Austria) [de-at]
import type { default as dayjs } from "dayjs";
import type { Locale } from "./locale";

const texts = {
  s: "ein paar Sekunden",
  m: ["eine Minute", "einer Minute"],
  mm: "%d Minuten",
  h: ["eine Stunde", "einer Stunde"],
  hh: "%d Stunden",
  d: ["ein Tag", "einem Tag"],
  dd: ["%d Tage", "%d Tagen"],
  M: ["ein Monat", "einem Monat"],
  MM: ["%d Monate", "%d Monaten"],
  y: ["ein Jahr", "einem Jahr"],
  yy: ["%d Jahre", "%d Jahren"],
};

const relativeTimeFormatter = (
  number: string,
  withoutSuffix: boolean,
  key: "s" | "m" | "mm" | "h" | "hh" | "d" | "dd" | "M" | "MM" | "y" | "yy"
): string => {
  let l = texts[key];

  if (Array.isArray(l)) l = l[withoutSuffix ? 0 : 1];

  return l.replace("%d", number);
};

const locale: Partial<Locale> = {
  name: "de-at",
  weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
    "_"
  ),
  weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
  weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
  months:
    "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
      "_"
    ),
  monthsShort:
    "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
  ordinal: (n) => `${n}.`,
  weekStart: 1,
  formats: {
    LTS: "HH:mm:ss",
    LT: "HH:mm",
    L: "DD.MM.YYYY",
    LL: "D. MMMM YYYY",
    LLL: "D. MMMM YYYY HH:mm",
    LLLL: "dddd, D. MMMM YYYY HH:mm",
  },
  relativeTime: {
    future: "in %s",
    past: "vor %s",
    // @ts-ignore
    s: relativeTimeFormatter,
    // @ts-ignore
    m: relativeTimeFormatter,
    // @ts-ignore
    mm: relativeTimeFormatter,
    // @ts-ignore
    h: relativeTimeFormatter,
    // @ts-ignore
    hh: relativeTimeFormatter,
    // @ts-ignore
    d: relativeTimeFormatter,
    // @ts-ignore
    dd: relativeTimeFormatter,
    // @ts-ignore
    M: relativeTimeFormatter,
    // @ts-ignore
    MM: relativeTimeFormatter,
    // @ts-ignore
    y: relativeTimeFormatter,
    // @ts-ignore
    yy: relativeTimeFormatter,
  },
};

export const loadDeAtLocale = (extendeddayjs: typeof dayjs): void => {
  extendeddayjs.locale("de-at", locale);
};
