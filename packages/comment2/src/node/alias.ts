import { noopModule } from "@vuepress/helper";

import { CLIENT_FOLDER, COMMENT_PROVIDERS, logger } from "./utils.js";

export const getProvider = (provider = "None"): string => {
  if (COMMENT_PROVIDERS.includes(provider))
    return `${CLIENT_FOLDER}components/${provider}.js`;

  if (provider !== "None") logger.error(`Invalid provider: ${provider}`);

  return noopModule;
};
