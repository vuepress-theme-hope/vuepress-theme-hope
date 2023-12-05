import { createRequire } from "node:module";

import { path } from "@vuepress/utils";

export const getRealPath = (fileUrl: string, currentUrl: string): string => {
  const require = createRequire(currentUrl);

  return path.normalize(require.resolve(fileUrl));
};
