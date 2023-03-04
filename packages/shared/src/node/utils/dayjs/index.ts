import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import objectSupport from "dayjs/plugin/objectSupport.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

import { loadDeAtLocale } from "./de-at.js";
import { loadDeLocale } from "./de.js";
import { loadEnLocale } from "./en.js";
import { loadEsLocale } from "./es.js";
import { loadFrLocale } from "./fr.js";
import { loadIdLocale } from "./id.js";
import { loadJaLocale } from "./ja.js";
import { loadKoLocale } from "./ko.js";
import { loadNlLocale } from "./nl.js";
import { loadPlLocale } from "./pl.js";
import { loadPtBrLocale } from "./pt-br.js";
import { loadRuLocale } from "./ru.js";
import { loadSkLocale } from "./sk.js";
import { loadTrLocale } from "./tr.js";
import { loadUkLocale } from "./uk.js";
import { loadViLocale } from "./vi.js";
import { loadZhTWLocale } from "./zh-tw.js";
import { loadZhLocale } from "./zh.js";

dayjs.extend(localizedFormat);
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);

loadDeLocale(dayjs);
loadDeAtLocale(dayjs);
loadEnLocale(dayjs);
loadEsLocale(dayjs);
loadFrLocale(dayjs);
loadIdLocale(dayjs);
loadNlLocale(dayjs);
loadPlLocale(dayjs);
loadPtBrLocale(dayjs);
loadRuLocale(dayjs);
loadSkLocale(dayjs);
loadUkLocale(dayjs);
loadViLocale(dayjs);
loadZhLocale(dayjs);
loadZhTWLocale(dayjs);
loadJaLocale(dayjs);
loadTrLocale(dayjs);
loadKoLocale(dayjs);

export const getLocale = (lang = "en"): string => {
  const langCode = lang.toLowerCase();

  if (
    [
      "de",
      "de-at",
      "en",
      "es",
      "fr",
      "id",
      "nl",
      "pl",
      "pt-br",
      "ru",
      "sk",
      "uk",
      "vi",
      "zh",
      "zh-tw",
      "ja",
      "tr",
      "ko",
    ].includes(langCode)
  )
    return langCode;

  if (langCode === "en-us" || langCode === "en-uk") return "en";
  if (langCode === "nl-nl") return "nl";
  if (langCode === "de-de") return "de";
  if (langCode === "es-es") return "es";
  if (langCode === "fr-fr") return "fr";
  if (langCode === "id-id") return "id";
  if (langCode === "pl-pl") return "pl";
  if (langCode === "ru-ru") return "ru";
  if (langCode === "uk-ua") return "uk";
  if (langCode === "sk-sk") return "sk";
  if (langCode === "vi-vn") return "vi";
  if (langCode === "zh-cn") return "zh";
  if (langCode === "ja-jp") return "ja";
  if (langCode === "tr-tr") return "tr";
  if (langCode === "ko-kr") return "ko";

  console.warn(`${lang} locale missing in config`);

  return "en";
};

export { dayjs };
