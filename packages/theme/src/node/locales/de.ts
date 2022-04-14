import type { HopeThemeLocaleData } from "../../shared";

export const deLocale: HopeThemeLocaleData = {
  lang: "de-AT",

  navbarLocales: {
    langName: "Deutsch",
    selectLangText: "Sprache",
    selectLangAriaLabel: "Sprache wählen",
  },

  metaLocales: {
    prev: "Prev",
    next: "Next",
    lastUpdated: "Zuletzt geändert",
    contributors: "Mitwirkende",
    editLink: "Diese Seite barbeiten",
  },

  blogLocales: {
    article: "Artikel",
    articleList: "Artikel Liste",
    category: "Kategorie",
    tag: "Tags",
    timeline: "Timeline",
    timelineTitle: "Yesterday Once More!",
    all: "Alle",
    intro: "Persönliche Einleitung",
    star: "Star",
    slides: "Slides",
    encrypt: "Verschlüsselt",
  },

  outlookLocales: {
    themeColor: "Design-Farbe",
    darkmode: "Design-Modus",
    fullscreen: "Full Screen",
  },

  encryptLocales: {
    title: "Passwort eingeben",
    errorHint: "Bitte das korrekte Passwort eingeben!",
  },

  routeLocales: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "404msg": [
      "Hier gibt es nichts.",
      "Wie sind wir hier hergekommen?",
      "Das ist wohl eine Vier-Null-Vier.",
      "Sieht aus als hättest du einen kaputten Link gefunden.",
    ],
    back: "Zurück",
    home: "Zur Startseite",
  },
};
