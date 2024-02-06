/* eslint-disable @typescript-eslint/naming-convention */

/**
 * @see https://www.w3.org/TR/mediaqueries-5/#display-mode
 */
export type DisplayMode =
  | "fullscreen"
  | "standalone"
  | "minimal-ui"
  | "browser";

/**
 * @see https://github.com/w3c/manifest/wiki/Categories
 */
export type ManifestCategory =
  | "books"
  | "business"
  | "education"
  | "entertainment"
  | "finance"
  | "fitness"
  | "food"
  | "games"
  | "government"
  | "health"
  | "kids"
  | "lifestyle"
  | "magazines"
  | "medical"
  | "music"
  | "navigation"
  | "news"
  | "personalization"
  | "photo"
  | "politics"
  | "productivity"
  | "security"
  | "shopping"
  | "social"
  | "sports"
  | "travel"
  | "utilities"
  | "weather";

/**
 * @see https://www.w3.org/TR/screen-orientation/#dom-orientationlocktype
 */
export type OrientationLockType =
  | "any"
  | "natural"
  | "landscape"
  | "portrait"
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary";

/**
 * @see https://www.w3.org/TR/appmanifest/#manifest-image-resources
 */
export interface ManifestImageResource {
  src: string;
  sizes: string;
  type?: string;
}

export interface ManifestIcon extends ManifestImageResource {
  purpose?: "any" | "maskable" | "monochrome";
}

/**
 * @see https://www.w3.org/TR/appmanifest/#external-application-resource
 */
export interface ManifestExternalApplicationResource {
  /**
   * @see https://github.com/w3c/manifest/wiki/Platforms
   */
  platform:
    | "chrome_web_store"
    | "play"
    | "chromeos_play"
    | "itunes"
    | "webapp"
    | "windows"
    | "f-droid"
    | "amazon";

  url: string;

  id?: string;

  min_version?: string;

  fingerprints?: { type: string; value: string }[];
}

/**
 * @see https://www.w3.org/TR/appmanifest/#shortcut-items
 */
export interface ManifestShortCutItem {
  name: string;
  url: string;
  short_name?: string;
  description?: string;
  icons?: ManifestIcon[];
}

/**
 * @see https://www.w3.org/TR/appmanifest/
 */
export interface ManifestOption extends Record<string, unknown> {
  /**
   * @see https://www.w3.org/TR/appmanifest/#name-member
   *
   * The name of the web application as it is usually displayed to the user
   */
  name?: string;

  /**
   * @see https://www.w3.org/TR/appmanifest/#short_name-member
   *
   * A short version of the name of the web application
   */
  short_name?: string;

  /**
   * @see https://www.w3.org/TR/appmanifest/#dfn-background_color
   *
   * The expected background color of the web application
   */
  background_color?: string;

  /**
   * @see https://www.w3.org/TR/appmanifest/#dir-member
   *
   * The base direction for the localizable members of the manifest.
   */
  dir?: "ltr" | "rtl" | "auto";

  /**
   * @see https://www.w3.org/TR/appmanifest/#lang-member
   *
   * specifies the primary language for the values of the manifest's localizable members
   */
  lang?: string;

  /**
   * @see https://www.w3.org/TR/appmanifest/#dfn-display
   *
   * The developer's preferred display mode for the web application
   */
  display?: DisplayMode;

  icons?: ManifestIcon[];

  /**
   * @see https://www.w3.org/TR/appmanifest/#orientation-member
   *
   * Serves as the default screen orientation for all top-level browsing contexts of the web application
   */
  orientation?: OrientationLockType;

  /**
   * @see https://www.w3.org/TR/appmanifest/#scope-member
   *
   * The navigation scope of this web application's application context.
   */
  scope?: string;

  /**
   * @see https://www.w3.org/TR/appmanifest/#start_url-member
   *
   * Start URL
   */
  start_url?: string;

  /**
   * @see https://www.w3.org/TR/appmanifest/#id-member
   *
   * Identity for the application
   */
  id?: string;

  /**
   * @see https://www.w3.org/TR/appmanifest/#theme_color-member
   *
   * Default theme color for an application context
   */
  theme_color?: string;
  shortcuts?: ManifestShortCutItem[];

  prefer_related_applications?: boolean;
  related_applications?: ManifestExternalApplicationResource[];

  /* https://www.w3.org/TR/manifest-app-info/ */

  description?: string;
  categories?: ManifestCategory[];
  screenshots?: ManifestImageResource[];
  iarc_rating_id?: string;

  features?: string[];
}
