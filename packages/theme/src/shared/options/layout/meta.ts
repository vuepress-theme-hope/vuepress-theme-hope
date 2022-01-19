export interface HopeThemeMetaLocateData {
  /**
   * Page meta - last updated config
   *
   * The text to replace the default "Last Updated"
   */
  lastUpdated: string;

  /**
   * Page meta - contributors config
   *
   * The text to replace the default "Contributors"
   */
  contributors: string;

  /**
   * Page meta - contributors config
   *
   * The text to replace the default "Edit this page"
   */
  editLink: string;
}

export interface HopeThemeMetaLocaleOptions {
  /**
   * Page meta - last updated config
   *
   * Whether to show "Last Updated" or not
   */
  lastUpdated?: boolean;

  /**
   * Page meta - contributors config
   *
   * Whether to show "Contributors" or not
   */
  contributors?: boolean;

  /**
   * Page meta - edit link config
   *
   * Whether to show "Edit this page" or not
   */
  editLink?: boolean;

  /**
   * Page meta - edit link config
   *
   * Pattern of edit link
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string;

  /**
   * Page meta - edit link config
   *
   * Use `repo` config by default
   *
   * Set this config if your docs is placed in a different repo
   */
  docsRepo?: string;

  /**
   * Page meta - edit link config
   *
   * Set this config if the branch of your docs is not 'master'
   */
  docsBranch?: string;

  /**
   * Page meta - edit link config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   */
  docsDir?: string;
}
