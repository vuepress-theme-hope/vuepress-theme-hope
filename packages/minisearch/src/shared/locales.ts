interface MiniSearchButtonLocaleOptions {
  text?: string;
  ariaLabel?: string;
}

interface MiniSearchModalLocaleOptions {
  detail?: string;
  reset?: string;
  back?: string;
  noResults?: string;
  footer?: FooterTranslations;
}

interface FooterTranslations {
  select?: string;
  selectAriaLabel?: string;
  navigate?: string;
  upAriaLabel?: string;
  downAriaLabel?: string;
  close?: string;
  closeAriaLabel?: string;
}

export interface MiniSearchLocaleOptions {
  button?: MiniSearchButtonLocaleOptions;
  modal?: MiniSearchModalLocaleOptions;
}
