import {
  usePageFrontmatter,
  usePageHeadTitle,
  withBase,
} from "@vuepress/client";
import { type VNode, computed, defineComponent, h, ref } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition";

import { SlideDownIcon } from "./icons/icons.js";
import { type ThemeBlogHomePageFrontmatter } from "../../../../shared/index.js";
import defaultHeroBgImagePath from "../assets/hero.jpg";

import "../styles/blog-hero.scss";

export default defineComponent({
  name: "BlogHero",

  setup() {
    const title = usePageHeadTitle();
    const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();

    const hero = ref<HTMLElement>();
    const heroImage = computed(() => frontmatter.value.heroImage || null);

    const isFullScreen = computed(
      () => frontmatter.value.heroFullScreen || false
    );

    const bgImage = computed(() =>
      frontmatter.value.bgImage
        ? withBase(frontmatter.value.bgImage)
        : frontmatter.value.bgImage ?? defaultHeroBgImagePath
    );

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
                  fullscreen: isFullScreen.value,
                  "no-bg": !bgImage.value,
                },
              ],
            },
            [
              bgImage.value
                ? h("div", {
                    class: "mask",
                    style: {
                      background: `url(${bgImage.value}) center/cover no-repeat`,
                      ...frontmatter.value.bgImageStyle,
                    },
                  })
                : null,
              h(DropTransition, { appear: true, delay: 0.04 }, () =>
                heroImage.value
                  ? h("img", {
                      class: "hero-image",
                      style: frontmatter.value.heroImageStyle,
                      src: withBase(heroImage.value),
                      alt: frontmatter.value.heroAlt || "hero image",
                    })
                  : null
              ),
              h(DropTransition, { appear: true, delay: 0.08 }, () =>
                frontmatter.value.heroText === false
                  ? null
                  : h("h1", frontmatter.value.heroText || title.value)
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
          );
  },
});
