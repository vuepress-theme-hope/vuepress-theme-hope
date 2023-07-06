import { deprecatedLogger } from "./utils.js";
import type { SearchProOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: SearchProOptions & Record<string, unknown>,
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "fullIndex",
    newOption: "indexContent",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "historyCount",
    newOption: "resultHistoryCount",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "delay",
    newOption: "searchDelay",
  });
};
