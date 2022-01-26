import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";

export const resolveMdEnhanceOptions = (
  options?: Partial<MarkdownEnhanceOptions> | false
): MarkdownEnhanceOptions | false =>
  options === false
    ? false
    : {
        container: true,
        ...(options || {}),
      };
