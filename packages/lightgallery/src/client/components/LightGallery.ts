import { usePageData } from "@vuepress/client";
import type { GalleryItem } from "lightgallery/lg-utils.js";
import lightGallery from "lightgallery/lightgallery.es5.js";
import type { LightGallery } from "lightgallery/lightgallery.js";
import type { VNode } from "vue";
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
} from "vue";

import { useLightGalleryPlugins } from "@temp/lightgallery/plugins.js";

import { useLightGalleryOptions } from "../helpers/index.js";

import "lightgallery/scss/lightgallery.scss";

declare const IMAGE_SELECTOR: string;
declare const LIGHT_GALLERY_DELAY: number;

const getImages = (images: HTMLImageElement[]): GalleryItem[] =>
  images.map(
    ({ alt, srcset, src }) =>
      <GalleryItem>{
        alt: alt,
        src: src,
        thumb: src || srcset,
        srcset: srcset,
        subHtml: alt,
      },
  );

export default defineComponent({
  name: "LightGallery",

  setup() {
    const lightGalleryOptions = useLightGalleryOptions();
    const page = usePageData();

    const container = shallowRef<HTMLElement>();

    let instance: LightGallery | null = null;
    let id: number;

    const initLightGallery = async (): Promise<void> => {
      const timeID = (id = new Date().getTime());

      const [lightGalleryPlugins] = await Promise.all([
        useLightGalleryPlugins(),
        nextTick().then(
          () =>
            new Promise<void>((resolve) =>
              setTimeout(resolve, LIGHT_GALLERY_DELAY),
            ),
        ),
      ]);

      if (timeID === id) {
        instance?.destroy();

        const images = Array.from(
          document.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR),
        );

        instance = new lightGallery(container.value!, {
          ...lightGalleryOptions,
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
      watch(() => page.value.path, initLightGallery, { immediate: true });
    });

    onUnmounted(() => instance?.destroy());

    return (): VNode =>
      h("div", { ref: container, class: "lightgallery-vuepress" });
  },
});
