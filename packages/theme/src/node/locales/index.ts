import type { DefaultLocaleInfo } from "@vuepress/helper";

import { brLocale } from "./br.js";
import { deLocale } from "./de.js";
import { deATLocale } from "./deAT.js";
import { enLocale } from "./en.js";
import { esLocale } from "./es.js";
import { fiLocale } from "./fi.js";
import { frLocale } from "./fr.js";
import { huLocale } from "./hu.js";
import { idLocale } from "./id.js";
import { jaLocale } from "./ja.js";
import { koLocale } from "./ko.js";
import { nlLocale } from "./nl.js";
import { plLocale } from "./pl.js";
import { ruLocale } from "./ru.js";
import { skLocale } from "./sk.js";
import { trLocale } from "./tr.js";
import { ukLocale } from "./uk.js";
import { viLocale } from "./vi.js";
import { zhLocale } from "./zh.js";
import { zhTWLocale } from "./zhTW.js";
import type { ThemeLocaleData } from "../../shared/index.js";

export const themeLocaleInfo: DefaultLocaleInfo<ThemeLocaleData> = [
  [["en", "en-US"], enLocale],
  [["zh", "zh-CN", "zh-Hans"], zhLocale],
  [["zh-tw", "zh-Hant"], zhTWLocale],
  [["de"], deLocale],
  [["de-AT"], deATLocale],
  [["vi"], viLocale],
  [["uk"], ukLocale],
  [["ru"], ruLocale],
  [["br"], brLocale],
  [["pl"], plLocale],
  [["sk"], skLocale],
  [["fr"], frLocale],
  [["es"], esLocale],
  [["ja"], jaLocale],
  [["tr"], trLocale],
  [["ko"], koLocale],
  [["fi"], fiLocale],
  [["hu"], huLocale],
  [["id"], idLocale],
  [["nl"], nlLocale],
];
