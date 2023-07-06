import type { CompilerOptions } from "typescript";
import {
  deepAssign,
  endsWith,
  entries,
  isPlainObject,
  keys,
} from "vuepress-shared/node";

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

      if (!item || value === null || value === undefined) return "";

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
    key,
  }: PlaygroundData): Record<string, string> => {
    const tsfiles = keys(files).filter((key) => endsWith(key, ".ts"));

    if (tsfiles.length !== 1)
      logger.error("TS playground only support 1 ts file");

    const link = `${service}${getURL(
      files[tsfiles[0]].content,
      deepAssign(
        {},
        <CompilerOptions>settings || {},
        <CompilerOptions>compilerOptions,
      ),
    )}`;

    return {
      key,
      title,
      link: encodeURIComponent(link),
    };
  },
});
