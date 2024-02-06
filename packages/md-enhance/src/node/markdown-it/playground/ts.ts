import {
  deepAssign,
  endsWith,
  entries,
  isDef,
  isPlainObject,
  keys,
} from "@vuepress/helper";
import type { CompilerOptions } from "typescript";

import { compressToEncodedURIComponent } from "./ventors/lzstring.js";
import { optionDeclarations } from "./ventors/optionDeclarations.js";
import type {
  PlaygroundData,
  PlaygroundOptions,
  TSPresetPlaygroundOptions,
} from "../../typings/index.js";
import { logger } from "../../utils.js";

/** Gets a query string representation (hash + queries) */
export const getURL = (
  code: string,
  compilerOptions: CompilerOptions = {},
): string => {
  const hash = `#code/${compressToEncodedURIComponent(code)}`;

  const queryString = entries(compilerOptions)
    .map(([key, value]) => {
      const item = optionDeclarations.find((option) => option.name === key)!;

      if (!item || value === null || !isDef(value)) return "";

      const { type } = item;

      if (isPlainObject(type)) {
        const result = type[value as keyof typeof type];

        return result?.toString() || "";
      }

      return `${key}=${encodeURIComponent(value as string)}`;
    })
    .filter((value) => value.length)
    .join("&");

  return `${queryString ? `?${queryString}` : ""}${hash}`;
};

export const getTSPlaygroundPreset = ({
  service = "https://www.typescriptlang.org/play",
  ...compilerOptions
}: TSPresetPlaygroundOptions = {}): PlaygroundOptions => ({
  name: "playground#ts",
  propsGetter: ({
    title = "",
    files,
    settings,
  }: PlaygroundData): Record<string, string> => {
    const tsFiles = keys(files).filter((key) => endsWith(key, ".ts"));

    if (tsFiles.length !== 1)
      logger.error("TS playground only support 1 ts file");

    const link = `${service}${getURL(
      files[tsFiles[0]].content,
      deepAssign(
        {},
        <CompilerOptions>settings || {},
        <CompilerOptions>compilerOptions,
      ),
    )}`;

    return {
      title,
      link: encodeURIComponent(link),
    };
  },
});
