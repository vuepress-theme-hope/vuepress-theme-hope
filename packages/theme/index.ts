import { CAC } from "cac";
import { getAlias } from "./node/alias";
import { config } from "./node/config";
import { eject } from "./node/eject";
import { getPluginConfig } from "./node/plugins";

import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type { ResolvedHopeThemeConfig } from "./types";

interface ThemeOptionAPI extends PluginOptionAPI {
  extend?: string;
}

// Theme API.
const themeAPI = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): ThemeOptionAPI => ({
  alias: getAlias(themeConfig, ctx),

  plugins: getPluginConfig(themeConfig),

  additionalPages:
    themeConfig.blog === false
      ? []
      : [
          {
            path: "/article/",
            frontmatter: { layout: "Blog" },
          },
          {
            path: "/star/",
            frontmatter: { layout: "Blog" },
          },
          {
            path: "/encrypt/",
            frontmatter: { layout: "Blog" },
          },
          {
            path: "/slide/",
            frontmatter: { layout: "Blog" },
          },
          {
            path: "/timeline/",
            frontmatter: { layout: "Blog" },
          },
        ],

  extendCli: (cli: CAC): void => {
    cli
      .command(
        "eject-hope [targetDir]",
        "copy vuepress-theme-hope into .vuepress/theme for customization."
      )
      .option("--debug", "eject in debug mode")
      .action((dir = ".") => {
        void eject(dir);
      });
  },
});

themeAPI.config = config;

export = themeAPI;
