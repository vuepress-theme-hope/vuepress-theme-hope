import type { HopeThemeLocaleData } from "../../shared";

export const ruLocale: HopeThemeLocaleData = {
  lang: "ru-RU",

  navbarLocales: {
    langName: "Русский",
    selectLangText: "Язык",
    selectLangAriaLabel: "Выберите язык",
  },

  metaLocales: {
    prev: "Prev",
    next: "Next",
    lastUpdated: "Последнее обновление",
    contributors: "Авторы",
    editLink: "Редактировать эту страницу",
  },

  blogLocales: {
    article: "Статьи",
    articleList: "Список статей",
    category: "Категория",
    tag: "Тэги",
    timeline: "Таймлайн",
    timelineTitle: "Вчера еще раз!",
    all: "Всё",
    intro: "Личное вступление",
    star: "Звезда",
    slides: "Слайды",
    encrypt: "Зашифровано",
  },

  outlookLocales: {
    themeColor: "Цвет темы",
    darkmode: "Режим темы",
    fullscreen: "Full Screen",
  },

  encryptLocales: {
    title: "Пожалуйста, введите пароль",
    errorHint: "Пожалуйста, введите правильный пароль!",
  },

  routeLocales: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "404msg": [
      "Здесь ничего нет.",
      "Как мы сюда попали?",
      'Это "4-0-4".',
      "Похоже, у нас есть несколько неработающих ссылок.",
    ],
    back: "Вернуться назад",
    home: "Вернуться на главную",
  },
};
