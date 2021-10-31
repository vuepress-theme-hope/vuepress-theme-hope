/* eslint-disable @typescript-eslint/naming-convention */
export interface ManifestImage {
  src: string;
  sizes: string;
  type?: string;
}

export interface ManifestIcon extends ManifestImage {
  purpose?: "any" | "maskable" | "monochrome";
}

export interface ManifestRelatedApps {
  platform: string;
  url: string;
  id?: string;
}

export interface ManifestShortCuts {
  name: string;
  url: string;
  short_name?: string;
  description?: string;
  icons?: ManifestIcon[];
}

export interface ManifestOption {
  name?: string;

  short_name?: string;
  description?: string;
  background_color?: string;
  dir?: "ltr" | "rtl" | "auto";
  lang?: string;
  display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  icons?: ManifestIcon[];
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "landscape-primary"
    | "landscape-secondary"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary";
  prefer_related_applications?: boolean;
  related_applications?: ManifestRelatedApps[];
  scope?: string;
  start_url?: string;
  theme_color?: string;
  categories?: string[];
  shortcuts?: ManifestShortCuts[];
  iarc_rating_id?: string;
  features?: string[];
  screenshots?: ManifestImage[];
}
