import { type ComputedRef, computed } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { useReadingTimeData } from "./data.js";
import { readingTimeLocales } from "../define.js";
import { getReadingTimeLocale } from "../utils/index.js";

export interface ReadingTimeLocale {
  /**
   * Reading time text
   *
   * 阅读时间文字
   */
  time: string;

  /**
   * Words count text
   *
   * 字数统计文字
   */
  words: string;
}

const DEFAULT_LOCALE = { words: "", time: "" };

export const useReadingTimeLocaleConfig = () => {
  return readingTimeLocales
    ? useLocaleConfig(readingTimeLocales)
    : computed(() => null);
};

export const useReadingTimeLocale = (): ComputedRef<ReadingTimeLocale> => {
  if (typeof readingTimeLocales === "undefined")
    return computed(() => DEFAULT_LOCALE);

  const readingTime = useReadingTimeData();
  const readingTimeLocale = useReadingTimeLocaleConfig();

  return computed(() =>
    readingTime.value && readingTimeLocale.value
      ? getReadingTimeLocale(readingTime.value, readingTimeLocale.value)
      : DEFAULT_LOCALE
  );
};
