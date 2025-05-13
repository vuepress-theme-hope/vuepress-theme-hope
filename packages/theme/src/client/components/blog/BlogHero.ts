import type { Slot } from "@vuepress/helper/client";
import { isString } from "@vuepress/helper/client";
import type { SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { withBase } from "vuepress/client";

import HeroSlideDownButton from "@theme-hope/components/home/HeroSlideDownButton";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useData } from "@theme-hope/composables/useData";
import type {
  HeroBackgroundSlotData,
  HeroInfoSlotData,
  HeroLogoSlotData,
} from "@theme-hope/typings/slots";

import type { ThemeBlogHomePageFrontmatter } from "../../../shared/index.js";

import "../../styles/blog/blog-hero.scss";

const DEFAULT_HERO = "//theme-hope-assets.vuejs.press/hero/default.jpg";

export default defineComponent({
  name: "BlogHero",

  slots: Object as SlotsType<{
    heroInfo?: Slot<HeroInfoSlotData>;
    heroLogo?: Slot<HeroLogoSlotData>;
    heroBg?: Slot<HeroBackgroundSlotData>;
  }>,

  setup(_props, { slots }) {
    const { frontmatter, siteLocale } = useData<ThemeBlogHomePageFrontmatter>();

    const info = computed(() => {
      const {
        heroText,
        heroStyle,
        tagline,
        heroFullScreen = false,
      } = frontmatter.value;

      return {
        text: heroText ?? (siteLocale.value.title || "Hello"),
        tagline: tagline ?? "",
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
        image: isString(bgImage)
          ? withBase(bgImage)
          : bgImage === false
            ? null
            : DEFAULT_HERO,
        imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
        style: bgImageStyle ?? null,
      };
    });

    return (): VNode | null =>
      frontmatter.value.hero === false
        ? null
        : h(
            "div",
            {
              class: [
                "vp-blog-hero",
                {
                  "hero-fullscreen": frontmatter.value.heroFullScreen,
                  "no-bg": !bg.value.image,
                },
              ],
            },
            [
              slots.heroBg?.(bg.value) ?? [
                bg.value.image
                  ? h("div", {
                      class: ["vp-blog-mask", { light: bg.value.imageDark }],
                      style: [
                        {
                          background: `url(${bg.value.image}) center/cover no-repeat`,
                        },
                        bg.value.style,
                      ],
                    })
                  : null,
                bg.value.imageDark
                  ? h("div", {
                      class: "vp-blog-mask dark",
                      style: [
                        {
                          background: `url(${bg.value.imageDark}) center/cover no-repeat`,
                        },
                        bg.value.style,
                      ],
                    })
                  : null,
              ],
              slots.heroLogo?.(image.value) ??
                h(
                  DropTransition,
                  { appear: true, group: true, delay: 0.04 },
                  () => {
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
                            class: ["vp-blog-hero-image", { light: imageDark }],
                            style: imageStyle,
                            src: imageLight,
                            alt: alt,
                          })
                        : null,
                      imageDark
                        ? h("img", {
                            key: "dark",
                            class: "vp-blog-hero-image dark",
                            style: imageStyle,
                            src: imageDark,
                            alt: alt,
                          })
                        : null,
                    ];
                  },
                ),
              slots.heroInfo?.(info.value) ??
                h("div", { class: "vp-blog-hero-info" }, [
                  h(DropTransition, { appear: true, delay: 0.08 }, () =>
                    info.value.text
                      ? h(
                          "h1",
                          { class: "vp-blog-hero-title" },
                          info.value.text,
                        )
                      : null,
                  ),
                  h(DropTransition, { appear: true, delay: 0.12 }, () =>
                    info.value.tagline
                      ? h("div", {
                          class: "vp-blog-hero-description",
                          innerHTML: info.value.tagline,
                        })
                      : null,
                  ),
                ]),
              frontmatter.value.heroFullScreen
                ? h(HeroSlideDownButton, {
                    onClick: () =>
                      window.scrollTo({
                        top:
                          window.innerHeight -
                          (document.querySelector("[vp-navbar]")
                            ?.clientHeight ?? 0),
                        behavior: "smooth",
                      }),
                  })
                : null,
            ],
          );
  },
});
