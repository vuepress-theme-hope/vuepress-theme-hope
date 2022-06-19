import type { CommentOptions } from "../shared";

/** @deprecated */
export const covertOptions = (
  options: CommentOptions & Record<string, unknown>
): void => {
  if ("type" in options) {
    console.warn(`"type" is deprecated, please use "provider".`);
    if (options["type"] === "waline") options.provider = "Waline";
    else if (options["type"] === "giscus") options.provider = "Giscus";
    else if (options["type"] === "twikoo") options.provider = "Twikoo";

    delete options["type"];
  }

  // covert Waline options
  if (options.provider === "Waline") {
    [
      // valine
      ["emojiCDN", "emoji"],
      ["emojiMaps", "emoji"],
      ["requiredFields", "requiredMeta"],
      ["visitor", "pageview"],
      ["langMode", "locale"],
      ["placeholder", "locale.placeholder"],

      // waline v1
      ["highlight", "highlighter"],
      ["uploadImage", "imageUploader"],
      ["previewMath", "texRenderer"],
      ["anonymous", "login"],
      ["copyRight", "copyright"],
    ].forEach(([oldOptions, newOptions]) => {
      if (oldOptions in options) {
        console.warn(
          `"${oldOptions}" is deprecated in @waline/client@v2, you should use "${newOptions}" instead.`
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete options[oldOptions];
      }
    });

    [
      // valine
      "region",
      "appId",
      "appKey",
      "notify",
      "verify",
      "avatar",
      "avatarForce",
      "enableQQ",
      "recordIP",
      "serverURLs",

      // waline v1
      "avatarCDN",
      "mathTagSupport",
    ].forEach((option) => {
      if (option in options) {
        console.warn(
          `"${option}" is no longer supported in @waline/client@v2.`
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete options[option];
      }
    });
  }
};
