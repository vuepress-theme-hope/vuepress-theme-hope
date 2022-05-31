import type { HopeThemeLocaleData } from "../../shared";

export const enLocale: HopeThemeLocaleData = {
  lang: "en-US",

  navbarLocales: {
    langName: "English",
    selectLangText: "Language",
    selectLangAriaLabel: "Select language",
  },

  metaLocales: {
    author: "Author",
    date: "Writing Date",
    origin: "Original",
    views: "Page views",
    category: "Category",
    tag: "Tag",
    readingTime: "Reading Time",
    words: "Words",
    toc: "On This Page",
    prev: "Prev",
    next: "Next",
    lastUpdated: "Last update",
    contributors: "Contributors",
    editLink: "Edit this page",
  },

  blogLocales: {
    article: "Articles",
    articleList: "Article List",
    category: "Category",
    tag: "Tag",
    timeline: "Timeline",
    timelineTitle: "Yesterday Once More!",
    all: "All",
    intro: "Personal Intro",
    star: "Star",
    slides: "Slides",
    encrypt: "Encrypted",
  },

  paginationLocales: {
    prev: "Prev",
    next: "Next",
    navigate: "Jump to",
    action: "Go",
    errorText: "Please enter a number between 1 and $page !",
  },

  outlookLocales: {
    themeColor: "Theme Color",
    darkmode: "Theme Mode",
    fullscreen: "Full Screen",
  },

  encryptLocales: {
    title: "Page Encrypted",
    placeholder: "Enter password",
    remember: "Remember password",
    errorHint: "Please enter the correct password!",
  },

  routeLocales: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "404msg": [
      "There’s nothing here.",
      "How did we get here?",
      "That’s a Four-Oh-Four.",
      "Looks like we've got some broken links.",
    ],
    back: "Go back",
    home: "Take me home",
    openInNewWindow: "Open in new window",
  },
};
