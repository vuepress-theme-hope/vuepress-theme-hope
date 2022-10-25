import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { logger } from "./utils.js";

import type { App } from "@vuepress/core";
import type { AvailableComponent, ComponentOptions } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);
const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

const availableComponents: AvailableComponent[] = [
  "Badge",
  "BiliBili",
  "Catalog",
  "CodePen",
  "FontIcon",
  "PDF",
  "StackBlitz",
  "VideoPlayer",
  "YouTube",
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
      content: `@import url("//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css");`,
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
  let shouldImportH = false;
  let shouldImportUseScriptTag = false;
  let shouldImportUseStyleTag = false;

  options.components.forEach((item) => {
    if (availableComponents.includes(item)) {
      configImport += `\
import ${item} from "${CLIENT_FOLDER}components/${item}.js";
`;
      enhance += `\
app.component("${item}", ${item});
`;
    }

    if (item === "FontIcon" && options.iconAssets) {
      const result = getIconLink(options.iconAssets);

      if (result) {
        const { type, content } = result;

        if (type === "script") {
          shouldImportUseScriptTag = true;
          setup += `\
useScriptTag(\`${content}\`);
`;
        } else {
          shouldImportUseStyleTag = true;
          setup += `\
useStyleTag(\`${content}\`, { id: "icon-assets" });
`;
        }
      }
    }
  });

  if (typeof options.addThis === "string") {
    shouldImportUseScriptTag = true;
    setup += `\
useScriptTag(\`//s7.addthis.com/js/300/addthis_widget.js#pubid=${options.addThis}\`);
`;
  }

  if (options.backToTop) {
    shouldImportH = true;
    configImport += `\
import BackToTop from "${CLIENT_FOLDER}components/BackToTop.js";
`;
    rootComponents += `\
() => h(BackToTop, { threshold: ${
      typeof options.backToTop === "number" ? options.backToTop : 300
    } }),
`;
  }

  return app.writeTemp(
    `components/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
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
import { useScriptTag } from "${CLIENT_FOLDER}vueuse.js";
`
    : ""
}\
${
  shouldImportUseStyleTag
    ? `\
import { useStyleTag } from "${CLIENT_FOLDER}vueuse.js";
`
    : ""
}\
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
});
`
  );
};
