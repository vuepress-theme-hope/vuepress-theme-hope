import type { ArticleInfo } from "./shared.js";

declare module "vue-router" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends ArticleInfo {}
}
