import { Logger, ensureEndingSlash, isModuleAvailable } from "@vuepress/helper";
import { getDirname, path } from "vuepress/utils";

import type {
  AvailableComponent,
  DeprecatedComponent,
} from "./options/index.js";

const __dirname = getDirname(import.meta.url);

export const AVAILABLE_COMPONENTS: (
  | AvailableComponent
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  | DeprecatedComponent
)[] = [
  "ArtPlayer",
  "Badge",
  "BiliBili",
  "CodePen",
  "PDF",
  "Share",
  "SiteInfo",
  "StackBlitz",
  "VPBanner",
  "VPCard",
  "VidStack",

  // deprecated
  "AudioPlayer",
  "VideoPlayer",
  "YouTube",
];

export const COMPONENT_PKG: Record<string, string[]> = {
  ArtPlayer: ["artplayer"],
  AudioPlayer: ["vidstack"],
  VidStack: ["vidstack"],
  VideoPlayer: ["vidstack"],
};

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client"),
);

export const PLUGIN_NAME = "vuepress-plugin-components";

export const logger = new Logger(PLUGIN_NAME);

export const isInstalled = (pkg: string): boolean =>
  isModuleAvailable(pkg, import.meta);
