import { default as Dayjs } from "dayjs";
import { default as localizedFormat } from "dayjs/plugin/localizedFormat";
import { default as objectSupport } from "dayjs/plugin/objectSupport";
import { default as timezone } from "dayjs/plugin/timezone";
import { default as utc } from "dayjs/plugin/utc";

Dayjs.extend(localizedFormat);
Dayjs.extend(objectSupport);
Dayjs.extend(utc);
Dayjs.extend(timezone);

export interface Locale {
  name: string;
  weekdays?: string[];
  months?: string[];
  weekStart?: number;
  weekdaysShort?: string[];
  monthsShort?: string[];
  weekdaysMin?: string[];
  yearStart?: number;
  ordinal?: (number: number, period?: string) => number | string;
  meridiem?: (hour: number, minute: number) => string;
  formats: Partial<{
    LT: string;
    LTS: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
    l: string;
    ll: string;
    lll: string;
    llll: string;
  }>;
  relativeTime: Partial<{
    future: string;
    past: string;
    s: string;
    m: string;
    mm: string;
    h: string;
    hh: string;
    d: string;
    dd: string;
    M: string;
    MM: string;
    y: string;
    yy: string;
  }>;
}

const zhLocale: Locale = {
  name: "zh-cn",
  weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
  weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
  weekdaysMin: "日_一_二_三_四_五_六".split("_"),
  months:
    "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
      "_"
    ),
  monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
  ordinal: (number, period) => {
    switch (period) {
      case "W":
        return `${number}周`;
      default:
        return `${number}日`;
    }
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "YYYY/MM/DD",
    LL: "YYYY年M月D日",
    LLL: "YYYY年M月D日Ah点mm分",
    LLLL: "YYYY年M月D日ddddAh点mm分",
    l: "YYYY/M/D",
    ll: "YYYY年M月D日",
    lll: "YYYY年M月D日 HH:mm",
    llll: "YYYY年M月D日dddd HH:mm",
  },
  relativeTime: {
    future: "%s内",
    past: "%s前",
    s: "几秒",
    m: "1 分钟",
    mm: "%d 分钟",
    h: "1 小时",
    hh: "%d 小时",
    d: "1 天",
    dd: "%d 天",
    M: "1 个月",
    MM: "%d 个月",
    y: "1 年",
    yy: "%d 年",
  },
  meridiem: (hour, minute) => {
    const hm = hour * 100 + minute;

    return hm < 600
      ? "凌晨"
      : hm < 900
      ? "早上"
      : hm < 1100
      ? "上午"
      : hm < 1300
      ? "中午"
      : hm < 1800
      ? "下午"
      : "晚上";
  },
};

const enLocale: Partial<Locale> = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
    "_"
  ),
  months:
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
};

Dayjs.locale("zh", zhLocale);
Dayjs.locale("en", enLocale);

export const dayjs = Dayjs;
