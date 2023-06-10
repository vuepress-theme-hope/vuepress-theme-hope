declare module "@temp/lightgallery/plugins.js" {
  import type { LgQuery } from "lightgallery/lgQuery.js";
  import type { LightGallery } from "lightgallery/lightgallery.js";

  type LightGalleryPlugin<T = unknown> = {
    default: new (instance: LightGallery, $LG: LgQuery) => T;
  };

  export const useLightGalleryPlugins: () => Promise<LightGalleryPlugin[]>;
}
