import type { ThemeLocaleData } from "../../shared/index.js";

export const nlLocale: ThemeLocaleData = {
  lang: "nl-NL",

  navbarLocales: {
    langName: "Nederlands",
    selectLangAriaLabel: "Selecteer taal",
  },

  metaLocales: {
    author: "Auteur",
    date: "Geschreven Datum",
    origin: "Bron",
    views: "Paginaweergaven",
    category: "Categorie",
    tag: "Tag",
    readingTime: "Leestijd",
    words: "Woorden",
    toc: "Op Deze Pagina",
    prev: "Vorige",
    next: "Volgende",
    contributors: "Bijdragers",
    editLink: "Bewerk deze pagina",
    print: "Printen",
  },

  blogLocales: {
    article: "Artikelen",
    articleList: "Artikelenlijst",
    category: "Categorie",
    tag: "Tag",
    timeline: "Tijdlijn",
    timelineTitle: "Gisteren nog een keer!",
    all: "Alle",
    intro: "Persoonlijke Intro",
    star: "Gemarkeerd",
    empty: "$text is leeg",
  },

  paginationLocales: {
    prev: "Vorige",
    next: "Volgende",
    navigate: "Ga Naar",
    action: "Ga",
    errorText: "Gelieve een nummer in te geven tussen 1 en $page !",
  },

  outlookLocales: {
    themeColor: "Themakleur",
    darkmode: "Thema modus",
    fullscreen: "Volledig scherm",
  },

  encryptLocales: {
    iconLabel: "Pagina Geëncrypteerd",
    placeholder: "Voeg paswoord in",
    remember: "Herinner paswoord",
    errorHint: "Gelieve het juiste paswoord in te vullen!",
  },

  routerLocales: {
    skipToContent: "Ga naar de hoofdinhoud",
    notFoundTitle: "Pagina niet gevonden",
    notFoundMsg: [
      "Er is niets hier.",
      "Hoe zijn we hier beland?",
      "Dat is een 404.",
      "Zo te zien hebben we enkele kapotte links.",
    ],
    back: "Ga terug",
    home: "Ga terug naar home",
  },
};
