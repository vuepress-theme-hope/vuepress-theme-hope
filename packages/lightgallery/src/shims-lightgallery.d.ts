type LightGalleryPlugin<T = unknown> = {
  default: new (instance: LightGallery, $LG: LgQuery) => T;
};

declare module "lightgallery/lightgallery.es5.js" {
  import { LightGallery } from "lightgallery/lightgallery.js";
  export default LightGallery;
}

declare module "lightgallery/plugins/autoplay/lg-autoplay.es5.js" {
  export default LightGalleryPlugin;
}

declare module "lightgallery/plugins/fullscreen/lg-fullscreen.es5.js" {
  export default LightGalleryPlugin;
}

declare module "lightgallery/plugins/pager/lg-pager.es5.js" {
  export default LightGalleryPlugin;
}

declare module "lightgallery/plugins/rotate/lg-rotate.es5.js" {
  export default LightGalleryPlugin;
}

declare module "lightgallery/plugins/share/lg-share.es5.js" {
  export default LightGalleryPlugin;
}

declare module "lightgallery/plugins/thumbnail/lg-thumbnail.es5.js" {
  export default LightGalleryPlugin;
}

declare module "lightgallery/plugins/zoom/lg-zoom.es5.js" {
  export default LightGalleryPlugin;
}
