type LightGalleryPlugin<T = unknown> = {
  default: new (
    instance: LightGallery,
    $LG: LgQuery
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => T;
};

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
