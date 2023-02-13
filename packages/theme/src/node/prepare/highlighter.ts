import { type App } from "@vuepress/core";
import { isPlainObject } from "@vuepress/shared";

import {
  type PluginsOptions,
  type PrismjsOptions,
  type PrismjsTheme,
} from "../../shared/index.js";

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

  await app.writeTemp(
    "theme-hope/highlighter.scss",
    `\
$highlighter: "${highlighter}";\
${
  highlighter === "prismjs"
    ? `
$light-theme: "${
        prismjsOptions.light && PRISMJS_THEMES.includes(prismjsOptions.light)
          ? prismjsOptions.light
          : "one-light"
      }";
$dark-theme: "${
        prismjsOptions.dark && PRISMJS_THEMES.includes(prismjsOptions.dark)
          ? prismjsOptions.dark
          : "one-dark"
      }";
`
    : ""
}
`
  );
};
