import type { CopyCodeOptions } from "vuepress-plugin-copy-code2";

export const resolveCopyCodeOptions = (
  options?: CopyCodeOptions | false
): CopyCodeOptions | false => (options === false ? false : options || {});
