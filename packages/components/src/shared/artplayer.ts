import type { Option as ArtPlayerInitOptions } from "artplayer";

export type ArtPlayerOptions = Partial<
  Omit<
    ArtPlayerInitOptions,
    | "container"
    | "url"
    | "type"
    | "customType"
    | "plugins"
    | "contextmenu"
    | "controls"
    | "layers"
    | "settings"
  >
>;
