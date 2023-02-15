import { isPlainObject, isString } from "@vuepress/shared";

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
      // a built-in service
      if (AVAILABLE_SERVICES.includes(service))
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
