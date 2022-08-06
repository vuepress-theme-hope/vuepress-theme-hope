import lightGallery from "lightgallery";
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import type { LightGallery } from "lightgallery/lightgallery";
import type { LightGallerySettings } from "lightgallery/lg-settings";
import type { LgQuery } from "lightgallery/lgQuery";
import type { GalleryItem } from "lightgallery/lg-utils";
import type { VNode } from "vue";

import "lightgallery/scss/lightgallery.scss";

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

    const plugins: Promise<{
      default: new (
        instance: LightGallery,
        $LG: LgQuery
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => any;
    }>[] = [];
    const pluginsStyles: unknown[] = [];

    if (LIGHT_GALLERY_AUTOPLAY) {
      plugins.push(import("lightgallery/plugins/autoplay"));
      pluginsStyles.push(import("lightgallery/scss/lg-autoplay.scss"));
    }

    if (LIGHT_GALLERY_FULLSCREEN) {
      plugins.push(import("lightgallery/plugins/fullscreen"));
      pluginsStyles.push(import("lightgallery/scss/lg-fullscreen.scss"));
    }

    if (LIGHT_GALLERY_PAGER) {
      plugins.push(import("lightgallery/plugins/pager"));
      pluginsStyles.push(import("lightgallery/scss/lg-pager.scss"));
    }

    if (LIGHT_GALLERY_ROTATE) {
      plugins.push(import("lightgallery/plugins/rotate"));
      pluginsStyles.push(import("lightgallery/scss/lg-rotate.scss"));
    }

    if (LIGHT_GALLERY_SHARE) {
      plugins.push(import("lightgallery/plugins/share"));
      pluginsStyles.push(import("lightgallery/scss/lg-share.scss"));
    }

    if (LIGHT_GALLERY_THUMBNAIL) {
      plugins.push(import("lightgallery/plugins/thumbnail"));
      pluginsStyles.push(import("lightgallery/scss/lg-thumbnail.scss"));
    }

    if (LIGHT_GALLERY_ZOOM) {
      plugins.push(import("lightgallery/plugins/zoom"));
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

          instance = lightGallery(container.value!, {
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
