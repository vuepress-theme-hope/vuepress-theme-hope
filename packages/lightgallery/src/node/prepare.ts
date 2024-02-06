import { getRealPath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { LightGalleryPlugin } from "./options.js";

const { url } = import.meta;

export const prepareLightGalleryPlugins = async (
  app: App,
  pluginNames: LightGalleryPlugin[] = ["pager", "share", "zoom"],
): Promise<void> => {
  const plugins = pluginNames.map(
    (pluginName) =>
      `import(/* webpackChunkName: "lightgallery" */ "${getRealPath(
        `lightgallery/plugins/${pluginName}/lg-${pluginName}.es5.js`,
        url,
      )}")`,
  );
  const pluginsStyles = pluginNames.map(
    (pluginName) =>
      `import "${getRealPath(`lightgallery/css/lg-${pluginName}.css`, url)}";`,
  );

  await app.writeTemp(
    "lightgallery/plugins.js",
    `\
${pluginsStyles.join("\n")}

export const useLightGalleryPlugins = () =>
  Promise.all([
${plugins.map((item) => `    ${item}`).join(",\n")}
  ]);
`,
  );
};
