import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { Logger } from "vuepress-shared/node";

import { type AvailableComponent } from "./options/index.js";

export const logger = new Logger("vuepress-plugin-components");

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
