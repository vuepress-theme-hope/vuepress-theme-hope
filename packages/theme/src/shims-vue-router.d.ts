import type { ArticleInfo } from "./shared/index.js";

declare module "vue-router" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends ArticleInfo {}
}
