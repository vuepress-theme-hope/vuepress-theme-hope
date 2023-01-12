import { isArray, isString } from "@vuepress/shared";
import { CLIENT_FOLDER, logger } from "./utils.js";

import type { App } from "@vuepress/core";
import type { AvailableComponent, ComponentOptions } from "./options.js";
import type { NoticeClientOptions, NoticeOptions } from "../shared/index.js";

const availableComponents: AvailableComponent[] = [
  "ArtPlayer",
  "AudioPlayer",
  "Badge",
  "BiliBili",
  "Catalog",
  "CodePen",
  "FontIcon",
  "PDF",
  "SiteInfo",
  "StackBlitz",
  "VideoPlayer",
  "YouTube",
];

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
      content: `@import url("//at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");`,
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

const getNoticeOptions = (options: NoticeOptions[]): NoticeClientOptions[] =>
  options
    .map(
      ({ key, ...item }) =>
        <NoticeClientOptions>{
          noticeKey: key,
          ...item,
          ...("match" in item ? { match: item.match.toString() } : {}),
        }
    )
    .sort((a, b) =>
      "match" in a
        ? "match" in b
          ? b.match.localeCompare(a.match)
          : -1
        : "match" in b
        ? 1
        : (b.path || "").localeCompare(a.path || "")
    );

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
    if (availableComponents.includes(item)) {
      configImport += `\
import ${item} from "${CLIENT_FOLDER}components/${item}.js";
`;
      enhance += `\
if(!hasGlobalComponent("${item}")) app.component("${item}", ${item});
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
