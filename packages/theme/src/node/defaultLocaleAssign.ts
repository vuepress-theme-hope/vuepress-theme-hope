import type { HopeThemeLocaleOptions, HopeThemeLocaleData } from "../shared";

const defaultLocaleOptions: HopeThemeLocaleOptions = {
  // navbar
  navbar: [],
  logo: null,
  repo: null,
  selectLanguageText: "Languages",
  selectLanguageAriaLabel: "Select language",

  // sidebar
  sidebar: "auto",
  sidebarDepth: 2,

  // page meta
  editLink: true,
  editLinkText: "Edit this page",
  lastUpdated: true,
  lastUpdatedText: "Last Updated",
  contributors: true,
  contributorsText: "Contributors",

  // 404 page messages
  notFound: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  backToHome: "Take me home",

  // `<OutboundLink>` sr-only
  openInNewWindow: "open in new window",
};

const defaultLocaleData: HopeThemeLocaleData = {
  // navbar
  selectLanguageName: "English",
};

/**
 * Assign default options to `themeConfig`
 */
export const assignDefaultLocaleOptions = (
  localeOptions: HopeThemeLocaleOptions
): void => {
  if (!localeOptions.locales) {
    localeOptions.locales = {};
  }

  if (!localeOptions.locales["/"]) {
    localeOptions.locales["/"] = {};
  }

  Object.assign(localeOptions, {
    ...defaultLocaleOptions,
    ...localeOptions,
  });

  Object.assign(localeOptions.locales["/"], {
    ...defaultLocaleData,
    ...localeOptions.locales["/"],
  });
};
