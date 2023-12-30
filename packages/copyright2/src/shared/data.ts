export interface CopyrightInfoData {
  author?: string;
  license?: string;
}

export interface CopyrightPluginPageData {
  copyright?: CopyrightInfoData | string;
}
