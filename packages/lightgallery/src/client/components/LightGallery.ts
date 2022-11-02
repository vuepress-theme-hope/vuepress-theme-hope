import { default as lightGallery } from "lightgallery/lightgallery.es5.js";
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import type { LightGallery } from "lightgallery/lightgallery.js";
import type { LightGallerySettings } from "lightgallery/lg-settings.js";
import type { LgQuery } from "lightgallery/lgQuery.js";
import type { GalleryItem } from "lightgallery/lg-utils.js";
import type { VNode } from "vue";

import "lightgallery/scss/lightgallery.scss";

type LightGalleryPlugin<T = unknown> = {
  default: new (instance: LightGallery, $LG: LgQuery) => T;
};

declare const IMAGE_SELECTOR: string;
declare const LIGHT_GALLERY_DELAY: number;
declare const LIGHT_GALLERY_OPTIONS: LightGallerySettings;
declare const LIGHT_GALLERY_AUTOPLAY: boolean;
declare const LIGHT_GALLERY_FULLSCREEN: boolean;
declare const LIGHT_GALLERY_PAGER: boolean;
declare const LIGHT_GALLERY_THUMBNAIL: boolean;
declare const LIGHT_GALLERY_ROTATE: boolean;
declare const LIGHT_GALLERY_SHARE: boolean;
declare const LIGHT_GALLERY_ZOOM: boolean;

const getImages = (images: HTMLImageElement[]): GalleryItem[] =>
  images.map(
    ({ alt, srcset, src }) =>
      <GalleryItem>{
        alt: alt,
        src: src,
        thumb: src || srcset,
        srcset: srcset,
        subHtml: alt,
      }
  );

export default defineComponent({
  name: "LightGallery",

  setup(_props, { slots }) {
    const route = useRoute();
    const container = ref<HTMLElement>();
    let instance: LightGallery | null = null;
    let id: number;

    const plugins: Promise<LightGalleryPlugin>[] = [];
    const pluginsStyles: unknown[] = [];

    if (LIGHT_GALLERY_AUTOPLAY) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import("lightgallery/plugins/autoplay/lg-autoplay.es5.js")
        )
      );
      pluginsStyles.push(import("lightgallery/scss/lg-autoplay.scss"));
    }

    if (LIGHT_GALLERY_FULLSCREEN) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import("lightgallery/plugins/fullscreen/lg-fullscreen.es5.js")
        )
      );
      pluginsStyles.push(import("lightgallery/scss/lg-fullscreen.scss"));
    }

    if (LIGHT_GALLERY_PAGER) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import("lightgallery/plugins/pager/lg-pager.es5.js")
        )
      );
      pluginsStyles.push(import("lightgallery/scss/lg-pager.scss"));
    }

    if (LIGHT_GALLERY_ROTATE) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import("lightgallery/plugins/rotate/lg-rotate.es5.js")
        )
      );
      pluginsStyles.push(import("lightgallery/scss/lg-rotate.scss"));
    }

    if (LIGHT_GALLERY_SHARE) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import("lightgallery/plugins/share/lg-share.es5.js")
        )
      );
      pluginsStyles.push(import("lightgallery/scss/lg-share.scss"));
    }

    if (LIGHT_GALLERY_THUMBNAIL) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import("lightgallery/plugins/thumbnail/lg-thumbnail.es5.js")
        )
      );
      pluginsStyles.push(import("lightgallery/scss/lg-thumbnail.scss"));
    }

    if (LIGHT_GALLERY_ZOOM) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import("lightgallery/plugins/zoom/lg-zoom.es5.js")
        )
      );
      pluginsStyles.push(import("lightgallery/scss/lg-zoom.scss"));
    }

    const initLightGallery = (): void => {
      const timeID = (id = new Date().getTime());

      void Promise.all([
        Promise.all(plugins),
        Promise.all(pluginsStyles),
        new Promise<void>((resolve) =>
          setTimeout(resolve, LIGHT_GALLERY_DELAY)
        ),
      ]).then(([plugins]) => {
        if (timeID === id) {
          instance?.destroy();

          const images = Array.from(
            document.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR)
          );

          instance = new lightGallery(container.value!, {
            ...LIGHT_GALLERY_OPTIONS,
            dynamic: true,
            dynamicEl: getImages(images),
            // this is a licenseKey to make this project under MIT, special thanks to @Sachin
            licenseKey: "VSY7R-J@WED-CJY76-UMDXQ",
            plugins: plugins.map(({ default: plugin }) => plugin),
          });

          images.forEach((image, index) => {
            image.addEventListener("click", () => {
              instance?.openGallery(index);
            });
          });
        }
      });
    };

    watch(
      () => route.path,
      () => initLightGallery()
    );

    onMounted(() => initLightGallery());

    onBeforeUnmount(() => instance?.destroy());

    return (): VNode =>
      h(
        "div",
        { ref: container, class: "lightgallery-vuepress" },
        slots["default"]?.()
      );
  },
});
