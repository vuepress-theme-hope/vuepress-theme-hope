import { ensureEndingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";
import { logger } from "./utils";

import type { App } from "@vuepress/core";
import type { AvailableComponent, ComponentOptions } from "../shared";

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

const availableComponents: AvailableComponent[] = [
  "Badge",
  "CodePen",
  "FontIcon",
  "PDF",
  "Tab",
];

const getIconLink = (
  iconLink: string
): { type: string; content: string } | null => {
  if (iconLink === "fontawesome")
    return {
      type: "script",
      content: "https://kit.fontawesome.com/ca37c296c5.js",
    };

  if (iconLink === "iconfont")
    return {
      type: "style",
      content: `@import url("//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css");`,
    };

  const actualLink = iconLink.match(/^(?:https?:)?\/\//g)
    ? iconLink
    : `//${iconLink}`;

  if (actualLink.endsWith(".css"))
    return {
      type: "style",
      content: `@import url("${iconLink}");`,
    };

  if (actualLink.endsWith(".js"))
    return {
      type: "script",
      content: iconLink,
    };

  logger.error(`Can not recognize icon link: "${iconLink}"`);

  return null;
};

export const prepareConfigFile = (
  app: App,
  options: ComponentOptions
): Promise<string> => {
  let configImport = "";
  let enhance = "";
  let setup = "";
  let rootComponents = "";

  options.components.forEach((item) => {
    if (item === "Tab") {
      configImport += `import { Tab, Tabs } from "${CLIENT_FOLDER}components/Tab";\n`;
      enhance += `app.component("Tab", Tab);\napp.component("Tabs", Tabs);\n`;
    } else if (availableComponents.includes(item)) {
      configImport += `import ${item} from "${CLIENT_FOLDER}components/${item}";\n`;
      enhance += `app.component("${item}", ${item});\n`;
    }

    if (item === "FontIcon" && options.fontIconAssets) {
      const result = getIconLink(options.fontIconAssets);

      if (result) {
        const { type, content } = result;
        const composableName =
          type === "script" ? "useScriptTag" : "useStyleTag";

        configImport += `import { ${composableName} } from "${CLIENT_FOLDER}composables";\n`;
        setup += `${composableName}(\`${content}\`);\n`;
      }
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
  setup: () => {
${setup
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
