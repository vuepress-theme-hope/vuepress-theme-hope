import type { Slot } from "@vuepress/helper/client";
import { isString } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { withBase } from "vuepress/client";

import AutoLink from "@theme-hope/components/base/AutoLink";
import HeroSlideDownButton from "@theme-hope/components/home/HeroSlideDownButton";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useData } from "@theme-hope/composables/useData";
import type {
  HeroBackgroundSlotData,
  HeroInfoSlotData,
  HeroLogoSlotData,
} from "@theme-hope/typings/slots";

import type { ThemeProjectHomePageFrontmatter } from "../../../shared/index.js";

import "../../styles/home/hero-info.scss";

export type Style = string | Record<string, string>;

export default defineComponent({
  name: "HeroInfo",

  slots: Object as SlotsType<{
    heroInfo?: Slot<HeroInfoSlotData>;
    heroLogo?: Slot<HeroLogoSlotData>;
    heroBg?: Slot<HeroBackgroundSlotData>;
  }>,

  setup(_props, { slots }) {
    const { frontmatter, siteLocale } =
      useData<ThemeProjectHomePageFrontmatter>();

    const info = computed(() => {
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

    const image = computed(() => {
      const { heroImage, heroImageDark, heroAlt, heroImageStyle } =
        frontmatter.value;

      return {
        image: heroImage ? withBase(heroImage) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        style: heroImageStyle ?? null,
        alt: heroAlt ?? "",
      };
    });

    const bg = computed(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;

      return {
        image: isString(bgImage) ? withBase(bgImage) : null,
        imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
        style: bgImageStyle ?? null,
      };
    });

    const actions = computed(() => frontmatter.value.actions ?? []);

    return (): VNode =>
      h(
        "header",
        {
          class: [
            "vp-hero-info-wrapper",
            { "hero-fullscreen": info.value.isFullScreen },
          ],
          style: info.value.style,
        },
        [
          slots.heroBg?.(bg.value) ?? [
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
            slots.heroLogo?.(image.value) ??
              h(DropTransition, { appear: true, group: true }, () => {
                const {
                  image: imageLight,
                  imageDark,
                  style: imageStyle,
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
            slots.heroInfo?.(info.value) ??
              h("div", { class: "vp-hero-infos" }, [
                info.value.text
                  ? h(DropTransition, { appear: true, delay: 0.04 }, () =>
                      h(
                        "h1",
                        { id: "main-title", class: "vp-hero-title" },

                        info.value.text,
                      ),
                    )
                  : null,
                info.value.tagline
                  ? h(DropTransition, { appear: true, delay: 0.08 }, () =>
                      h("div", {
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
  },
});
