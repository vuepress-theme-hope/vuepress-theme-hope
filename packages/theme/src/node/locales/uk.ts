import type { ThemeLocaleData } from "../../shared/index.js";

export const ukLocale: ThemeLocaleData = {
  lang: "uk-UA",

  navbarLocales: {
    langName: "Українська",
    selectLangAriaLabel: "Оберіть мову",
  },

  metaLocales: {
    author: "Автор",
    date: "Дата написання",
    origin: "Оригінал",
    views: "Перегляди сторінки",
    category: "Категорія",
    tag: "Теги",
    readingTime: "Час читання",
    words: "Слова",
    toc: "On This Page",
    prev: "Prev",
    next: "Next",
    lastUpdated: "Останнє оновлення",
    contributors: "Автори",
    editLink: "Редагувати цю сторінку",
    print: "Друк",
  },

  blogLocales: {
    article: "Статті",
    articleList: "Список статей",
    category: "Категорія",
    tag: "Теги",
    timeline: "Хронологія",
    timelineTitle: "Вчора ще раз!",
    all: "Bce",
    intro: "Особистий вступ",
    star: "Зірка",
  },

  paginationLocales: {
    prev: "Попередня",
    next: "Далі",
    navigate: "Перейти до",
    action: "Перейти",
    errorText: "Будь ласка, введіть число від 1 до $page !",
  },

  outlookLocales: {
    themeColor: "Колір теми",
    darkmode: "Тематичний режим",
    fullscreen: "Full Screen",
  },

  encryptLocales: {
    iconLabel: "Page Encrypted",
    placeholder: "Enter password",
    remember: "Remember password",
    errorHint: "Будь ласка, введіть правильний пароль!",
  },

  routeLocales: {
    skipToContent: "Перейти до основного вмісту",
    notFoundTitle: "Сторінка не знайдена",
    notFoundMsg: [
      "Тут немає нічого.",
      "Як ми сюди потрапили?",
      'Це "4-0-4".',
      "Схоже, у нас є непрацюючі посилання.",
    ],
    back: "Повернутися назад",
    home: "Повернутися на головну",
    openInNewWindow: "Open in new window",
  },
};
