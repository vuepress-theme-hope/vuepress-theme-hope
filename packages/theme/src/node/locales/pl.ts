import type { HopeThemeLocaleData } from "../../shared";

export const plLocale: HopeThemeLocaleData = {
  lang: "pl-PL",

  navbarLocales: {
    langName: "Polski",
    selectLangText: "Język",
    selectLangAriaLabel: "Wybierz język",
  },

  metaLocales: {
    author: "Autor",
    date: "Data pisania",
    origin: "Oryginał💡",
    views: "Wyświetlenia strony",
    category: "Kategoria",
    tag: "Tagi",
    readingTime: "Czas czytania",
    words: "Słowa",
    toc: "Na tej stronie",
    prev: "Poprzednia",
    next: "Następna",
    lastUpdated: "Ostatnia akutalizacja",
    contributors: "Współtwórcy",
    editLink: "Edytuj tą stronę",
  },

  blogLocales: {
    article: "Artykuły",
    articleList: "Lista artykułów",
    category: "Kategoria",
    tag: "Tagi",
    timeline: "Oś czasu",
    timelineTitle: "Wczoraj jeszcze raz!",
    all: "Wszystkie",
    intro: "Osobiste wprowadzenie",
    star: "Gwiazda",
    slides: "Slajdy",
    encrypt: "Zaszyfrowane",
  },

  paginationLocales: {
    prev: "Poprzedni",
    next: "Następmy",
    navigate: "Skocz do",
    action: "Idź",
    errorText: "Wpisz numer między 1 a $page !",
  },

  outlookLocales: {
    themeColor: "Kolor tematu",
    darkmode: "Tryb motywu",
    fullscreen: "Pełny ekran",
  },

  encryptLocales: {
    title: "Podaj hasło",
    errorHint: "Podaj poprawne hasło!",
  },

  routeLocales: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "404msg": [
      "Nic tu nie ma.",
      "Jak tu się dostaliśmy?",
      "A imię jego czterdzieści i cztery",
      "Wygląda na to, że mamy zepsute odnośniki",
    ],
    back: "Wróć",
    home: "Strona główna",
    openInNewWindow: "Open in new window",
  },
};
