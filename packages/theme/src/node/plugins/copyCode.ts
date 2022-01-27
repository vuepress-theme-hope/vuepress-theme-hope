import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";

export const resolveCopyCodeOptions = (
  options?: CopyCodeOptions | false
): CopyCodeOptions | false =>
  options === false
    ? false
    : {
        selector: '.theme-hope-content div[class*="language-"] pre',
        ...options,
      };
