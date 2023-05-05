import { createRequire } from "node:module";

import { type App } from "@vuepress/core";
import { path } from "@vuepress/utils";

import { type LightGalleryPlugin } from "./options.js";

const require = createRequire(import.meta.url);

export const prepareLightGalleryPlugins = async (
  app: App,
  pluginNames: LightGalleryPlugin[] = ["pager", "share", "zoom"]
): Promise<void> => {
  const plugins = pluginNames.map(
    (pluginName) =>
      `import(/* webpackChunkName: "lightgallery" */ "${path.resolve(
        require.resolve(
          `lightgallery/plugins/${pluginName}/lg-${pluginName}.es5.js`
        )
      )}")`
  );
  const pluginsStyles = pluginNames.map(
    (pluginName) =>
      `import "${path.resolve(
        require.resolve(`lightgallery/css/lg-${pluginName}.css`)
      )}";`
  );

  await app.writeTemp(
    "lightgallery/plugins.js",
    `\
${pluginsStyles.join("\n")}

export const useLightGalleryPlugins = () =>
  Promise.all([
${plugins.map((item) => `    ${item}`).join(",\n")}
  ]);
`
  );
};
