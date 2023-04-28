import { ClientOnly, usePageLang } from "@vuepress/client";
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
      const langCode = lang.value.toLowerCase().split("-").shift();

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
      return fetch("https://bing-wallpaper.vuejs.press/api/wallpaper").then(
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

    return (): VNode =>
      h(ClientOnly, () =>
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
                    h("span", { class: "bing-location-icon" }),
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
                    bingStorage.value.index ===
                    bingStorage.value.data.length - 1,
                  onClick: () => next(),
                }),
              ]),
            ]
          : null
      );
  },
});
