/* global IMAGE_CONTAINER, IMAGE_SELECTOR, PHOTOSWIPE_OPTIONS */
import { defineComponent, onMounted } from "@vue/composition-api";
import PhotoSwipe from "photoswipe";
import PhotoSwipeUIDefault from "photoswipe/dist/photoswipe-ui-default";

export default defineComponent({
  name: "PhotoSwipeUI",

  setup() {
    let images: NodeListOf<HTMLImageElement>;

    const getImageInfo = (
      image: HTMLImageElement
    ): PhotoSwipe.Item & { title: string } => ({
      src: image.src,
      // eslint-disable-next-line id-length
      w: image.naturalWidth,
      h: image.naturalHeight,
      title: image.alt,
    });

    const getImages = (): Promise<PhotoSwipe.Item[]> => {
      const promises: Promise<PhotoSwipe.Item & { title: string }>[] = [];

      images = document.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR);

      images.forEach((image, index) => {
        promises[index] = new Promise((resolve, reject) => {
          if (image.complete) resolve(getImageInfo(image));
          else {
            image.onload = (): void => resolve(getImageInfo(image));
            image.onerror = (err): void => reject(err);
          }
        });
      });

      return Promise.all(promises);
    };

    const photoswipe = (): void => {
      const pswp = document.querySelector(".pswp") as HTMLElement;

      void getImages().then((imageConfig) => {
        images.forEach((image, index) => {
          image.onclick = (): void => {
            const gallery = new PhotoSwipe(
              pswp,
              PhotoSwipeUIDefault,
              imageConfig,
              {
                ...PHOTOSWIPE_OPTIONS,
                index,
              }
            );
            gallery.init();
          };
        });
      });
    };

    onMounted(() => {
      const timer = setInterval(() => {
        const content = document.querySelector<HTMLElement>(IMAGE_CONTAINER);
        if (content) {
          photoswipe();
          clearInterval(timer);
        }
      }, 200);
    });

    return { photoswipe };
  },

  watch: {
    $route(): void {
      const timer = setInterval(() => {
        const content = document.querySelector<HTMLElement>(IMAGE_CONTAINER);
        if (content) {
          this.photoswipe();
          clearInterval(timer);
        }
      }, 200);
    },
  },
});
