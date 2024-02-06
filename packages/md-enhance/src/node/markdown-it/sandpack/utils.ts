import { entries, fromEntries } from "@vuepress/helper";

import type { SandpackData } from "../../typings/index.js";

export const encodeFiles = (files: SandpackData["files"]): string =>
  JSON.stringify(
    fromEntries(
      entries(files).map(([key, file]) => [
        key,
        typeof file === "string"
          ? file
          : file.active || file.hidden || file.readOnly
            ? file
            : file.code,
      ]),
    ),
  );

export const getAttrs = (str: string): Record<string, string> => {
  const matches = /.*(?<!\\)\[([^}]*)\].*/.exec(str); // [attr1 attr2]

  if (matches && matches[1]) {
    const arrAttrs = matches[1].split(" ");

    return fromEntries(
      arrAttrs
        .filter((attr) => attr.trim().length > 0)
        .map((attr) => {
          const [key, value = ""] = attr.trim().split("=", 2);

          return [key, value];
        }),
    );
  }

  return {};
};
