import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "@vuepress/client";
import { isString } from "@vuepress/shared";
import {
  type SlotsType,
  type VNode,
  computed,
  defineComponent,
  h,
  shallowRef,
} from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition";

import { SlideDownIcon } from "./icons/icons.js";
import { type ThemeBlogHomePageFrontmatter } from "../../../../shared/index.js";
import defaultHeroBgImagePath from "../assets/hero.jpg";

import "../styles/blog-hero.scss";

export interface HeroInfo {
  text: string | null;
  image: string | null;
  imageDark: string | null;
  heroStyle: string | Record<string, string> | undefined;
  alt: string;
  tagline: string | null;
  isFullScreen: boolean;
}

export interface BackgroundInfo {
  image: string | null;
  bgStyle: string | Record<string, string> | undefined;
  isFullScreen: boolean;
}

export default defineComponent({
  name: "BlogHero",

  slots: Object as SlotsType<{
    heroBg?: (props: BackgroundInfo) => VNode | VNode[];
    heroInfo?: (props: HeroInfo) => VNode | VNode[];
  }>,

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();
    const siteLocale = useSiteLocaleData();

    const hero = shallowRef<HTMLElement>();

    const isFullScreen = computed(
      () => frontmatter.value.heroFullScreen ?? false
    );

    const heroInfo = computed(() => {
      const {
        heroText,
        heroImage,
        heroImageDark,
        heroAlt,
        heroImageStyle,
        tagline,
      } = frontmatter.value;

      return {
        text: heroText ?? siteLocale.value.title ?? "Hello",
        image: heroImage ? withBase(heroImage) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        heroStyle: heroImageStyle,
        alt: heroAlt || heroText || "hero image",
        tagline: tagline ?? "",
        isFullScreen: isFullScreen.value,
      };
    });

    const bgInfo = computed(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;

      return {
        image: isString(bgImage)
          ? withBase(bgImage)
          : bgImage === false
          ? null
          : defaultHeroBgImagePath,
        imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
        bgStyle: bgImageStyle,
        isFullScreen: isFullScreen.value,
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
                "vp-blog-hero",
                {
                  fullscreen: isFullScreen.value,
                  "no-bg": !bgInfo.value.image,
                },
              ],
            },
            [
              slots.heroBg?.(bgInfo.value) || [
                bgInfo.value.image
                  ? h("div", {
                      class: [
                        "vp-blog-mask",
                        { light: bgInfo.value.imageDark },
                      ],
                      style: [
                        {
                          background: `url(${bgInfo.value.image}) center/cover no-repeat`,
                        },
                        bgInfo.value.bgStyle,
                      ],
                    })
                  : null,
                bgInfo.value.imageDark
                  ? h("div", {
                      class: "vp-blog-mask dark",
                      style: [
                        {
                          background: `url(${bgInfo.value.imageDark}) center/cover no-repeat`,
                        },
                        bgInfo.value.bgStyle,
                      ],
                    })
                  : null,
              ],
              slots.heroInfo?.(heroInfo.value) || [
                h(
                  DropTransition,
                  { appear: true, type: "group", delay: 0.04 },
                  () => [
                    heroInfo.value.image
                      ? h("img", {
                          key: "light",
                          class: [
                            "vp-blog-hero-image",
                            { light: heroInfo.value.imageDark },
                          ],
                          style: heroInfo.value.heroStyle,
                          src: heroInfo.value.image,
                          alt: heroInfo.value.alt,
                        })
                      : null,
                    heroInfo.value.imageDark
                      ? h("img", {
                          key: "dark",
                          class: "vp-blog-hero-image dark",
                          style: heroInfo.value.heroStyle,
                          src: heroInfo.value.imageDark,
                          alt: heroInfo.value.alt,
                        })
                      : null,
                  ]
                ),
                h(DropTransition, { appear: true, delay: 0.08 }, () =>
                  heroInfo.value.text
                    ? h(
                        "h1",
                        { class: "vp-blog-hero-title" },
                        heroInfo.value.text
                      )
                    : null
                ),
                h(DropTransition, { appear: true, delay: 0.12 }, () =>
                  heroInfo.value.tagline
                    ? h("p", {
                        class: "vp-blog-hero-description",
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
