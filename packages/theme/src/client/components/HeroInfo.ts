import { isString } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "vuepress/client";

import AutoLink from "@theme-hope/components/AutoLink";
import { HeroSlideDownButton } from "@theme-hope/components/HeroSlideDownButton";
import { DropTransition } from "@theme-hope/components/transitions/index";

import type { ThemeProjectHomePageFrontmatter } from "../../shared/index.js";

import "../styles/hero-info.scss";

export interface HeroInfoData {
  text: string | null;
  tagline: string | null;
  style: string | Record<string, string> | null;
  isFullScreen: boolean;
}

export interface HeroImageData {
  image: string | null;
  imageDark: string | null;
  imageStyle: string | Record<string, string> | undefined;
  alt: string;
}

export interface HeroBackgroundData {
  image: string | null;
  imageDark: string | null;
  style: string | Record<string, string> | undefined;
}

export default defineComponent({
  name: "HeroInfo",

  slots: Object as SlotsType<{
    bg?: (props: HeroBackgroundData) => VNode[] | VNode | null;
    logo?: (props: HeroImageData) => VNode[] | VNode | null;
    info?: (props: HeroInfoData) => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<ThemeProjectHomePageFrontmatter>();
    const siteLocale = useSiteLocaleData();

    const info = computed<HeroInfoData>(() => {
      const {
        heroText,
        tagline,
        heroStyle,
        heroFullScreen = false,
      } = frontmatter.value;

      return {
        text: heroText ?? (siteLocale.value.title || "Hello"),
        tagline: tagline ?? siteLocale.value.description,
        style: heroStyle ?? null,
        isFullScreen: heroFullScreen,
      };
    });

    const image = computed<HeroImageData>(() => {
      const { heroImage, heroImageDark, heroAlt, heroImageStyle } =
        frontmatter.value;

      return {
        image: heroImage ? withBase(heroImage) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        imageStyle: heroImageStyle,
        alt: heroAlt ?? "",
      };
    });

    const bg = computed<HeroBackgroundData>(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;

      return {
        image: isString(bgImage) ? withBase(bgImage) : null,
        imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
        style: bgImageStyle,
      };
    });

    const actions = computed(() => frontmatter.value.actions ?? []);

    return (): VNode => {
      return h(
        "header",
        {
          class: [
            "vp-hero-info-wrapper",
            { "hero-fullscreen": info.value.isFullScreen },
          ],
          style: info.value.style,
        },
        [
          slots.bg?.(bg.value) ?? [
            bg.value.image
              ? h("div", {
                  class: ["vp-hero-mask", { light: bg.value.imageDark }],
                  style: [
                    { "background-image": `url(${bg.value.image})` },
                    bg.value.style,
                  ],
                })
              : null,
            bg.value.imageDark
              ? h("div", {
                  class: "vp-hero-mask dark",
                  style: [
                    {
                      "background-image": `url(${bg.value.imageDark})`,
                    },
                    bg.value.style,
                  ],
                })
              : null,
          ],

          h("div", { class: "vp-hero-info" }, [
            slots.logo?.(image.value) ??
              h(DropTransition, { appear: true, group: true }, () => {
                const {
                  image: imageLight,
                  imageDark,
                  imageStyle,
                  alt,
                } = image.value;

                return [
                  imageLight
                    ? h("img", {
                        key: "light",
                        class: ["vp-hero-image", { light: imageDark }],
                        style: imageStyle,
                        src: imageLight,
                        alt: alt,
                      })
                    : null,
                  imageDark
                    ? h("img", {
                        key: "dark",
                        class: "vp-hero-image dark",
                        style: imageStyle,
                        src: imageDark,
                        alt: alt,
                      })
                    : null,
                ];
              }),
            slots.info?.(info.value) ??
              h("div", { class: "vp-hero-infos" }, [
                info.value.text
                  ? h(DropTransition, { appear: true, delay: 0.04 }, () =>
                      h(
                        "h1",
                        { id: "main-title", class: "vp-hero-title" },
                        info.value.text!,
                      ),
                    )
                  : null,
                info.value.tagline
                  ? h(DropTransition, { appear: true, delay: 0.08 }, () =>
                      h("p", {
                        id: "main-description",
                        innerHTML: info.value.tagline,
                      }),
                    )
                  : null,
                actions.value.length
                  ? h(DropTransition, { appear: true, delay: 0.12 }, () =>
                      h(
                        "p",
                        { class: "vp-hero-actions" },
                        actions.value.map((action) =>
                          h(AutoLink, {
                            class: [
                              "vp-hero-action",
                              action.type ?? "default",
                              "no-external-link-icon",
                            ],
                            config: action,
                          }),
                        ),
                      ),
                    )
                  : null,
              ]),
          ]),

          info.value.isFullScreen
            ? h(HeroSlideDownButton, {
                onClick: () =>
                  window.scrollTo({
                    top:
                      window.innerHeight -
                      (document.querySelector("[vp-navbar]")?.clientHeight ??
                        0),
                    behavior: "smooth",
                  }),
              })
            : null,
        ],
      );
    };
  },
});
