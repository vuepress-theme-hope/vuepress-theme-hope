import type { ReadingTimeLocaleConfig } from "../shared";

/** Muti language config for reading time plugin */
export const i18n: ReadingTimeLocaleConfig = {
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
};
