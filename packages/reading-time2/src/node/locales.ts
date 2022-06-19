import type { ReadingTimeLocaleConfig } from "../shared";

/**
 * Default locale config for `vuepress-plugin-reading-time2` plugin
 */
export const readingTimeLocales: ReadingTimeLocaleConfig = {
  "/en/": {
    word: "About $word words",
    less1Minute: "Less than 1 minute",
    time: "About $time min",
  },

  "/zh/": {
    word: "约 $word 字",
    less1Minute: "小于 1 分钟",
    time: "大约 $time 分钟",
  },

  "/zh-tw/": {
    word: "約 $word 字",
    less1Minute: "小於 1 分鐘",
    time: "大约 $time 分鐘",
  },

  "/de-at/": {
    word: "Um die $word Wörter",
    less1Minute: "Weniger als eine Minute",
    time: "Ungefähr $time min",
  },

  "/vi/": {
    word: "Khoảng $word từ",
    less1Minute: "Ít hơn 1 phút",
    time: "Khoảng $time phút",
  },

  "/uk/": {
    word: "Про $word слова",
    less1Minute: "Менше 1 хвилини",
    time: "Приблизно $time хв",
  },

  "/ru/": {
    word: "Около $word слов",
    less1Minute: "Меньше 1 минуты",
    time: "Около $time мин",
  },

  "/br/": {
    word: "Por volta de $word palavras",
    less1Minute: "Menos de 1 minuto",
    time: "Por volta de $time min",
  },

  "/pl/": {
    word: "Około $word słów",
    less1Minute: "Mniej niż 1 minuta",
    time: "Około $time minut",
  },

  "/sk/": {
    word: "Okolo $word slov",
    less1Minute: "Menej ako 1 minúta",
    time: "Okolo $time minút",
  },

  "/fr/": {
    word: "Environ $word mots",
    less1Minute: "Moins de 1 minute",
    time: "Environ $time min",
  },

  "/es/": {
    word: "Alrededor de $word palabras",
    less1Minute: "Menos de 1 minuto",
    time: "Alrededor de $time min",
  },
};
