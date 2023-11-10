import { getDirname, path } from "@vuepress/utils";
import {
  Logger,
  checkInstalled,
  ensureEndingSlash,
} from "vuepress-shared/node";

import type { AvailableComponent } from "./options/index.js";

const __dirname = getDirname(import.meta.url);

export const AVAILABLE_COMPONENTS: AvailableComponent[] = [
  "ArtPlayer",
  "AudioPlayer",
  "Badge",
  "BiliBili",
  "CodePen",
  "FontIcon",
  "PDF",
  "Replit",
  "Share",
  "SiteInfo",
  "StackBlitz",
  "VPBanner",
  "VPCard",
  "VidStack",
  "VideoPlayer",
  "XiGua",
  "YouTube",
];

export const COMPONENT_PKG: Record<string, string[]> = {
  ArtPlayer: ["artplayer"],
  AudioPlayer: ["plyr"],
  VidStack: ["vidstack"],
  VideoPlayer: ["plyr"],
};

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client"),
);

export const PLUGIN_NAME = "vuepress-plugin-components";

export const logger = new Logger(PLUGIN_NAME);

export const isInstalled = (pkg: string, hint = true): boolean => {
  const isInstalled = checkInstalled(pkg, import.meta.url);

  if (hint && !isInstalled)
    logger.error(
      `Package ${pkg} is not installed, please install it manually!`,
    );

  return isInstalled;
};
