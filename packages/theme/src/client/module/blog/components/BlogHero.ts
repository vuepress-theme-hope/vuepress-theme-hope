import {
  usePageFrontmatter,
  usePageHeadTitle,
  withBase,
} from "@vuepress/client";
import { computed, defineComponent, h } from "vue";

import { DropTransition } from "@theme-hope/components/transitions";
import defaultHeroImagePath from "../assets/hero.jpg";

import type { VNode } from "vue";
import type { HopeThemeBlogHomePageFrontmatter } from "../../../../shared";

import "../styles/blog-hero.scss";
import { SlideDownIcon } from "./icons";

export default defineComponent({
  name: "BlogHero",

  setup() {
    const title = usePageHeadTitle();
    const frontmatter = usePageFrontmatter<HopeThemeBlogHomePageFrontmatter>();

    const heroImage = computed(() => frontmatter.value.heroImage || null);

    const isFullScreen = computed(
      () => frontmatter.value.heroFullScreen || false
    );

    const heroImageStyle = computed(() => {
      const defaultStyle = {
        maxHeight: "180px",
        margin:
          frontmatter.value.showTitle === false
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
        : defaultHeroImagePath
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
              class: ["blog-hero", { fullscreen: isFullScreen.value }],
              style: bgImageStyle.value,
            },
            [
              h("div", {
                class: "mask",
                style: {
                  background: `url(${bgImage.value}) center/cover no-repeat`,
                },
              }),
              h(DropTransition, { delay: 0.04 }, () =>
                heroImage.value
                  ? h("img", {
                      class: "hero-logo",
                      style: heroImageStyle.value,
                      src: withBase(heroImage.value),
                      alt: frontmatter.value.heroAlt || "hero image",
                    })
                  : null
              ),
              h(DropTransition, { delay: 0.08 }, () =>
                frontmatter.value.showTitle !== false
                  ? h("h1", frontmatter.value.heroText || title.value)
                  : null
              ),
              h(DropTransition, { delay: 0.12 }, () =>
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
                          top:
                            window.innerHeight -
                            (document.querySelector(".navbar")?.clientHeight ||
                              0),
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
