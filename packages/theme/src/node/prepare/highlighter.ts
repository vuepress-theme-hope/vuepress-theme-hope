import { type App } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { isPlainObject } from "vuepress-shared/node";

import {
  type PluginsOptions,
  type PrismjsOptions,
  type PrismjsTheme,
} from "../../shared/index.js";
import { logger } from "../utils.js";

const PRISMJS_THEMES: readonly PrismjsTheme[] = [
  "ateliersulphurpool-light",
  "coldark-cold",
  "coy",
  "duotone-light",
  "ghcolors",
  "gruvbox-light",
  "material-light",
  "one-light",
  "vs",
  "atom-dark",
  "cb",
  "coldark-dark",
  "dark",
  "dracula",
  "duotone-dark",
  "duotone-earth",
  "duotone-forest",
  "duotone-sea",
  "duotone-space",
  "gruvbox-dark",
  "holi",
  "hopscotch",
  "lucario",
  "material-dark",
  "material-oceanic",
  "night-owl",
  "nord",
  "one-dark",
  "pojoaque",
  "shades-of-purple",
  "solarized-dark-atom",
  "tomorrow",
  "vsc-dark-plus",
  "xonokai",
  "z-touch",
] as const;

const DEFAULT_PRISMJS_LIGHT_THEME: PrismjsTheme = "one-light";
const DEFAULT_PRISMJS_DARK_THEME: PrismjsTheme = "one-dark";

/**
 * @private
 */
export const prepareHighLighterScss = async (
  app: App,
  { prismjs }: PluginsOptions
): Promise<void> => {
  const { plugins: Plugins } = app.pluginApi;
  const prismjsOptions: PrismjsOptions = isPlainObject(prismjs) ? prismjs : {};

  const highlighter = Plugins.some(
    (plugin) => plugin.name === "@vuepress/plugin-prismjs"
  )
    ? "prismjs"
    : Plugins.some((plugin) => plugin.name === "@vuepress/plugin-shiki")
    ? "shiki"
    : "none";

  let content = `\
$highlighter: "${highlighter}";
`;

  if (highlighter === "prismjs") {
    const lightTheme = prismjsOptions.light
      ? PRISMJS_THEMES.includes(prismjsOptions.light)
        ? prismjsOptions.light
        : (logger.warn(
            `Unsupported code theme ${
              prismjsOptions.light
            } found in ${colors.magenta("plugins.prismjs.light")}`
          ),
          DEFAULT_PRISMJS_LIGHT_THEME)
      : DEFAULT_PRISMJS_LIGHT_THEME;
    const darkTheme = prismjsOptions.dark
      ? PRISMJS_THEMES.includes(prismjsOptions.dark)
        ? prismjsOptions.dark
        : (logger.warn(
            `Unsupported code theme ${
              prismjsOptions.dark
            } found in ${colors.magenta("plugins.prismjs.dark")}`
          ),
          DEFAULT_PRISMJS_DARK_THEME)
      : DEFAULT_PRISMJS_DARK_THEME;

    content += `\
$light-theme: "${lightTheme}";
$dark-theme: "${darkTheme}";
`;
  }

  await app.writeTemp("theme-hope/highlighter.scss", content);
};
