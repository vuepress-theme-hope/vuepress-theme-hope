import { default as dayjs } from "dayjs";
import { default as localizedFormat } from "dayjs/plugin/localizedFormat";
import { default as objectSupport } from "dayjs/plugin/objectSupport";
import { default as timezone } from "dayjs/plugin/timezone";
import { default as utc } from "dayjs/plugin/utc";
import { loadDeLocale } from "./de";
import { loadDeAtLocale } from "./de-at";

import { loadEnLocale } from "./en";
import { loadEsLocale } from "./es";
import { loadFrLocale } from "./fr";
import { loadPlLocale } from "./pl";
import { loadPtBrLocale } from "./pt-br";
import { loadRuLocale } from "./ru";
import { loadSkLocale } from "./sk";
import { loadUkLocale } from "./uk";
import { loadViLocale } from "./vi";
import { loadZhLocale } from "./zh";
import { loadZhTWLocale } from "./zh-tw";

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
    ].includes(langcode)
  )
    return langcode;

  if (langcode === "en-us" || langcode === "en-uk") return "en";
  if (langcode === "es-es") return "es";
  if (langcode === "fr-fr") return "fr";
  if (langcode === "pl-pl]") return "pl";
  if (langcode === "ru-ru]") return "ru";
  if (langcode === "uk-ua") return "uk";
  if (langcode === "sk-sk") return "sk";
  if (langcode === "vi-vn") return "vi";
  if (langcode === "zh-cn") return "zh";

  console.warn(`${lang} locale missing in config`);

  return "en";
};

export { dayjs };
