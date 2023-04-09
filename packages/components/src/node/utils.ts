import { getDirname, path } from "@vuepress/utils";
import { Logger, ensureEndingSlash } from "vuepress-shared/node";

import { type AvailableComponent } from "./options/index.js";

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
  "VideoPlayer",
  "XiGua",
  "YouTube",
];

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);

export const PLUGIN_NAME = "vuepress-plugin-components";

export const logger = new Logger(PLUGIN_NAME);
