import { ensureEndingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { AvailableComponent, ComponentOptions } from "../shared";

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

const availableComponents: AvailableComponent[] = ["Badge", "CodePen", "PDF"];

export const prepareConfigFile = (
  app: App,
  options: ComponentOptions
): Promise<string> => {
  let configImport = "";
  let enhance = "";
  let rootComponents = "";

  options.components.forEach((item) => {
    if (availableComponents.includes(item)) {
      configImport += `import ${item} from "${CLIENT_FOLDER}components/${item}";\n`;
      enhance += `app.component("${item}", ${item});\n`;
    }
  });

  if (options.backToTop) {
    configImport += `import BackToTop from "${CLIENT_FOLDER}components/BackToTop";\n`;
    rootComponents += `BackToTop,\n`;
  }

  return app.writeTemp(
    `mr-hope-components/config.js`,
    `import { defineClientConfig } from "@vuepress/client";
${configImport}

export default defineClientConfig({
  enhance: ({ app }) => {
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  rootComponents: [
${rootComponents
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  ],
});`
  );
};
