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
    editLink: "Diese Seite bearbeiten",
    print: "Drucken",
  },

  blogLocales: {
    article: "Artikel",
    articleList: "Artikel Liste",
    category: "Kategorie",
    tag: "Tag",
    timeline: "Zeitleiste",
    timelineTitle: "Gestern noch einmal!",
    all: "Alle",
    intro: "Persönliche Einleitung",
    star: "Markiert",
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
    fullscreen: "Vollbild",
  },

  encryptLocales: {
    iconLabel: "Seite verschlüsselt",
    placeholder: "Passwort eingeben",
    remember: "Passwort merken",
    errorHint: "Bitte das korrekte Passwort eingeben!",
  },

  routerLocales: {
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
