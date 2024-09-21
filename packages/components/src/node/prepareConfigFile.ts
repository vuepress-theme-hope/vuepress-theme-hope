import { getRealPath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { getIconLinks } from "./components/index.js";
import type { ComponentPluginOptions } from "./options/index.js";
import {
  AVAILABLE_COMPONENTS,
  CLIENT_FOLDER,
  COMPONENT_PKG,
  isInstalled,
} from "./utils.js";

const { url } = import.meta;

export const prepareConfigFile = (
  app: App,
  { components = [], componentOptions = {} }: ComponentPluginOptions,
): Promise<string> => {
  const imports: string[] = [];
  let enhance = "";
  const setups: string[] = [];
  const configRootComponents: string[] = [];
  const shouldImportH = false;
  let shouldImportUseScriptTag = false;
  let shouldImportUseStyleTag = false;

  components.forEach((item) => {
    if (
      AVAILABLE_COMPONENTS.includes(item) &&
      (!COMPONENT_PKG[item] ||
        COMPONENT_PKG[item].every((pkg) => isInstalled(pkg, true)))
    ) {
      imports.push(
        `import ${item} from "${CLIENT_FOLDER}components/${item}.js";`,
      );

      enhance += `\
if(!hasGlobalComponent("${item}")) app.component("${item}", ${item});
`;
    }

    if (item === "FontIcon")
      getIconLinks(componentOptions.fontIcon?.assets).forEach((item) => {
        const { type, content } = item;

        if (type === "script") shouldImportUseScriptTag = true;
        else shouldImportUseStyleTag = true;

        setups.push(content);
      });
  });

  return app.writeTemp(
    `components/config.js`,
    `\
import { hasGlobalComponent } from "${getRealPath(
      "@vuepress/helper/client",
      url,
    )}";
${
  shouldImportH
    ? `\
import { h } from "vue";
`
    : ""
}
${
  shouldImportUseScriptTag
    ? `\
import { useScriptTag } from "${getRealPath("@vueuse/core/index.mjs", url)}";
`
    : ""
}\
${
  shouldImportUseStyleTag
    ? `\
import { useStyleTag } from "${getRealPath("@vueuse/core/index.mjs", url)}";
`
    : ""
}\
${imports.join("\n")}

import "${CLIENT_FOLDER}styles/sr-only.scss";

export default {
  enhance: ({ app }) => {
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  setup: () => {
${setups.map((item) => `    ${item}`).join("\n")}
  },
  rootComponents: [
${configRootComponents.map((item) => `    ${item}`).join("\n")}
  ],
};
`,
  );
};
