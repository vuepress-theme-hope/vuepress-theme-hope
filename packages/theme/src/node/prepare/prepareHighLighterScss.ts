import type { App } from "vuepress/core";

/**
 * @private
 */
export const prepareHighLighterScss = async (app: App): Promise<void> => {
  const { plugins } = app.pluginApi;

  const highlighter = plugins.some(
    (plugin) => plugin.name === "@vuepress/plugin-shiki",
  )
    ? "shiki"
    : plugins.some((plugin) => plugin.name === "@vuepress/plugin-prismjs")
      ? "prismjs"
      : "none";

  await app.writeTemp(
    "theme-hope/highlighter.scss",
    `\
$highlighter: "${highlighter}";
`,
  );
};
