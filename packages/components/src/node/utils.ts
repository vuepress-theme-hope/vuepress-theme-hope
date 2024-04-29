import {
  Logger,
  ensureEndingSlash,
  getInstalledStatus,
} from "@vuepress/helper";
import { getDirname, path } from "vuepress/utils";

import type {
  AvailableComponent,
  DeprecatedComponent,
} from "./options/index.js";

const __dirname = getDirname(import.meta.url);

export const AVAILABLE_COMPONENTS: (
  | AvailableComponent
  | DeprecatedComponent
)[] = [
  "ArtPlayer",
  "Badge",
  "BiliBili",
  "CodePen",
  "FontIcon",
  "PDF",
  "Share",
  "SiteInfo",
  "StackBlitz",
  "VPBanner",
  "VPCard",
  "VidStack",
  "XiGua",

  // deprecated
  "AudioPlayer",
  "Replit",
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

export const isInstalled = (pkg: string, hint = true): boolean => {
  const isInstalled = getInstalledStatus(pkg, import.meta.url);

  if (hint && !isInstalled)
    logger.error(
      `Package ${pkg} is not installed, please install it manually!`,
    );

  return isInstalled;
};
