import { onClickOutside, useStorage } from "@vueuse/core";
import type { VNode } from "vue";
import {
  Transition,
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
} from "vue";
import { ClientOnly, usePageLang } from "vuepress/client";

import "@vuepress/helper/transition/fade-in.css";
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

  /*
   * TODO: Add download button
   * props: {
   *   download: Boolean,
   * },
   */

  setup() {
    const lang = usePageLang();
    const bingInfo = shallowRef<HTMLElement>();
    const showInfo = ref(false);

    const currentWallpaper = computed(() => {
      const { index, data } = bingStorage.value;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const langCode = lang.value.toLowerCase().split("-").shift()!;

      if (data[index]) {
        const { url, wallpaper, downloadable, locales } = data[index];

        return {
          url,
          wallpaper,
          downloadable,
          ...(locales[langCode] ?? locales.en),
        };
      }

      return null;
    });

    const getImage = (): Promise<BingWallpaperInfo[]> =>
      fetch("https://bing-wallpaper.vuejs.press/api/wallpaper").then(
        (response) => response.json() as Promise<BingWallpaperInfo[]>,
      );

    const prev = (): void => {
      bingStorage.value.index -= 1;
    };

    const next = (): void => {
      bingStorage.value.index += 1;
    };

    onClickOutside(bingInfo, () => {
      showInfo.value = false;
    });

    onMounted(() => {
      void getImage().then((res) => {
        bingStorage.value.data = res;
      });
    });

    return (): VNode => {
      const { title, headline, url, backstage, quickFact, copyright } =
        currentWallpaper.value ?? {};

      return h(ClientOnly, () =>
        url
          ? [
              h("div", {
                class: "vp-blog-mask",
                style: {
                  background: `url(${url}) center/cover no-repeat`,
                },
              }),
              h(
                "div",
                {
                  class: "bing-switch",
                  onClick: () => {
                    showInfo.value = true;
                  },
                },
                [
                  h(Transition, { name: "fade-in" }, () =>
                    showInfo.value
                      ? h("div", { class: "bing-info", ref: bingInfo }, [
                          h(
                            "a",
                            {
                              href: backstage,
                              target: "_blank",
                              class: "bing-info-header",
                            },
                            headline,
                          ),
                          h("hr"),
                          h("div", { class: "bing-info-body" }, quickFact),
                          h("div", { class: "bing-info-copyright" }, copyright),
                        ])
                      : null,
                  ),
                  h("div", { class: "bing-location" }, [
                    h("span", { class: "bing-location-icon" }),
                    title,
                  ]),

                  h("button", {
                    class: "bing-switch-prev",
                    title: "prev image",
                    type: "button",
                    disabled: bingStorage.value.index === 0,
                    onClick: () => {
                      prev();
                    },
                  }),
                  h("button", {
                    class: "bing-switch-next",
                    title: "next image",
                    type: "button",
                    disabled:
                      bingStorage.value.index ===
                      bingStorage.value.data.length - 1,
                    onClick: () => {
                      next();
                    },
                  }),
                ],
              ),
            ]
          : null,
      );
    };
  },
});
