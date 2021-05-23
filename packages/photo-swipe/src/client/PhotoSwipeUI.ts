import Vue from "vue";
import PhotoSwipe from "photoswipe";

let images: NodeListOf<HTMLImageElement>;
const i18n = PHOTOSWIPE_I18N;

export default Vue.extend({
  name: "PhotoSwipeUI",

  data: () => ({ i18n }),

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

  mounted(): void {
    const timer = setInterval(() => {
      const content = document.querySelector<HTMLElement>(IMAGE_CONTAINER);
      if (content) {
        this.photoswipe();
        clearInterval(timer);
      }
    }, 200);
  },

  methods: {
    photoswipe(): void {
      const pswp = document.querySelector(".pswp") as HTMLElement;

      void Promise.all([
        import(/* webpackChunkName: "photo-swipe" */ "photoswipe"),
        import(
          /* webpackChunkName: "photo-swipe" */ "photoswipe/dist/photoswipe-ui-default"
        ),
      ]).then(([photoSwipe, photoSwipeUIDefault]) => {
        void this.getImages().then((imageConfig) => {
          images.forEach((image, index) => {
            image.onclick = (): void => {
              const gallery = new photoSwipe.default(
                pswp,
                photoSwipeUIDefault.default,
                imageConfig,
                {
                  shareButtons: i18n[this.$localePath || "/"].buttons,
                  ...PHOTOSWIPE_OPTIONS,
                  index,
                }
              );
              gallery.init();
            };
          });
        });
      });
    },

    getImageInfo(image: HTMLImageElement): PhotoSwipe.Item & { title: string } {
      return {
        src: image.src,
        // eslint-disable-next-line id-length
        w: image.naturalWidth,
        h: image.naturalHeight,
        title: image.alt,
      };
    },

    getImages(): Promise<PhotoSwipe.Item[]> {
      const promises: Promise<PhotoSwipe.Item & { title: string }>[] = [];
      images = document.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR);

      images.forEach((image, index) => {
        promises[index] = new Promise((resolve, reject) => {
          if (image.complete) resolve(this.getImageInfo(image));
          else {
            image.onload = (): void => resolve(this.getImageInfo(image));
            image.onerror = (err): void => reject(err);
          }
        });
      });

      return Promise.all(promises);
    },
  },
});
