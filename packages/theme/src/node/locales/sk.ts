import type { HopeThemeLocaleData } from "../../shared/index.js";

export const skLocale: HopeThemeLocaleData = {
  lang: "sk-SK",

  navbarLocales: {
    langName: "Slovensky",
    selectLangAriaLabel: "Vyber si jazyk",
  },

  metaLocales: {
    author: "Autor",
    date: "Dátum článku",
    origin: "Originál",
    views: "Zobrazení",
    category: "Kategória",
    tag: "Tagy",
    readingTime: "Dĺžka čítania",
    words: "Slová",
    toc: "Na tejto stránke",
    prev: "Predchádzajúci",
    next: "Ďalší",
    lastUpdated: "Posledná aktualizácia",
    contributors: "Prispievatelia",
    editLink: "Uprav túto stránku",
  },

  blogLocales: {
    article: "Články",
    articleList: "List článkov",
    category: "Kategória",
    tag: "Tagy",
    timeline: "Časová os",
    timelineTitle: "Čas plynie!",
    all: "Všetko",
    intro: "Osobné intro",
    star: "Hviezda",
    slides: "Prezentácie",
    encrypt: "Zašifrované",
  },

  paginationLocales: {
    prev: "Predchádzajúci",
    next: "Ďalší",
    navigate: "Skoč na",
    action: "Choď",
    errorText: "Prosím, zadajte číso medzi 1 a $page !",
  },

  outlookLocales: {
    themeColor: "Farba témy",
    darkmode: "Mód témy",
    fullscreen: "Celá obrazovka",
  },

  encryptLocales: {
    iconLabel: "Page Encrypted",
    placeholder: "Enter password",
    remember: "Remember password",
    errorHint: "Prosím, zadaj správne heslo!",
  },

  routeLocales: {
    notFoundMsg: [
      "Nič tu nieje.",
      "Ako si sa sem dostal?",
      "Si na štyri-nula-štvorke.",
      "Vyzerá to že máme nejaké neprelinkované stránky.",
    ],
    back: "Choď späť",
    home: "Poď na domovskú stránku",
    openInNewWindow: "Otvoriť v novom okne",
  },
};
