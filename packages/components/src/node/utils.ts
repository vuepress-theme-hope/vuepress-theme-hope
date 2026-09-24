import { Logger, ensureEndingSlash } from "@vuepress/helper";
import { getDirname, path } from "vuepress/utils";

import type { AvailableComponent } from "./options/index.js";

const __dirname = getDirname(import.meta.url);

export const AVAILABLE_COMPONENTS: AvailableComponent[] = [
  "Badge",
  "CodePen",
  "Share",
  "SiteInfo",
  "StackBlitz",
  "VPBanner",
  "VPCard",
];

export const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

export const PLUGIN_NAME = "vuepress-plugin-components";

export const logger = new Logger(PLUGIN_NAME);
