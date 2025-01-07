import { getModulePath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { ComponentPluginOptions } from "./options/index.js";
import {
  AVAILABLE_COMPONENTS,
  CLIENT_FOLDER,
  COMPONENT_PKG,
  isInstalled,
} from "./utils.js";

export const prepareConfigFile = (
  app: App,
  { components = [] }: ComponentPluginOptions,
): Promise<string> => {
  const imports: string[] = [];
  let enhance = "";
  const setups: string[] = [];
  const configRootComponents: string[] = [];

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
  });

  return app.writeTemp(
    `components/config.js`,
    `\
import { hasGlobalComponent } from "${getModulePath(
      "@vuepress/helper/client",
      import.meta,
    )}";
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
