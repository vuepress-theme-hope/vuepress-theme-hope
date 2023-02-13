import { type App } from "@vuepress/core";

export const prepareHighLighterScss = async (app: App): Promise<void> => {
  const { plugins: Plugins } = app.pluginApi;

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
$highlighter: "${highlighter}";
`
  );
};
