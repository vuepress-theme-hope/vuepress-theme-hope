import type { ThemeLocaleData } from "../../shared/index.js";

export const deATLocale: ThemeLocaleData = {
  lang: "de-AT",

  navbarLocales: {
    langName: "Deutsch (Österreich)",
    selectLangAriaLabel: "Sprache wählen",
  },

  metaLocales: {
    author: "Autor",
    date: "Datum",
    origin: "Original",
    views: "Besucher",
    category: "Kategorie",
    tag: "Tag",
    readingTime: "Lesezeit",
    words: "Wörter",
    toc: "On This Page",
    prev: "Prev",
    next: "Next",
    contributors: "Mitwirkende",
    editLink: "Diese Seite barbeiten",
    print: "Drucken",
  },

  blogLocales: {
    article: "Artikel",
    articleList: "Artikel Liste",
    category: "Kategorie",
    tag: "Tag",
    timeline: "Timeline",
    timelineTitle: "Yesterday Once More!",
    all: "Alle",
    intro: "Persönliche Einleitung",
    star: "Star",
    empty: "$text ist leer",
  },

  paginationLocales: {
    prev: "Vorheriges",
    next: "Nächstes",
    navigate: "Springe zu",
    action: "Los",
    errorText: "Bitte gib eine Nummer zwischen 1 und $page ein!",
  },

  outlookLocales: {
    themeColor: "Design-Farbe",
    darkmode: "Design-Modus",
    fullscreen: "Full Screen",
  },

  encryptLocales: {
    iconLabel: "Page Encrypted",
    placeholder: "Entre a senha",
    remember: "Remember password",
    errorHint: "Bitte das korrekte Passwort eingeben!",
  },

  routeLocales: {
    skipToContent: "Zum Hauptinhalt springen",
    notFoundTitle: "Seite nicht gefunden",
    notFoundMsg: [
      "Hier gibt es nichts.",
      "Wie sind wir hier hergekommen?",
      "Das ist wohl eine Vier-Null-Vier.",
      "Sieht aus als hättest du einen kaputten Link gefunden.",
    ],
    back: "Zurück",
    home: "Zur Startseite",
  },
};
