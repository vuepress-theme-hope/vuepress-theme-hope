import type { ThemeLocaleData } from "../../shared/index.js";

export const huLocale: ThemeLocaleData = {
  lang: "hu-HU",

  navbarLocales: {
    langName: "Magyar",
    selectLangAriaLabel: "Nyelv kiválasztása",
  },

  metaLocales: {
    author: "Szerző",
    date: "Dátum",
    origin: "Eredeti",
    views: "Oldalletöltések",
    category: "Kategória",
    tag: "Címke",
    readingTime: "Olvasási idő",
    words: "Szavak",
    toc: "Tartalom",
    prev: "Előző",
    next: "Következő",
    lastUpdated: "Utoljára frissítve",
    contributors: "Közreműködők",
    editLink: "Oldal szerkesztése",
    print: "Nyomtatás",
  },

  blogLocales: {
    article: "Cikkek",
    articleList: "Cikkek listája",
    category: "Kategória",
    tag: "Címke",
    timeline: "Idővonal",
    timelineTitle: "Régi szép idők!",
    all: "Összes",
    intro: "Személyes bemutatkozás",
    star: "Csillag",
  },

  paginationLocales: {
    prev: "Előző",
    next: "Következő",
    navigate: "Ugrás",
    action: "Mehet",
    errorText: "Kérlek írj be egy számot 1 és $page között!",
  },

  outlookLocales: {
    themeColor: "Téma színe",
    darkmode: "Téma mód",
    fullscreen: "Teljes képernyő",
  },

  encryptLocales: {
    iconLabel: "Oldal titkosítva",
    placeholder: "Add meg a jelszót",
    remember: "Jelszó megjegyzése",
    errorHint: "Kérjük, add meg a helyes jelszót!",
  },

  routeLocales: {
    skipToContent: "Ugrás a fő tartalomhoz",
    notFoundTitle: "Az oldal nem található",
    notFoundMsg: [
      "Itt nincs semmi.",
      "Hogyan kerültünk ide?",
      "Ez egy 404-es hiba.",
      "Úgy tűnik, hogy sérült linkek vannak.",
    ],
    back: "Vissza",
    home: "Kezdőlap",
    openInNewWindow: "Megnyitás új ablakban",
  },
};
