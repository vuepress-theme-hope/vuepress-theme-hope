import type dayjs from "dayjs";

import type { Locale } from "./locale.js";

const locale: Partial<Locale> = {
  name: "id",
  weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
  weekdaysShort: "Ming._Sen._Sel._Rab._Kam._Jum._Sab.".split("_"),
  weekdaysMin: "Mg._Sn._Sl._Rb._Km._Jm._Sb.".split("_"),
  months:
    "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
      "_",
    ),
  monthsShort:
    "Jan._Feb._Mar._Apr._Mei_Jun._Jul._Agu._Sep._Okt._Nov._Des.".split("_"),
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  relativeTime: {
    future: "sebelum %s",
    past: "setelah %s",
    s: "beberapa detik yang lalu",
    m: "semenit",
    mm: "%d menit",
    h: "sejam",
    hh: "%d jam",
    d: "sehari",
    dd: "%d hari",
    M: "sebulan",
    MM: "%d bulan",
    y: "setahun",
    yy: "%d tahun",
  },
  ordinal: (n) => `${n}.`,
};

export const loadIdLocale = (extendedDayjs: typeof dayjs): void => {
  extendedDayjs.locale("id", locale);
};
