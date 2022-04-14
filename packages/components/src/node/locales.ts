import type { ArticleInfoLocaleConfig, BackToTopLocaleConfig } from "../shared";

/**
 * Default locales config for Article Info
 */
export const articleInfoLocales: ArticleInfoLocaleConfig = {
  "/en/": {
    author: "Author🖊",
    date: "Writing Date📅",
    origin: "Original💡",
    views: "Page views🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Reading Time⌛",
    words: "Words🔠",
  },

  "/zh/": {
    author: "作者🖊",
    date: "写作日期📅",
    origin: "原创💡",
    views: "访问量🔢",
    category: "分类🌈",
    tag: "标签🏷",
    readingTime: "阅读时间⌛",
    words: "字数🔠",
  },

  "/zh-tw/": {
    author: "作者🖊",
    date: "寫作日期📅",
    origin: "原創💡",
    views: "訪問量🔢",
    category: "分類🌈",
    tag: "標籤🏷",
    readingTime: "閱讀時間⌛",
    words: "字數🔠",
  },

  "/de/": {
    author: "Autor🖊",
    date: "Datum📅",
    origin: "Original💡",
    views: "Besucher🔢",
    category: "Kategorie🌈",
    tag: "Tags🏷",
    readingTime: "Lesezeit⌛",
    words: "Wörter🔠",
  },

  "/vi/": {
    author: "Người viết🖊",
    date: "Ngày viết📅",
    origin: "Nguồn💡",
    views: "Views của trang🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Thời gian đọc⌛",
    words: "Words🔠",
  },

  "/uk/": {
    author: "Автор🖊",
    date: "Дата написання📅",
    origin: "Оригінал💡",
    views: "Перегляди сторінки🔢",
    category: "Категорія🌈",
    tag: "Теги🏷",
    readingTime: "Час читання⌛",
    words: "Слова🔠",
  },

  "/ru/": {
    author: "Автор🖊",
    date: "Дата написания📅",
    origin: "Оригинал💡",
    views: "Просмотры страницы🔢",
    category: "Категория🌈",
    tag: "Тэги🏷",
    readingTime: "Время чтения⌛",
    words: "Слова🔠",
  },

  "/br/": {
    author: "Autor🖊",
    date: "Escrito em📅",
    origin: "Original💡",
    views: "Visualizações🔢",
    category: "Categoria🌈",
    tag: "Tags🏷",
    readingTime: "Tempo de Leitura⌛",
    words: "Palavras🔠",
  },
};

export const backToTopLocales: BackToTopLocaleConfig = {
  "/en/": {
    backToTop: "Back to top",
  },

  "/zh/": {
    backToTop: "返回顶部",
  },

  "/zh-tw/": {
    backToTop: "返回頂部",
  },

  "/de/": {
    backToTop: "Zurück nach oben.",
  },

  "/vi/": {
    backToTop: "Trở lại đầu trang",
  },

  "/uk/": {
    backToTop: "Повернутися до початку",
  },

  "/ru/": {
    backToTop: "Вернуться к началу",
  },

  "/br/": {
    backToTop: "Volta ao topo",
  },
};
