import type { HopeThemeLocaleData } from "../../shared/index.js";

export const frLocale: HopeThemeLocaleData = {
  lang: "fr-FR",

  navbarLocales: {
    langName: "Français",
    selectLangAriaLabel: "Selection de la langue",
  },

  metaLocales: {
    author: "Auteur",
    date: "Date d'édition",
    origin: "Original",
    views: "Nombre de vues",
    category: "Catégorie",
    tag: "Tag",
    readingTime: "Temps de lecture",
    words: "Mots",
    toc: "Dans cette page",
    prev: "Précédent",
    next: "Suivant",
    lastUpdated: "Dernière mise à jour",
    contributors: "Contributeurs",
    editLink: "Modifier cette page",
  },

  blogLocales: {
    article: "Articles",
    articleList: "Liste d'articles",
    category: "Catégorie",
    tag: "Tag",
    timeline: "Timeline",
    timelineTitle: "Toujours un peu plus!",
    all: "Tout",
    intro: "Introduction personnelle",
    star: "Étoile",
    slides: "Slides",
    encrypt: "Chiffré",
  },

  paginationLocales: {
    prev: "Précédent",
    next: "Suivant",
    navigate: "Aller à",
    action: "Go",
    errorText: "Merci d'entrer un entier entre 1 et $page !",
  },

  outlookLocales: {
    themeColor: "Couleur du thème",
    darkmode: "Mode du thème",
    fullscreen: "Plein écran",
  },

  encryptLocales: {
    iconLabel: "Page Encrypted",
    placeholder: "Enter password",
    remember: "Remember password",
    errorHint: "Merci d'entrer un mot de passe valide !",
  },

  routeLocales: {
    notFoundMsg: [
      "Il n'y a rien ici.",
      "Comment êtes vous arrivés ici ?",
      "C'est un joli 404.",
      "Il semblerait que nous ayons quelques liens de cassés.",
    ],
    back: "Revenir",
    home: "Retour à la maison",
    openInNewWindow: "Ouvrir une nouvelle fenêtre",
  },
};
