import { endsWith, keys } from "vuepress-shared/node";

import { compressToEncodedURIComponent as encode } from "./ventors/lzstring.js";
import type {
  PlaygroundData,
  PlaygroundOptions,
  UnoPresetPlaygroundOptions,
} from "../../typings/index.js";
import { logger } from "../../utils.js";

/** Gets a query string representation (hash + queries) */
const getUrlJoinParam = (
  key: string,
  value: string,
  sign: string = "&",
): string => {
  if (value) return `${sign}${key}=${encode(value)}`;

  return "";
};

export const generateUnoURL = (
  service: string,
  inputHTML: string,
  customCSS: string,
  customConfigRaw: string,
): string => {
  const params = `/${getUrlJoinParam("html", inputHTML, "?")}${getUrlJoinParam(
    "config",
    customConfigRaw,
  )}${getUrlJoinParam("css", customCSS)}`;

  return `${service}${params}`;
};

export const getUnoPlaygroundPreset = ({
  service = "https://unocss.dev/play",
}: UnoPresetPlaygroundOptions = {}): PlaygroundOptions => ({
  name: "playground#unocss",
  propsGetter: ({
    title = "",
    files,
    key,
  }: PlaygroundData): Record<string, string> => {
    const htmlFiles = keys(files).filter((key) => endsWith(key, ".html"));
    const cssFiles = keys(files).filter((key) => endsWith(key, ".css"));
    const configFiles = keys(files).filter(
      (key) => endsWith(key, ".js") || endsWith(key, ".ts"),
    );

    if (htmlFiles.length > 1 || cssFiles.length > 1 || configFiles.length > 1)
      logger.error("UnoCSS playground only support 1 html/css/config file");

    const simplifyParam = (inputFiles: string[]): string =>
      inputFiles.length === 1 ? files[inputFiles[0]].content : "";

    const link = generateUnoURL(
      service,
      simplifyParam(htmlFiles),
      simplifyParam(cssFiles),
      simplifyParam(configFiles),
    );

    return {
      key,
      title,
      link: encodeURIComponent(link),
    };
  },
});
