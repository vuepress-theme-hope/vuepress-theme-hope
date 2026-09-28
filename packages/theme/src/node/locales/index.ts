// oxlint-disable import/max-dependencies
import type { DefaultLocaleInfo } from "@vuepress/helper";

import type { ThemeLocaleData } from "../../shared/index.js";
import { deLocale } from "./de.js";
import { deATLocale } from "./deAT.js";
import { enLocale } from "./en.js";
import { esLocale } from "./es.js";
import { fiLocale } from "./fi.js";
import { frLocale } from "./fr.js";
import { huLocale } from "./hu.js";
import { idLocale } from "./id.js";
import { itLocale } from "./it.js";
import { jaLocale } from "./ja.js";
import { koLocale } from "./ko.js";
import { nlLocale } from "./nl.js";
import { plLocale } from "./pl.js";
import { ptLocale } from "./pt.js";
import { ptBRLocale } from "./ptBR.js";
import { ruLocale } from "./ru.js";
import { skLocale } from "./sk.js";
import { trLocale } from "./tr.js";
import { ukLocale } from "./uk.js";
import { viLocale } from "./vi.js";
import { zhLocale } from "./zh.js";
import { zhTWLocale } from "./zhTW.js";

export const themeLocaleInfo: DefaultLocaleInfo<ThemeLocaleData> = [
  [["en", "en-US"], enLocale],
  [["zh", "zh-CN", "zh-Hans"], zhLocale],
  [["zh-TW", "zh-Hant"], zhTWLocale],
  [["de", "de-DE"], deLocale],
  [["de-AT"], deATLocale],
  [["vi", "vi-VN"], viLocale],
  [["uk", "uk-UA"], ukLocale],
  [["ru", "ru-RU"], ruLocale],
  [["pt", "pt-PT"], ptLocale],
  [["pt-BR"], ptBRLocale],
  [["pl", "pl-PL"], plLocale],
  [["sk", "sk-SK"], skLocale],
  [["fr", "fr-FR"], frLocale],
  [["es", "es-ES"], esLocale],
  [["it", "it-IT"], itLocale],
  [["ja", "ja-JP"], jaLocale],
  [["tr", "tr-TR"], trLocale],
  [["ko", "ko-KR"], koLocale],
  [["fi", "fi-FI"], fiLocale],
  [["hu", "hu-HU"], huLocale],
  [["id", "id-ID"], idLocale],
  [["nl", "nl-NL"], nlLocale],
];
