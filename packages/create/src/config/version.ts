import { createRequire } from "node:module";

export const { version } = createRequire(import.meta.url)(
  "create-vuepress-theme-hope/package.json",
) as Record<string, unknown> & { version: string };
