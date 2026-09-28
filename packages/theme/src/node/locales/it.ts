import type { ThemeLocaleData } from "../../shared/index.js";

export const itLocale: ThemeLocaleData = {
  lang: "it-IT",

  navbarLocales: {
    langName: "Italiano",
    selectLangAriaLabel: "Seleziona la lingua",
  },

  metaLocales: {
    author: "Autore",
    date: "Data di scrittura",
    origin: "Originale",
    views: "Visualizzazioni",
    category: "Categoria",
    tag: "Tag",
    readingTime: "Tempo di lettura",
    words: "Parole",
    toc: "In questa pagina",
    prev: "Precedente",
    next: "Successivo",
    contributors: "Collaboratori",
    editLink: "Modifica questa pagina",
    print: "Stampa",
  },

  blogLocales: {
    article: "Articoli",
    articleList: "Elenco degli articoli",
    category: "Categoria",
    tag: "Tag",
    timeline: "Cronologia",
    timelineTitle: "Ieri, ancora una volta!",
    all: "Tutti",
    intro: "Introduzione personale",
    star: "In evidenza",
    empty: "Nessun $text",
  },

  paginationLocales: {
    prev: "Precedente",
    next: "Successivo",
    navigate: "Vai a",
    action: "Vai",
    errorText: "Inserisci un numero tra 1 e $page!",
  },

  outlookLocales: {
    themeColor: "Colore del tema",
    darkmode: "Modalità del tema",
    fullscreen: "Schermo intero",
  },

  encryptLocales: {
    iconLabel: "Pagina criptata",
    placeholder: "Inserisci la password",
    remember: "Ricorda la password",
    errorHint: "Inserisci la password corretta!",
  },

  routerLocales: {
    skipToContent: "Vai al contenuto principale",
    notFoundTitle: "Pagina non trovata",
    notFoundMsg: [
      "Non c'è nulla qui.",
      "Come siamo arrivati qui?",
      "Questo è un Quattro-Zero-Quattro.",
      "Sembra che ci siano alcuni link non funzionanti.",
    ],
    back: "Torna indietro",
    home: "Portami alla home",
  },
};
