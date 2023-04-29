import { type RequiredLocaleConfig } from "vuepress-shared";

export interface MinisearchLocaleData {
  search: string;

  detail: string;
  reset: string;
  back: string;
  noResults: string;
  select: string;
  navigate: string;
  close: string;
  upKey: string;
  downKey: string;
  selectKey: string;
  closeKey: string;
}

export type MinisearchLocaleConfig = RequiredLocaleConfig<MinisearchLocaleData>;
