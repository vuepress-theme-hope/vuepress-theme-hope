import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import { computed, defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import DropTransition from "@theme-hope/components/transitions/DropTransition";

import type { VNode } from "vue";
import type { HopeThemeProjectHomePageFrontmatter } from "../../shared";

export default defineComponent({
  name: "HomeHero",

  setup(_props, { slots }) {
    const frontmatter =
      usePageFrontmatter<HopeThemeProjectHomePageFrontmatter>();
    const siteLocale = useSiteLocaleData();

    const heroText = computed(() => {
      if (frontmatter.value.heroText === false) return false;

      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });

    const tagline = computed(() => {
      if (frontmatter.value.tagline === false) return false;

      return (
        frontmatter.value.tagline ||
        siteLocale.value.description ||
        "Welcome to your VuePress site"
      );
    });

    const heroImage = computed(() => {
      if (!frontmatter.value.heroImage) return null;

      return withBase(frontmatter.value.heroImage);
    });

    const heroImageDark = computed(() => {
      if (!frontmatter.value.heroImageDark) return null;

      return withBase(frontmatter.value.heroImageDark);
    });

    const heroAlt = computed(
      () => frontmatter.value.heroAlt || heroText.value || "hero"
    );

    const actions = computed(() =>
      isArray(frontmatter.value.actions) ? frontmatter.value.actions : []
    );

    return (): VNode =>
      h("header", { class: "hero" }, [
        slots["heroImage"]?.() ||
          h(DropTransition, { appear: true, type: "group" }, () => [
            heroImage.value
              ? h("img", {
                  key: "light",
                  class: { light: heroImageDark.value },
                  src: heroImage.value,
                  alt: heroAlt,
                })
              : null,
            heroImageDark.value
              ? h("img", {
                  key: "dark",
                  class: "dark",
                  src: heroImageDark.value,
                  alt: heroAlt,
                })
              : null,
          ]),
        slots["heroInfo"]?.() ||
          h("div", { class: "hero-info" }, [
            heroText.value
              ? h(DropTransition, { appear: true, delay: 0.04 }, () =>
                  h("h1", { id: "main-title" }, heroText.value as string)
                )
              : null,
            tagline.value
              ? h(DropTransition, { appear: true, delay: 0.08 }, () =>
                  h("p", { class: "description" }, tagline.value as string)
                )
              : null,
            actions.value.length
              ? h(DropTransition, { appear: true, delay: 0.12 }, () =>
                  h(
                    "p",
                    { class: "actions" },
                    actions.value.map((action) =>
                      h(AutoLink, {
                        class: ["action-button", action.type || "default"],
                        config: action,
                        externalLinkIcon: false,
                      })
                    )
                  )
                )
              : null,
          ]),
      ]);
  },
});
