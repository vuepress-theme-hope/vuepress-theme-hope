import { createConverter } from "vuepress-shared/node";

/** @deprecated */
export const convertOptions = (options: Record<string, unknown>): void => {
  const { deprecatedLogger } = createConverter("pwa2");

  deprecatedLogger({
    options,
    old: "wordPerminute",
    new: "wordPerMinute",
  });
};
