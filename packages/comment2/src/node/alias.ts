import { noopModule } from "vuepress-shared/node";

import { CLIENT_FOLDER, logger } from "./utils.js";

export const getProvider = (provider = "None"): string => {
  if (["Waline", "Giscus", "Twikoo"].includes(provider))
    return `${CLIENT_FOLDER}components/${provider}.js`;

  if (provider !== "None") logger.error(`Invalid provider: ${provider}`);

  return noopModule;
};
