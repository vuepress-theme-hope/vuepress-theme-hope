// English [en]
import type { default as dayjs } from "dayjs";
import type { Locale } from "./locale";

const locale: Partial<Locale> = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
    "_"
  ),
  months:
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
};

export const loadEnLocale = (extendeddayjs: typeof dayjs): void => {
  extendeddayjs.locale("en", locale);
};
