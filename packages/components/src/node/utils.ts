import { createRequire } from "node:module";

import { getDirname, path } from "@vuepress/utils";
import { Logger, ensureEndingSlash } from "vuepress-shared/node";

import type { AvailableComponent } from "./options/index.js";

const __dirname = getDirname(import.meta.url);
const require = createRequire(import.meta.url);

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
  "VidStack",
  "VideoPlayer",
  "XiGua",
  "YouTube",
];

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client"),
);

export const PLUGIN_NAME = "vuepress-plugin-components";

export const logger = new Logger(PLUGIN_NAME);

export const isInstalled = (pkg: string): boolean => {
  try {
    require.resolve(pkg);

    return true;
  } catch (error) {
    return false;
  }
};
