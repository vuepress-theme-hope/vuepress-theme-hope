import { CLIENT_FOLDER, logger } from "./utils.js";
import { noopModule } from "vuepress-shared/node";

export const getProvider = (provider = "None"): string => {
  if (["Waline", "Giscus", "Twikoo"].includes(provider))
    return `${CLIENT_FOLDER}components/${provider}.js`;

  if (provider !== "None") logger.error(`Invalid provider: ${provider}`);

  return noopModule;
};
