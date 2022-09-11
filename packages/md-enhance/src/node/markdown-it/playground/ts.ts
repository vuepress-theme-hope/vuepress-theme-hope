import ts from "typescript";
import { deepAssign } from "vuepress-shared";
import { compressToEncodedURIComponent } from "./ventors/lzstring.js";

import type { CompilerOptions } from "typescript";
import type {
  PlaygroundData,
  PlaygroundOptions,
  TSPresetPlaygroundOptions,
} from "../../../shared/index.js";

// const TARGET_MAP = {
//   es3: 0,
//   es5: 1,
//   es6: 2,
//   es2015: 2,
//   es2016: 3,
//   es2017: 4,
//   es2018: 5,
//   es2019: 6,
//   es2020: 7,
//   es2021: 8,
//   es2022: 9,
//   esnext: 99,
// };

// const MODULE_MAP = {
//   none: 0,
//   commonjs: 1,
//   amd: 2,
//   system: 4,
//   umd: 3,
//   es6: 5,
//   es2015: 5,
//   es2020: 6,
//   es2022: 7,
//   esnext: 99,
//   node16: 100,
//   nodenext: 199,
// };

// const JSX_MAP = {
//   preserve: 1,
//   "react-native": 3,
//   react: 2,
//   "react-jsx": 4,
//   "react-jsxdev": 5,
// };

// const IMPORTS_NOT_USED_AS_VALUES = {
//   remove: 0,
//   preserve: 1,
//   error: 2,
// };

// const MODULE_RESOLUTION_MAP = {
//   node: 2,
//   classic: 1,
//   node16: 3,
//   nodenext: 99,
// };

// const NEWLINE_MAP = {
//   crlf: 0,
//   lf: 1,
// };

/** Gets a query string representation (hash + queries) */
export const getURL = (
  code: string,
  compilerOptions: CompilerOptions = {}
): string => {
  const hash = `#code/${compressToEncodedURIComponent(code)}`;

  const queryString = Object.entries(compilerOptions)
    .filter(
      ([key, value]) =>
        value !== null &&
        value !== undefined &&
        Boolean(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line
          ts.optionDeclarations.find((option) => option.name === key)
        )
    )
    .map(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line
      const type = ts.optionDeclarations.find(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line
        (option) => option.name === key
      ).type as Map<string, number> | "boolean" | "list" | "number" | "string";

      if (type instanceof Map) {
        const result = type.get(value as string);

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
  getter: ({
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
