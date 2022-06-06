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
