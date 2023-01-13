import type { Option as ArtPlayerInitOptions } from "artplayer/types/option.js";

export type ArtPlayerOptions = Partial<
  Omit<
    ArtPlayerInitOptions,
    | "container"
    | "url"
    | "customType"
    | "plugins"
    | "contextmenu"
    | "controls"
    | "layers"
    | "settings"
  >
>;
