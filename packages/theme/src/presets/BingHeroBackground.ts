import { usePageLang } from "@vuepress/client";
import { useStorage } from "@vueuse/core";
import { type VNode, computed, defineComponent, h, onMounted } from "vue";

import "./bing-hero-background.scss";

interface BingWallpaperInfo {
  url: string;
  wallpaper: string;
  downloadable: boolean;
  locales: Record<
    string,
    {
      title: string;
      description: string;
      headline: string;
      copyright: string;
      backstage: string;
      quickFact: string;
    }
  >;
}
const bingStorage = useStorage<{
  index: number;
  data: BingWallpaperInfo[];
}>("bing-image", {
  index: 0,
  data: [],
});

const LOCATION_SVG =
  '<svg aria-hidden="true" viewBox="0 0 12 12"><path d="M6.5 3A1.5 1.5 0 1 0 8 4.5 1.5 1.5 0 0 0 6.5 3zm0-3A4.5 4.5 0 0 0 2 4.5a5.607 5.607 0 0 0 .087.873c.453 2.892 2.951 5.579 3.706 6.334a1 1 0 0 0 1.414 0c.755-.755 3.253-3.442 3.706-6.334A5.549 5.549 0 0 0 11 4.5 4.5 4.5 0 0 0 6.5 0zm3.425 5.218C9.565 7.514 7.632 9.868 6.5 11 5.369 9.868 3.435 7.514 3.075 5.218A4.694 4.694 0 0 1 3 4.5a3.5 3.5 0 0 1 7 0 4.634 4.634 0 0 1-.075.718z"/></svg>';

export default defineComponent({
  name: "BingHeroBackground",

  // TODO: Add download button, image description and copyright information
  // props: {
  //   download: Boolean,
  // },

  setup() {
    const lang = usePageLang();

    const currentWallpaper = computed(() => {
      const info = bingStorage.value.data[bingStorage.value.index];
      const langCode = lang.value.toLowerCase().split("-").pop();

      if (info) {
        const { url, wallpaper, downloadable, locales } = info;

        return {
          url,
          wallpaper,
          downloadable,
          ...(locales[langCode!] ?? locales["en"]),
        };
      }

      return null;
    });

    const getImage = (): Promise<BingWallpaperInfo[]> => {
      return fetch("//bing-wallpaper.vuejs.press/api/wallpaper").then(
        (response) => <Promise<BingWallpaperInfo[]>>response.json()
      );
    };

    const prev = (): void => {
      bingStorage.value.index--;
    };

    const next = (): void => {
      bingStorage.value.index++;
    };

    onMounted(() => {
      void getImage().then((res) => {
        bingStorage.value.data = res;
      });
    });

    return (): VNode[] | null =>
      currentWallpaper.value
        ? [
            h("div", {
              class: "mask",
              style: {
                background: `url(${currentWallpaper.value.url}) center/cover no-repeat`,
              },
            }),
            h("div", { class: "bing-switch" }, [
              h(
                "a",
                {
                  class: "bing-info",
                  href: currentWallpaper.value.backstage,
                  target: "_blank",
                },
                [
                  h("span", {
                    class: "bing-location-icon",
                    innerHTML: LOCATION_SVG,
                  }),
                  currentWallpaper.value.title,
                ]
              ),
              h("button", {
                class: "bing-switch-left",
                disabled: bingStorage.value.index === 0,
                onClick: () => prev(),
              }),
              h("button", {
                class: "bing-switch-right",
                disabled:
                  bingStorage.value.index === bingStorage.value.data.length - 1,
                onClick: () => next(),
              }),
            ]),
          ]
        : null;
  },
});
