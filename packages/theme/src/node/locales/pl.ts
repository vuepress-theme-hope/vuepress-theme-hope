import type { ThemeLocaleData } from "../../shared/index.js";

export const plLocale: ThemeLocaleData = {
  lang: "pl-PL",

  navbarLocales: {
    langName: "Polski",
    selectLangAriaLabel: "Wybierz język",
  },

  metaLocales: {
    author: "Autor",
    date: "Utworzono",
    origin: "Oryginał",
    views: "Wyświetlenia strony",
    category: "Kategoria",
    tag: "Tagi",
    readingTime: "Czas czytania",
    words: "Słowa",
    toc: "Na tej stronie",
    prev: "Poprzednia",
    next: "Następna",
    contributors: "Współtwórcy",
    editLink: "Edytuj tę stronę",
    print: "Drukuj",
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
    empty: "$text jest pusty",
  },

  paginationLocales: {
    prev: "Poprzedni",
    next: "Następny",
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
    iconLabel: "Strona zaszyfrowana",
    placeholder: "Wprowadź hasło",
    remember: "Zapamiętaj hasło",
    errorHint: "Podaj poprawne hasło!",
  },

  routerLocales: {
    skipToContent: "Przejdź do głównej treści",
    notFoundTitle: "Nie znaleziono strony",
    notFoundMsg: [
      "Nic tu nie ma.",
      "Jak tu się dostaliśmy?",
      "A imię jego czterdzieści i cztery",
      "Wygląda na to, że mamy zepsute odnośniki",
    ],
    back: "Wróć",
    home: "Strona główna",
  },
};
