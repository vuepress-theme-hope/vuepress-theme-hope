import type { ThemeLocaleData } from "../../shared/index.js";

export const nlLocale: ThemeLocaleData = {
  lang: "nl-NL",

  navbarLocales: {
    langName: "Dutch",
    selectLangAriaLabel: "Selecteer taal",
  },

  metaLocales: {
    author: "Auteur",
    date: "Geschreven Datum",
    origin: "Bron",
    views: "Pagina views",
    category: "Categorie",
    tag: "Tag",
    readingTime: "Leestijd",
    words: "Woorden",
    toc: "Op Deze Pagina",
    prev: "Vorige",
    next: "Volgende",
    lastUpdated: "Laatst geüpdate",
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
    timelineTitle: "Yesterday Once More!",
    all: "Alle",
    intro: "Persoonlijke Intro",
    star: "Star",
  },

  paginationLocales: {
    prev: "Vorige",
    next: "Volgende",
    navigate: "Ga Naar",
    action: "Go",
    errorText: "Gelieve een nummer in te geven tussen 1 en $page !",
  },

  outlookLocales: {
    themeColor: "Themakleur",
    darkmode: "Thema modus",
    fullscreen: "Full Screen",
  },

  encryptLocales: {
    iconLabel: "Pagina Geëncrypteerd",
    placeholder: "Voeg paswoord in",
    remember: "Herinner paswoord",
    errorHint: "Geliebe het juiste paswoord in te vullen!",
  },

  routeLocales: {
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
    openInNewWindow: "Open in een nieuw venster",
  },
};
