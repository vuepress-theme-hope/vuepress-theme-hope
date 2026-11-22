import { getModulePath } from "@vuepress/helper";
import type { App } from "vuepress/core";
import { colors } from "vuepress/utils";

import type { ComponentPluginOptions } from "./options/index.js";
import { AVAILABLE_COMPONENTS, CLIENT_FOLDER, logger } from "./utils.js";

export const prepareConfigFile = (
  app: App,
  { components = [] }: ComponentPluginOptions,
): Promise<string> => {
  const imports: string[] = [];
  let enhance = "";
  const setups: string[] = [];
  const configRootComponents: string[] = [];

  components.forEach((item) => {
    if (AVAILABLE_COMPONENTS.includes(item)) {
      imports.push(`import ${item} from "${CLIENT_FOLDER}components/${item}.js";`);

      enhance += `\
if(!hasGlobalComponent("${item}")) app.component("${item}", ${item});
`;
    } else {
      logger.warn(
        `${colors.cyan(item)} component is not available, it will be ignored. Please check your options.`,
      );
    }
  });

  return app.writeTemp(
    `components/config.js`,
    `\
import { hasGlobalComponent } from "${getModulePath("@vuepress/helper/client", import.meta)}";
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
