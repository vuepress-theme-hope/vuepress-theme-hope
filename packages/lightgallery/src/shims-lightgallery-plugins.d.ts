declare module "@temp/lightgallery/plugins.js" {
  import type { LgQuery } from "lightgallery/lgQuery.js";
  import type { LightGallery } from "lightgallery/lightgallery.js";

  export interface LightGalleryPlugin<ReturnType = unknown> {
    default: new (instance: LightGallery, $LG: LgQuery) => ReturnType;
  }

  export const useLightGalleryPlugins: () => Promise<LightGalleryPlugin[]>;
}
