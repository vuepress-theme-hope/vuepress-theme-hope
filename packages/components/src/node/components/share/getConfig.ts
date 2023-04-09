import { isPlainObject, isString } from "vuepress-shared/node";

import { AVAILABLE_SERVICES, SHARE_CONFIG } from "./config.js";
import {
  type ShareService,
  type ShareServiceOptions,
} from "../../../shared/index.js";
import { type ComponentOptions } from "../../options/index.js";

export const getShareServiceConfig = (
  options: ComponentOptions
): ShareServiceOptions[] => {
  const services: ShareService[] =
    options.componentOptions?.share?.services ?? AVAILABLE_SERVICES;
  const content: ShareServiceOptions[] = [];

  services.forEach((service) => {
    if (isString(service)) {
      if (service === "twitter")
        content.push({
          name: service,
          ...SHARE_CONFIG[service],
          // handle twitter user name
          link: SHARE_CONFIG[service].link.replace(
            "[twitter-user]",
            options.componentOptions?.share?.twitterUserName ?? ""
          ),
        });
      // a built-in service
      else if (AVAILABLE_SERVICES.includes(service))
        content.push({ name: service, ...SHARE_CONFIG[service] });
    }
    // a custom service
    else if (
      isPlainObject(service) &&
      service.name &&
      service.link &&
      service.shape
    ) {
      // a custom service
      content.push(service);
    }
  });

  return content;
};
