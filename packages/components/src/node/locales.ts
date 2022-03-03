import type {
  ArticleInfoLocaleConfig,
  BackToTopLocaleConfig,
  TOCLocaleConfig,
  PaginationLocaleConfig,
} from "../shared";

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
export const tocLocales: TOCLocaleConfig = {
  "/en/": {
    header: "On This Page",
  },

  "/zh/": {
    header: "此页内容",
  },

  "/zh-tw/": {
    header: "此頁內容",
  },

  "/de/": {
    header: "On This Page",
  },

  "/vi/": {
    header: "On This Page",
  },

  "/uk/": {
    header: "On This Page",
  },

  "/ru/": {
    header: "On This Page",
  },

  "/br/": {
    header: "On This Page",
  },
};

export const paginationLocales: PaginationLocaleConfig = {
  "/en/": {
    prev: "Prev",
    next: "Next",
    navigate: "Jump to",
    button: "Go",
    errorText: "Please enter a number between 1 and $page !",
  },

  "/zh/": {
    prev: "上一页",
    next: "下一页",
    navigate: "跳转到",
    button: "前往",
    errorText: "请输入 1 到 $page 之前的页码！",
  },

  "/zh-tw/": {
    prev: "上一頁",
    next: "下一頁",
    navigate: "跳轉到",
    button: "前往",
    errorText: "請輸入 1 到 $page 之前的頁碼！",
  },

  "/de/": {
    prev: "Vorheriges",
    next: "Nächstes",
    navigate: "Springe zu",
    button: "Los",
    errorText: "Bitte gib eine Nummer zwischen 1 und $page ein!",
  },

  "/vi/": {
    prev: "Bài kế",
    next: "Bài trước",
    navigate: "Đi đến",
    button: "Đi",
    errorText: "Xin hãy nhập 1 số từ 1 đến $page !",
  },

  "/uk/": {
    prev: "Попередня",
    next: "Далі",
    navigate: "Перейти до",
    button: "Перейти",
    errorText: "Будь ласка, введіть число від 1 до $page !",
  },

  "/ru/": {
    prev: "Предыдущая",
    next: "Далее",
    navigate: "Перейти к",
    button: "Перейти",
    errorText: "Пожалуйста, введите число от 1 до $page !",
  },

  "/br/": {
    prev: "Anterior",
    next: "Próximo",
    navigate: "Pular para",
    button: "Ir",
    errorText: "Por favor, digite um número entre 1 e $page !",
  },
};

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
