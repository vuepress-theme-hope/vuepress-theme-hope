// Turkish [tr]
import type dayjs from "dayjs";

import type { Locale } from "./locale.js";

const locale: Partial<Locale> = {
  name: "tr",
  weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
  weekdaysShort: "Paz_Pzt_Sal_Çar_Per_Cum_Cmt".split("_"),
  months:
    "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split(
      "_",
    ),
  monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
  ordinal: (n) => `${n}.`,
  formats: {
    LTS: "HH:mm:ss",
    LT: "HH:mm",
    L: "DD.MM.YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "D MMMM YYYY HH:mm dddd",
  },
};

export const loadTrLocale = (extendedDayjs: typeof dayjs): void => {
  extendedDayjs.locale("tr", locale);
};
