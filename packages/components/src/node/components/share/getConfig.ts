import { isPlainObject, isString } from "@vuepress/helper";

import { AVAILABLE_SERVICES, SHARE_CONFIG } from "./config.js";
import type {
  ShareService,
  ShareServiceOptions,
} from "../../../shared/index.js";
import type { ShareOptions } from "../../options/index.js";

export const getShareServiceConfig = (
  shareOptions?: ShareOptions,
): ShareServiceOptions[] => {
  const services: ShareService[] = shareOptions?.services ?? [
    "twitter",
    "facebook",
    "reddit",
    "telegram",
    "whatsapp",
    "email",
  ];
  const content: ShareServiceOptions[] = [];

  services.forEach((service) => {
    if (isString(service)) {
      if (service === "twitter")
        content.push({
          name: service,
          ...SHARE_CONFIG[service],
          // Handle twitter user name
          link: SHARE_CONFIG[service].link.replace(
            "[twitter-user]",
            shareOptions?.twitterUserName ?? "",
          ),
        });
      // A built-in service
      else if (AVAILABLE_SERVICES.includes(service))
        content.push({ name: service, ...SHARE_CONFIG[service] });
    }
    // A custom service
    else if (
      isPlainObject(service) &&
      service.name &&
      service.link &&
      service.shape
    ) {
      // A custom service
      content.push(service);
    }
  });

  return content;
};
