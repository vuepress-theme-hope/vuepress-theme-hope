// English [en]
import type dayjs from "dayjs";

import type { Locale } from "./locale.js";

const locale: Partial<Locale> = {
  name: "nl",
  weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split(
    "_",
  ),
  months:
    "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split(
      "_",
    ),
};

export const loadNlLocale = (extendedDayjs: typeof dayjs): void => {
  extendedDayjs.locale("nl", locale);
};
