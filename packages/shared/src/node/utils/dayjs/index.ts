import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import objectSupport from "dayjs/plugin/objectSupport.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { loadDeLocale } from "./de.js";
import { loadDeAtLocale } from "./de-at.js";
import { loadEnLocale } from "./en.js";
import { loadEsLocale } from "./es.js";
import { loadFrLocale } from "./fr.js";
import { loadPlLocale } from "./pl.js";
import { loadPtBrLocale } from "./pt-br.js";
import { loadRuLocale } from "./ru.js";
import { loadSkLocale } from "./sk.js";
import { loadUkLocale } from "./uk.js";
import { loadViLocale } from "./vi.js";
import { loadZhLocale } from "./zh.js";
import { loadZhTWLocale } from "./zh-tw.js";
import { loadJaLocale } from "./ja.js";
import { loadTrLocale } from "./tr.js";

dayjs.extend(localizedFormat);
dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);

loadDeLocale(dayjs);
loadDeAtLocale(dayjs);
loadEnLocale(dayjs);
loadEsLocale(dayjs);
loadFrLocale(dayjs);
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

export const getLocale = (lang = "en"): string => {
  const langcode = lang.toLowerCase();

  if (
    [
      "de",
      "de-at",
      "en",
      "es",
      "fr",
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
    ].includes(langcode)
  )
    return langcode;

  if (langcode === "en-us" || langcode === "en-uk") return "en";
  if (langcode === "es-es") return "es";
  if (langcode === "fr-fr") return "fr";
  if (langcode === "pl-pl") return "pl";
  if (langcode === "ru-ru") return "ru";
  if (langcode === "uk-ua") return "uk";
  if (langcode === "sk-sk") return "sk";
  if (langcode === "vi-vn") return "vi";
  if (langcode === "zh-cn") return "zh";
  if (langcode === "ja-jp") return "ja";
  if (langcode === "tr-tr") return "tr";

  console.warn(`${lang} locale missing in config`);

  return "en";
};

export { dayjs };
