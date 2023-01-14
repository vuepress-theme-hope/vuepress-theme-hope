import {
  isArray,
  isLinkHttp,
  isPlainObject,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { Logger, encodeCDATA, encodeXMLContent } from "vuepress-shared/node";

import type { ElementCompact } from "xml-js";

export const FEED_GENERATOR = "vuepress-plugin-feed2";

export const logger = new Logger(FEED_GENERATOR);

export const compareDate = (
  dateA: Date | string | undefined,
  dateB: Date | string | undefined
): number => {
  if (!dateA || !(dateA instanceof Date)) return 1;
  if (!dateB || !(dateB instanceof Date)) return -1;

  return dateB.getTime() - dateA.getTime();
};

export const resolveUrl = (hostname: string, base = "", path = ""): string =>
  `${
    isLinkHttp(hostname)
      ? removeEndingSlash(hostname)
      : `https://${removeEndingSlash(hostname)}`
  }${base}${removeLeadingSlash(path)}`;

export const getImageMineType = (ext = ""): string =>
  `image/${
    ext === "jpg"
      ? "jpeg"
      : ext === "svg"
      ? "svg+xml"
      : ext === "jpeg" ||
        ext === "png" ||
        ext === "bmp" ||
        ext === "gif" ||
        ext === "webp"
      ? ext
      : ""
  }`;

export const encodeXML = (content: ElementCompact): ElementCompact =>
  Object.fromEntries(
    Object.entries(content).map(([key, value]) => {
      if (key === "_attributes" && value)
        return [
          key,
          Object.fromEntries(
            Object.entries(
              value as Record<string, string | number | undefined>
            ).map(([key, value]) => [
              key,
              value ? encodeXMLContent(value.toString()) : undefined,
            ])
          ),
        ];
      if (key === "_text")
        return [key, encodeXMLContent((value as string | number).toString())];
      if (key === "_cdata") return [key, encodeCDATA(value as string)];

      if (isArray(value))
        return [key, value.map((item) => encodeXML(item as ElementCompact))];

      if (isPlainObject(value))
        return [key, encodeXML(value as ElementCompact)];

      return [key, encodeXMLContent(String(value))];
    })
  ) as ElementCompact;
