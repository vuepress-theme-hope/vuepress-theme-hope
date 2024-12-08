import { getModulePath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { getIconLinks } from "./components/index.js";
import type { ComponentPluginOptions } from "./options/index.js";
import {
  AVAILABLE_COMPONENTS,
  CLIENT_FOLDER,
  COMPONENT_PKG,
  isInstalled,
} from "./utils.js";

export const prepareConfigFile = (
  app: App,
  { components = [], componentOptions = {} }: ComponentPluginOptions,
): Promise<string> => {
  const imports: string[] = [];
  let enhance = "";
  const setups: string[] = [];
  const configRootComponents: string[] = [];
  let shouldImportUseScriptTag = false;
  let shouldImportUseStyleTag = false;

  components.forEach((item) => {
    if (
      AVAILABLE_COMPONENTS.includes(item) &&
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (!COMPONENT_PKG[item] ||
        COMPONENT_PKG[item].every((pkg) => isInstalled(pkg)))
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
import { hasGlobalComponent } from "${getModulePath(
      "@vuepress/helper/client",
      import.meta,
    )}";
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  shouldImportUseScriptTag
    ? `\
import { useScriptTag } from "${getModulePath("@vueuse/core/index.mjs", import.meta)}";
`
    : ""
}\
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  shouldImportUseStyleTag
    ? `\
import { useStyleTag } from "${getModulePath("@vueuse/core/index.mjs", import.meta)}";
`
    : ""
}\
${imports.join("\n")}

import "${getModulePath("@vuepress/helper/sr-only.css", import.meta)}";

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
