import {
  usePageFrontmatter,
  usePageHeadTitle,
  withBase,
} from "@vuepress/client";
import { computed, defineComponent, h, ref } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import defaultHeroBgImagePath from "../assets/hero.jpg";

import type { VNode } from "vue";
import type { HopeThemeBlogHomePageFrontmatter } from "../../../../shared";

import "../styles/blog-hero.scss";
import { SlideDownIcon } from "./icons";

export default defineComponent({
  name: "BlogHero",

  setup(_props, { slots }) {
    const title = usePageHeadTitle();
    const frontmatter = usePageFrontmatter<HopeThemeBlogHomePageFrontmatter>();

    const hero = ref<HTMLElement | null>(null);
    const heroImage = computed(() => frontmatter.value.heroImage || null);

    const isFullScreen = computed(
      () => frontmatter.value.heroFullScreen || false
    );

    const heroImageStyle = computed(() => {
      const defaultStyle = {
        maxHeight: "180px",
        margin:
          frontmatter.value.heroText === false
            ? "6rem auto 1.5rem"
            : "1rem auto",
      };

      return {
        ...defaultStyle,
        ...frontmatter.value.heroImageStyle,
      };
    });

    const bgImage = computed(() =>
      frontmatter.value.bgImage
        ? withBase(frontmatter.value.bgImage)
        : frontmatter.value.bgImage ?? defaultHeroBgImagePath
    );

    const bgImageStyle = computed(() => {
      const defaultStyle = {
        height: "350px",
        textAlign: "center",
        overflow: "hidden",
      };

      return {
        ...defaultStyle,
        ...frontmatter.value.bgImageStyle,
      };
    });

    return (): VNode | null =>
      frontmatter.value.hero !== false
        ? h(
            "div",
            {
              ref: hero,
              class: ["blog-hero", { fullscreen: isFullScreen.value }],
              style: bgImageStyle.value,
            },
            [
              bgImage.value
                ? h("div", {
                    class: "mask",
                    style: {
                      background: `url(${bgImage.value}) center/cover no-repeat`,
                    },
                  })
                : null,
              slots["heroImage"]?.() ||
                h(DropTransition, { appear: true, delay: 0.04 }, () =>
                  heroImage.value
                    ? h("img", {
                        class: "hero-image",
                        style: heroImageStyle.value,
                        src: withBase(heroImage.value),
                        alt: frontmatter.value.heroAlt || "hero image",
                      })
                    : null
                ),
              h(DropTransition, { appear: true, delay: 0.08 }, () =>
                frontmatter.value.heroText !== false
                  ? h("h1", frontmatter.value.heroText || title.value)
                  : null
              ),
              h(DropTransition, { appear: true, delay: 0.12 }, () =>
                frontmatter.value.tagline
                  ? h("p", {
                      class: "description",
                      innerHTML: frontmatter.value.tagline,
                    })
                  : null
              ),
              isFullScreen.value
                ? h(
                    "button",
                    {
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
          )
        : null;
  },
});
