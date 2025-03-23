import type { ThemeLocaleData } from "../../shared/index.js";

export const fiLocale: ThemeLocaleData = {
  lang: "fi-FI",

  navbarLocales: {
    langName: "Finnish",
    selectLangAriaLabel: "Valitse kieli",
  },

  metaLocales: {
    author: "Kirjoittaja",
    date: "Julkaistu",
    origin: "Alkuperäinen",
    views: "Näyttökerrat",
    category: "Kategoriat",
    tag: "Avainsana",
    readingTime: "Lukuaika",
    words: "Sanat",
    toc: "Sisällys",
    prev: "Edellinen",
    next: "Seuraava",
    contributors: "Osallistujat",
    editLink: "Muokkaa tätä sivua",
    print: "Tulosta",
  },

  blogLocales: {
    article: "Aritkkelit",
    articleList: "Artikkelilista",
    category: "Kategoria",
    tag: "Avainsana",
    timeline: "Aikajana",
    timelineTitle: "Koe eilinen uudelleen!",
    all: "Kaikki",
    intro: "Intro",
    star: "Tähti",
    empty: "$text on tyhjä",
  },

  paginationLocales: {
    prev: "Edellinen",
    next: "Seuraava",
    navigate: "Hyppää",
    action: "Mene",
    errorText: "Anna sivunumero välillä 1 ja $page!",
  },

  outlookLocales: {
    themeColor: "Teemaväri",
    darkmode: "Teeman tila",
    fullscreen: "Koko näyttö",
  },

  encryptLocales: {
    iconLabel: "Suojattu sivu",
    placeholder: "Anna salasana",
    remember: "Muista salasana",
    errorHint: "Anna oikea salasana!",
  },

  routeLocales: {
    skipToContent: "Hyppää sisältöön",
    notFoundTitle: "Sivua ei löytynyt",
    notFoundMsg: [
      "Täällä ei olekkaan mitään!",
      "Miten päädyimme tänne?",
      "Se on nel-nol-nelj!",
      "Vaikuttaa siltä, että meillä on rikkinäinen linkki.",
    ],
    back: "Palaa takaisin",
    home: "Etusivulle",
  },
};
