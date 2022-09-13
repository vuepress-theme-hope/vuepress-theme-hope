import { deepAssign } from "vuepress-shared";
import { compressToEncodedURIComponent } from "./ventors/lzstring.js";
import { optionDeclarations } from "./ventors/optionDelcarations.js";

import type { CompilerOptions } from "typescript";
import type {
  PlaygroundData,
  PlaygroundOptions,
  TSPresetPlaygroundOptions,
} from "../../../shared/index.js";

/** Gets a query string representation (hash + queries) */
export const getURL = (
  code: string,
  compilerOptions: CompilerOptions = {}
): string => {
  const hash = `#code/${compressToEncodedURIComponent(code)}`;

  const queryString = Object.entries(compilerOptions)
    .map(([key, value]) => {
      const item = optionDeclarations.find((option) => option.name === key)!;

      if (!item || value === null || value === undefined) return "";

      const { type } = item;

      if (typeof type === "object") {
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
    const tsfiles = Object.keys(files).filter((key) => key.endsWith(".ts"));

    if (tsfiles.length !== 1)
      console.error("TS playground only support 1 ts file");

    const link = `${service}${getURL(
      files[tsfiles[0]].content,
      deepAssign(
        {},
        <CompilerOptions>settings || {},
        <CompilerOptions>compilerOptions
      )
    )}`;

    return {
      key,
      title,
      link: encodeURIComponent(link),
    };
  },
});
