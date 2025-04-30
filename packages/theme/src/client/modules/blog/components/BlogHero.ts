import { isString } from "@vuepress/helper/client";
import type { CSSProperties, SlotsType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { withBase } from "vuepress/client";

import { HeroSlideDownButton } from "@theme-hope/components/HeroSlideDownButton";
import { DropTransition } from "@theme-hope/components/transitions/index";
import { useData } from "@theme-hope/composables/index";

import type { ThemeBlogHomePageFrontmatter } from "../../../../shared/index.js";

import "../styles/blog-hero.scss";

export interface HeroInfoData {
  text: string;
  tagline: string | null;
  image: string | null;
  imageDark: string | null;
  alt: string;
  imageStyle: string | CSSProperties | undefined;
}

export interface HeroBackgroundData {
  image: string | null;
  bgStyle: string | CSSProperties | undefined;
}

const DEFAULT_HERO = "//theme-hope-assets.vuejs.press/hero/default.jpg";

export default defineComponent({
  name: "BlogHero",

  slots: Object as SlotsType<{
    bg?: (props: HeroBackgroundData) => VNode[] | VNode | null;
    info?: (props: HeroInfoData) => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const { frontmatter, siteLocale } = useData<ThemeBlogHomePageFrontmatter>();

    const info = computed(() => {
      const {
        heroText,
        heroImage,
        heroImageDark,
        heroAlt,
        heroImageStyle,
        tagline,
      } = frontmatter.value;

      return {
        text: heroText ?? (siteLocale.value.title || "Hello"),
        tagline: tagline ?? "",
        image: heroImage ? withBase(heroImage) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        alt: heroAlt ?? "",
        imageStyle: heroImageStyle,
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
        bgStyle: bgImageStyle,
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
              slots.bg?.(bg.value) ?? [
                bg.value.image
                  ? h("div", {
                      class: ["vp-blog-mask", { light: bg.value.imageDark }],
                      style: [
                        {
                          background: `url(${bg.value.image}) center/cover no-repeat`,
                        },
                        bg.value.bgStyle,
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
                        bg.value.bgStyle,
                      ],
                    })
                  : null,
              ],
              slots.info?.(info.value) ?? [
                h(
                  DropTransition,
                  { appear: true, group: true, delay: 0.04 },
                  () => {
                    const { image, imageDark, imageStyle, alt } = info.value;

                    return [
                      image
                        ? h("img", {
                            key: "light",
                            class: ["vp-blog-hero-image", { light: imageDark }],
                            style: imageStyle,
                            src: image,
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
                h(DropTransition, { appear: true, delay: 0.08 }, () =>
                  info.value.text
                    ? h("h1", { class: "vp-blog-hero-title" }, info.value.text)
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
              ],
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
