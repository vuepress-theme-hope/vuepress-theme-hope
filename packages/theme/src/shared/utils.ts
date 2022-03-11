/**
 * Base link item, displayed as text
 */
export interface TextItem {
  text: string;
  icon?: string;
  ariaLabel?: string;
}

/**
 * Props for `<AutoLink>`
 */
export interface AutoLink extends TextItem {
  link: string;
  rel?: string;
  target?: string;
  activeMatch?: string;
}
