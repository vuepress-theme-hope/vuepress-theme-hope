import { createRequire } from "node:module";
import { AVAILABLE_COMPONENTS, CLIENT_FOLDER, logger } from "./utils.js";

import type { App } from "@vuepress/core";
import type { ComponentOptions } from "./options.js";

const require = createRequire(import.meta.url);

const getIconLink = (
  iconLink?: string
): { type: string; content: string } | null => {
  if (!iconLink) return null;

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
  {
    components = [],
    componentOptions = {},
    rootComponents = {},
  }: ComponentOptions
): Promise<string> => {
  let configImport = "";
  let enhance = "";
  let setup = "";
  let configRootComponents = "";
  let shouldImportH = false;
  let shouldImportUseScriptTag = false;
  let shouldImportUseStyleTag = false;

  components.forEach((item) => {
    if (AVAILABLE_COMPONENTS.includes(item)) {
      configImport += `\
import ${item} from "${CLIENT_FOLDER}components/${item}.js";
`;
      enhance += `\
app.component("${item}", ${item});
`;
    }

    if (item === "FontIcon") {
      const result = getIconLink(componentOptions.fontIcon?.assets);

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

  if (typeof rootComponents.addThis === "string") {
    shouldImportUseScriptTag = true;
    setup += `\
useScriptTag(\`//s7.addthis.com/js/300/addthis_widget.js#pubid=${rootComponents.addThis}\`);
`;
  }

  if (rootComponents.backToTop) {
    shouldImportH = true;
    configImport += `\
import BackToTop from "${CLIENT_FOLDER}components/BackToTop.js";
`;
    configRootComponents += `\
() => h(BackToTop, { threshold: ${
      typeof rootComponents.backToTop === "number"
        ? rootComponents.backToTop
        : 300
    } }),
`;
  }

  if (typeof rootComponents.notice === "object") {
    shouldImportH = true;
    configImport += `\
import Notice from "${CLIENT_FOLDER}components/Notice.js";
`;

    configRootComponents += `\
() => h(Notice, ${JSON.stringify(rootComponents.notice)}),
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
import { useScriptTag } from "${require.resolve("@vuepress/core")}";
`
    : ""
}\
${
  shouldImportUseStyleTag
    ? `\
import { useStyleTag } from "${require.resolve("@vuepress/core")}";
`
    : ""
}\
${configImport}

import "${CLIENT_FOLDER}styles/sr-only.scss";

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
${configRootComponents
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  ],
});
`
  );
};
