import type { ThemeLocaleData } from "../../shared/index.js";

export const ruLocale: ThemeLocaleData = {
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
    contributors: "Контрибьюторы",
    editLink: "Редактировать эту страницу",
    print: "Печать",
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
    empty: "$text пусто",
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
    skipToContent: "Перейти к основному содержанию",
    notFoundTitle: "Страница не найдена",
    notFoundMsg: [
      "Здесь ничего нет.",
      "Как мы сюда попали?",
      "Это четыре-о-четыре.",
      "Похоже, у нас есть несколько неработающих ссылок.",
    ],
    back: "Вернуться назад",
    home: "Вернуться на главную",
  },
};
