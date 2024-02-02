import { getRealPath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { RevealJsPlugin, RevealJsTheme } from "../typings/index.js";
import { CLIENT_FOLDER } from "../utils.js";

const { url } = import.meta;

const AVAILABLE_THEMES = [
  "auto",
  "beige",
  "black",
  "blood",
  "league",
  "moon",
  "night",
  "serif",
  "simple",
  "sky",
  "solarized",
  "white",
];

export const prepareRevealJsPluginFile = async (
  app: App,
  revealPlugins: RevealJsPlugin[] = [],
): Promise<void> => {
  await app.writeTemp(
    "md-enhance/revealjs-plugins.js",
    `\
export const useRevealJs = () => [
  import(/* webpackChunkName: "reveal" */ "${getRealPath(
    "reveal.js/dist/reveal.esm.js",
    url,
  )}"),
  import(/* webpackChunkName: "reveal" */ "${getRealPath(
    "reveal.js/plugin/markdown/markdown.esm.js",
    url,
  )}"),
  ${revealPlugins
    .map(
      (plugin) =>
        `import(/* webpackChunkName: "reveal" */ "${getRealPath(
          `reveal.js/plugin/${plugin}/${plugin}.esm.js`,
          url,
        )}")`,
    )
    .join(",\n")}];
`,
  );
};

export const prepareRevealJsStyleFile = async (
  app: App,
  revealThemes: RevealJsTheme[] = ["auto"],
): Promise<void> => {
  const styles = revealThemes.filter((item) => AVAILABLE_THEMES.includes(item));

  await app.writeTemp(
    "md-enhance/revealjs-theme.scss",
    `\
${styles
  .map((name) => `@use "${CLIENT_FOLDER}styles/revealjs/theme/${name}.scss";`)
  .join("\n")}
`,
  );
};
