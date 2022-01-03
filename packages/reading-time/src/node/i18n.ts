import type { HopeLangPath } from "@mr-hope/vuepress-shared";
import type { ReadingTimeI18nConfig } from "../types";

/** Muti language config for reading time plugin */
export const i18n: Record<HopeLangPath, ReadingTimeI18nConfig> = {
  "/zh/": {
    word: "约 $word 字",
    minute: "小于 1 分钟",
    time: "大约 $time 分钟",
  },
  "/en/": {
    word: "About $word words",
    minute: "Less than 1 minute",
    time: "About $time min",
  },
  "/de/": {
    word: "Um die $word Wörter",
    minute: "Weniger als eine Minute",
    time: "Ungefähr $time min",
  },
  "/vi/": {
    word: "Khoảng $word từ",
    minute: "Ít hơn 1 phút",
    time: "Khoảng $time phút",
  },
  "/uk/": {
    word: "Про $word слова",
    minute: "Менше 1 хвилини",
    time: "Приблизно $time хв",
  },
  "/ru/": {
    word: "Про $word слова",
    minute: "Меньше 1 минуты",
    time: "Приблизительно $time минут",
  },
  "/br/": {
    word: "Por volta de $word palavras",
    minute: "Menos de 1 minuto",
    time: "Por volta de $time min",
  },
};
