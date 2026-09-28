import type { ThemeLocaleData } from "../../shared/index.js";

export const frLocale: ThemeLocaleData = {
  lang: "fr-FR",

  navbarLocales: {
    langName: "Français",
    selectLangAriaLabel: "Sélection de la langue",
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
    contributors: "Contributeurs",
    editLink: "Modifier cette page",
    print: "Imprimer",
  },

  blogLocales: {
    article: "Articles",
    articleList: "Liste d'articles",
    category: "Catégorie",
    tag: "Tag",
    timeline: "Chronologie",
    timelineTitle: "Toujours un peu plus!",
    all: "Tout",
    intro: "Introduction personnelle",
    star: "Étoile",
    empty: "Pas de $text",
  },

  paginationLocales: {
    prev: "Précédent",
    next: "Suivant",
    navigate: "Aller à",
    action: "Aller",
    errorText: "Merci d'entrer un entier entre 1 et $page !",
  },

  outlookLocales: {
    themeColor: "Couleur du thème",
    darkmode: "Mode du thème",
    fullscreen: "Plein écran",
  },

  encryptLocales: {
    iconLabel: "Page chiffrée",
    placeholder: "Entrez le mot de passe",
    remember: "Se souvenir du mot de passe",
    errorHint: "Merci d'entrer un mot de passe valide !",
  },

  routerLocales: {
    skipToContent: "Aller au contenu principal",
    notFoundTitle: "Page non trouvée",
    notFoundMsg: [
      "Il n'y a rien ici.",
      "Comment êtes vous arrivés ici ?",
      "C'est un joli 404.",
      "Il semblerait que nous ayons quelques liens de cassés.",
    ],
    back: "Revenir",
    home: "Retour à la maison",
  },
};
