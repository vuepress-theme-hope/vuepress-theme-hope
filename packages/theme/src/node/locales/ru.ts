import type { HopeThemeLocaleData } from "../../shared/index.js";

export const ruLocale: HopeThemeLocaleData = {
  lang: "ru-RU",

  navbarLocales: {
    langName: "Русский",
    selectLangAriaLabel: "Выберите язык",
  },

  metaLocales: {
    author: "Автор",
    date: "Дата написания",
    origin: "Оригинал",
    views: "Просмотры страницы",
    category: "Категория",
    tag: "Тэги",
    readingTime: "Время чтения",
    words: "Слова",
    toc: "На этой странице",
    prev: "Предыдущая",
    next: "Следующая",
    lastUpdated: "Последнее обновление",
    contributors: "Контрибьюторы",
    editLink: "Редактировать эту страницу",
  },

  blogLocales: {
    article: "Статьи",
    articleList: "Список статей",
    category: "Категория",
    tag: "Тэги",
    timeline: "Таймлайн",
    timelineTitle: "Еще раз о недавнем!",
    all: "Все",
    intro: "Личное вступление",
    star: "Звезда",
    slides: "Слайды",
    encrypt: "Зашифровано",
  },

  paginationLocales: {
    prev: "Предыдущая",
    next: "Следующая",
    navigate: "Перейти к",
    action: "Перейти",
    errorText: "Пожалуйста, введите число от 1 до $page !",
  },

  outlookLocales: {
    themeColor: "Цвет темы",
    darkmode: "Режим темы",
    fullscreen: "Полный экран",
  },

  encryptLocales: {
    iconLabel: "Страница зашифрована",
    placeholder: "Введите пароль",
    remember: "Запомнить пароль",
    errorHint: "Пожалуйста, введите правильный пароль!",
  },

  routeLocales: {
    notFoundMsg: [
      "Здесь ничего нет.",
      "Как мы сюда попали?",
      "Это четыре-о-четыре.",
      "Похоже, у нас есть несколько неработающих ссылок.",
    ],
    back: "Вернуться назад",
    home: "Вернуться на главную",
    openInNewWindow: "Открыть в новом окне",
  },
};
