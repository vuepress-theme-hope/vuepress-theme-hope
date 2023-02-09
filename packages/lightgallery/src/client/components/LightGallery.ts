import { usePageData } from "@vuepress/client";
import { type LightGallerySettings } from "lightgallery/lg-settings.js";
import { type GalleryItem } from "lightgallery/lg-utils.js";
import { type LgQuery } from "lightgallery/lgQuery.js";
import lightGallery from "lightgallery/lightgallery.es5.js";
import { type LightGallery } from "lightgallery/lightgallery.js";
import {
  type VNode,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";

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
    const page = usePageData();

    const container = ref<HTMLElement>();

    let instance: LightGallery | null = null;
    let id: number;

    const plugins: Promise<LightGalleryPlugin>[] = [];
    const pluginsStyles: unknown[] = [];

    if (LIGHT_GALLERY_AUTOPLAY) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import(
            /* webpackChunkName: "lightgallery" */ "lightgallery/plugins/autoplay/lg-autoplay.es5.js"
          )
        )
      );
      pluginsStyles.push(
        import(
          /* webpackChunkName: "lightgallery" */ "lightgallery/scss/lg-autoplay.scss"
        )
      );
    }

    if (LIGHT_GALLERY_FULLSCREEN) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import(
            /* webpackChunkName: "lightgallery" */ "lightgallery/plugins/fullscreen/lg-fullscreen.es5.js"
          )
        )
      );
      pluginsStyles.push(
        import(
          /* webpackChunkName: "lightgallery" */ "lightgallery/scss/lg-fullscreen.scss"
        )
      );
    }

    if (LIGHT_GALLERY_PAGER) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import(
            /* webpackChunkName: "lightgallery" */ "lightgallery/plugins/pager/lg-pager.es5.js"
          )
        )
      );
      pluginsStyles.push(
        import(
          /* webpackChunkName: "lightgallery" */ "lightgallery/scss/lg-pager.scss"
        )
      );
    }

    if (LIGHT_GALLERY_ROTATE) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import(
            /* webpackChunkName: "lightgallery" */ "lightgallery/plugins/rotate/lg-rotate.es5.js"
          )
        )
      );
      pluginsStyles.push(
        import(
          /* webpackChunkName: "lightgallery" */ "lightgallery/scss/lg-rotate.scss"
        )
      );
    }

    if (LIGHT_GALLERY_SHARE) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import(
            /* webpackChunkName: "lightgallery" */ "lightgallery/plugins/share/lg-share.es5.js"
          )
        )
      );
      pluginsStyles.push(
        import(
          /* webpackChunkName: "lightgallery" */ "lightgallery/scss/lg-share.scss"
        )
      );
    }

    if (LIGHT_GALLERY_THUMBNAIL) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import(
            /* webpackChunkName: "lightgallery" */ "lightgallery/plugins/thumbnail/lg-thumbnail.es5.js"
          )
        )
      );
      pluginsStyles.push(
        import(
          /* webpackChunkName: "lightgallery" */ "lightgallery/scss/lg-thumbnail.scss"
        )
      );
    }

    if (LIGHT_GALLERY_ZOOM) {
      plugins.push(
        <Promise<LightGalleryPlugin>>(
          import(
            /* webpackChunkName: "lightgallery" */ "lightgallery/plugins/zoom/lg-zoom.es5.js"
          )
        )
      );
      pluginsStyles.push(
        import(
          /* webpackChunkName: "lightgallery" */ "lightgallery/scss/lg-zoom.scss"
        )
      );
    }

    const initLightGallery = async (): Promise<void> => {
      const timeID = (id = new Date().getTime());

      const [lightGalleryPlugins] = await Promise.all([
        Promise.all(plugins),
        Promise.all(pluginsStyles),
        nextTick().then(
          () =>
            new Promise<void>((resolve) =>
              setTimeout(resolve, LIGHT_GALLERY_DELAY)
            )
        ),
      ]);

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
          plugins: lightGalleryPlugins.map(({ default: plugin }) => plugin),
        });

        images.forEach((image, index) => {
          image.addEventListener("click", () => {
            instance?.openGallery(index);
          });
        });
      }
    };

    onMounted(() => {
      void initLightGallery();

      watch(
        () => page.value.path,
        () => initLightGallery()
      );
    });

    onUnmounted(() => instance?.destroy());

    return (): VNode =>
      h(
        "div",
        { ref: container, class: "lightgallery-vuepress" },
        slots["default"]?.()
      );
  },
});
