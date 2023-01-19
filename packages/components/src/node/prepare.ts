import { isArray, isString } from "@vuepress/shared";
import { AVAILABLE_COMPONENTS, CLIENT_FOLDER } from "./utils.js";
import { getIconLink, getNoticeOptions } from "./components/index.js";

import type { App } from "@vuepress/core";
import type { ComponentOptions } from "./options/index.js";

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
if(!hasGlobalComponent("${item}")) app.component("${item}", ${item});
`;
    }

    if (item === "FontIcon")
      getIconLink(componentOptions.fontIcon?.assets).forEach((item) => {
        const { type, content } = item;

        if (type === "script") {
          shouldImportUseScriptTag = true;
        } else {
          shouldImportUseStyleTag = true;
        }

        setup += content;
      });
  });

  if (isString(rootComponents.addThis)) {
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

  if (isArray(rootComponents.notice)) {
    shouldImportH = true;
    configImport += `\
import Notice from "${CLIENT_FOLDER}components/Notice.js";
`;

    configRootComponents += `\
() => h(Notice, { config: ${JSON.stringify(
      getNoticeOptions(rootComponents.notice)
    )} }),
`;
  }

  return app.writeTemp(
    `components/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "${CLIENT_FOLDER}shared.js";
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
