import {
  usePageFrontmatter,
  usePageHeadTitle,
  withBase,
} from "@vuepress/client";
import { isString } from "@vuepress/shared";
import { type VNode, computed, defineComponent, h, ref } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition";

import { SlideDownIcon } from "./icons/icons.js";
import { type ThemeBlogHomePageFrontmatter } from "../../../../shared/index.js";
import defaultHeroBgImagePath from "../assets/hero.jpg";

import "../styles/blog-hero.scss";

export default defineComponent({
  name: "BlogHero",

  setup(_props, { slots }) {
    const title = usePageHeadTitle();
    const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();

    const hero = ref<HTMLElement>();

    const heroInfo = computed(() => {
      const {
        heroText,
        heroImage,
        heroImageDark,
        heroAlt,
        heroFullScreen,
        heroImageStyle,
        tagline = null,
        bgImage,
        bgImageStyle,
      } = frontmatter.value;

      return {
        text: heroText === false ? null : heroText || title.value,
        image: heroImage ? withBase(heroImage) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        imageStyle: heroImageStyle,
        alt: heroAlt || "hero image",
        tagline,
        bgImage: isString(bgImage)
          ? withBase(bgImage)
          : bgImage === false
          ? null
          : defaultHeroBgImagePath,
        bgImageStyle,
        isFullScreen: heroFullScreen || false,
      };
    });

    return (): VNode | null =>
      frontmatter.value.hero === false
        ? null
        : h(
            "div",
            {
              ref: hero,
              class: [
                "blog-hero",
                {
                  fullscreen: heroInfo.value.isFullScreen,
                  "no-bg": !heroInfo.value.bgImage,
                },
              ],
            },
            [
              slots["heroBg"]?.() ||
                (heroInfo.value.bgImage
                  ? h("div", {
                      class: "mask",
                      style: [
                        {
                          background: `url(${heroInfo.value.bgImage}) center/cover no-repeat`,
                        },
                        heroInfo.value.bgImageStyle,
                      ],
                    })
                  : null),
              slots["heroInfo"]?.(heroInfo.value) || [
                h(
                  DropTransition,
                  { appear: true, type: "group", delay: 0.04 },
                  () => [
                    heroInfo.value.image
                      ? h("img", {
                          class: [
                            "hero-image",
                            { light: heroInfo.value.imageDark },
                          ],
                          style: heroInfo.value.imageStyle,
                          src: heroInfo.value.image,
                          alt: heroInfo.value.alt,
                        })
                      : null,
                    heroInfo.value.imageDark
                      ? h("img", {
                          key: "dark",
                          class: "hero-image dark",
                          style: heroInfo.value.imageStyle,
                          src: heroInfo.value.imageDark,
                          alt: heroInfo.value.alt,
                        })
                      : null,
                  ]
                ),
                h(DropTransition, { appear: true, delay: 0.08 }, () =>
                  heroInfo.value.text ? h("h1", heroInfo.value.text) : null
                ),
                h(DropTransition, { appear: true, delay: 0.12 }, () =>
                  heroInfo.value.tagline
                    ? h("p", {
                        class: "description",
                        innerHTML: heroInfo.value.tagline,
                      })
                    : null
                ),
              ],
              heroInfo.value.isFullScreen
                ? h(
                    "button",
                    {
                      type: "button",
                      class: "slide-down-button",
                      onClick: () => {
                        window.scrollTo({
                          top: hero.value!.clientHeight,
                          behavior: "smooth",
                        });
                      },
                    },
                    [h(SlideDownIcon), h(SlideDownIcon)]
                  )
                : null,
            ]
          );
  },
});
