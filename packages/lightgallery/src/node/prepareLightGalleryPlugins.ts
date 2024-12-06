import { getModulePath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { LightGalleryPlugin } from "./options.js";

export const prepareLightGalleryPlugins = async (
  app: App,
  pluginNames: LightGalleryPlugin[] = ["pager", "share", "zoom"],
): Promise<void> => {
  const plugins = pluginNames.map(
    (pluginName) =>
      `import(/* webpackChunkName: "lightgallery" */ "${getModulePath(
        `lightgallery/plugins/${pluginName}/lg-${pluginName}.es5.js`,
        import.meta,
      )}")`,
  );
  const pluginsStyles = pluginNames.map(
    (pluginName) =>
      `import "${getModulePath(`lightgallery/css/lg-${pluginName}.css`, import.meta)}";`,
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
