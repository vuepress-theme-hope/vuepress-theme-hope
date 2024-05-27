import { isPlainObject } from "@vuepress/helper";
import type { App } from "vuepress/core";
import { colors } from "vuepress/utils";

import type {
  PluginsOptions,
  PrismjsOptions,
  PrismjsTheme,
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

/**
 * @private
 */
export const prepareHighLighterScss = async (
  app: App,
  { prismjs }: PluginsOptions,
): Promise<void> => {
  const { plugins } = app.pluginApi;
  const prismjsOptions: PrismjsOptions = isPlainObject(prismjs) ? prismjs : {};

  const highlighter = plugins.some(
    (plugin) => plugin.name === "@vuepress/plugin-shiki",
  )
    ? "shiki"
    : plugins.some((plugin) => plugin.name === "@vuepress/plugin-prismjs")
      ? "prismjs"
      : "none";

  let content = `\
$highlighter: "${highlighter}";
`;

  if (highlighter === "prismjs") {
    const lightConfig = prismjsOptions.themes?.light ?? prismjsOptions.theme;
    const darkConfig = prismjsOptions.themes?.dark ?? prismjsOptions.theme;

    let lightTheme: PrismjsTheme = "one-light";
    let darkTheme: PrismjsTheme = "one-dark";

    if (lightConfig) {
      if (PRISMJS_THEMES.includes(lightConfig)) lightTheme = lightConfig;
      else
        logger.warn(
          `Unsupported code theme ${lightConfig} found in ${colors.magenta("plugins.prismjs.light")}`,
        );
    }
    if (darkConfig) {
      if (PRISMJS_THEMES.includes(darkConfig)) darkTheme = darkConfig;
      else
        logger.warn(
          `Unsupported code theme ${darkConfig} found in ${colors.magenta("plugins.prismjs.dark")}`,
        );
    }

    content += `\
$light-theme: "${lightTheme}";
$dark-theme: "${darkTheme}";
`;
  }

  await app.writeTemp("theme-hope/highlighter.scss", content);
};
