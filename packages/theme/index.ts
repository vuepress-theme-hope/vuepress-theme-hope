import { CAC } from "cac";
import { getAlias } from "./node/alias";
import { config } from "./node/config";
import { eject } from "./node/eject";
import { getPluginConfig } from "./node/plugins";

import type { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import type {
  HopeNavBarConfig,
  HopeSideBarConfig,
  HopeThemeConfig,
  ResolvedHopeThemeConfig,
} from "./types";

const blogAddtionalPages = [
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
];

// Theme API.
const themeAPI = (
  themeConfig: ResolvedHopeThemeConfig,
  ctx: Context
): PluginOptionAPI => ({
  alias: getAlias(themeConfig, ctx),

  plugins: getPluginConfig(themeConfig),

  additionalPages: themeConfig.blog === false ? [] : blogAddtionalPages,

  extendCli: (cli: CAC): void => {
    cli
      .command(
        "eject-hope [targetDir]",
        "copy vuepress-theme-hope into .vuepress/theme for customization."
      )
      .option("--debug", "eject in debug mode")
      .action((dir: string) => {
        void eject(dir || ".");
      });
  },
});

themeAPI.config = config;

// helper functions
themeAPI.themeConfig = (themeConfig: HopeThemeConfig): HopeThemeConfig =>
  themeConfig;
themeAPI.navbarConfig = (navbarConfig: HopeNavBarConfig): HopeNavBarConfig =>
  navbarConfig;
themeAPI.sidebarConfig = (
  sidebarConfig: HopeSideBarConfig
): HopeSideBarConfig => sidebarConfig;

export = themeAPI;
