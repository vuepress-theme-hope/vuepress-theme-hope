import { createConverter } from "vuepress-shared/node";

/** @deprecated */
export const convertOptions = (options: Record<string, unknown>): void => {
  const { deprecatedLogger, droppedLogger } = createConverter("copy-code2");

  deprecatedLogger({
    options,
    old: "locale",
    new: "locales",
  });
  droppedLogger({
    options,
    old: "pure",
    new: "fancy",
  });
};
