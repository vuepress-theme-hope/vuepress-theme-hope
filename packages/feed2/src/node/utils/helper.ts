import {
  Logger,
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "vuepress-shared/node";

export const FEED_GENERATOR = "vuepress-plugin-feed2";

export const logger = new Logger(FEED_GENERATOR);

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
