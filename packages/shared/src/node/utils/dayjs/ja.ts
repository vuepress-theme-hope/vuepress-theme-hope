// Japanese [ja]
import type dayjs from "dayjs";

import type { Locale } from "./locale.js";

const locale: Locale = {
  name: "ja-jp",
  weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
  weekdaysShort: "日曜_月曜_火曜_水曜_木曜_金曜_土曜".split("_"),
  weekdaysMin: "日_月_火_水_木_金_土".split("_"),
  months:
    "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_",
    ),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  ordinal: (n) => `${n}日`,
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY/MM/DD",
    LL: "YYYY年M月D日",
    LLL: "YYYY年M月D日Ah時mm分",
    LLLL: "YYYY年M月D日ddddAh時mm分",
    l: "YYYY/M/D",
    ll: "YYYY年M月D日",
    lll: "YYYY年M月D日 HH:mm",
    llll: "YYYY年M月D日dddd HH:mm",
  },
  relativeTime: {
    future: "%s以内",
    past: "%s前",
    s: "数秒",
    m: "1 分",
    mm: "%d 分",
    h: "1 時間",
    hh: "%d 時間",
    d: "1 日",
    dd: "%d 日",
    M: "1 ヶ月",
    MM: "%d ヶ月",
    y: "1 年",
    yy: "%d 年",
  },
  meridiem: (hour, minute) => {
    const hm = hour * 100 + minute;

    return hm < 600
      ? "朝"
      : hm < 1200
      ? "午前"
      : hm < 1800
      ? "午後"
      : hm < 2000
      ? "晚"
      : "夜";
  },
};

export const loadJaLocale = (extendedDayjs: typeof dayjs): void => {
  extendedDayjs.locale("ja", locale);
};
