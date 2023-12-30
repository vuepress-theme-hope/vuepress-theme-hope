import { entries, fromEntries } from "vuepress-shared/node";

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

export const getAttrs = (str: string): Record<string, string | null> => {
  const attrs: Record<string, string | null> = {};

  // const matches = /.*(?<!\\)\{([^}]*)\}.*/g.exec(str); // {attr1 attr2}
  const matches = /.*(?<!\\)\[([^}]*)\].*/g.exec(str); // [attr1 attr2]

  if (matches && matches[1]) {
    const arrAttrs = matches[1].split(" ");

    arrAttrs
      .filter((attr) => attr.trim().length > 0)
      .forEach((attr) => {
        const pairs = attr.trim().split("=", 2);

        if (pairs.length === 1) attrs[pairs[0]] = "true";
        else attrs[pairs[0]] = pairs[1];
      });
  }

  return attrs;
};
