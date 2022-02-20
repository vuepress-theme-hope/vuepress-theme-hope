import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import { computed, defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import { DropTransition } from "@theme-hope/components/transitions";

import type { VNode } from "vue";
import type { HopeThemeProjectHomePageFrontmatter } from "../../shared";

export default defineComponent({
  name: "HomeHero",

  setup() {
    const frontmatter =
      usePageFrontmatter<HopeThemeProjectHomePageFrontmatter>();
    const siteLocale = useSiteLocaleData();

    const heroImage = computed(() => {
      if (!frontmatter.value.heroImage) return null;

      return withBase(frontmatter.value.heroImage);
    });

    const heroImageDark = computed(() => {
      if (!frontmatter.value.heroImageDark) return null;

      return withBase(frontmatter.value.heroImageDark);
    });

    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) return null;

      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });

    const heroAlt = computed(
      () => frontmatter.value.heroAlt || heroText.value || "hero"
    );

    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) return null;

      return (
        frontmatter.value.tagline ||
        siteLocale.value.description ||
        "Welcome to your VuePress site"
      );
    });

    const actions = computed(() => {
      if (!isArray(frontmatter.value.actions)) return [];

      return frontmatter.value.actions.map(
        ({ text, link, type = "primary" }) => ({
          text,
          link,
          type,
        })
      );
    });

    return (): VNode =>
      h("header", { class: "hero" }, [
        h(DropTransition, { type: "group" }, () => [
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
        h("div", { class: "hero-info" }, [
          heroText.value
            ? h(DropTransition, { delay: 0.04 }, () =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                h("h1", { id: "main-title" }, heroText.value!)
              )
            : null,
          tagline.value
            ? h(DropTransition, { delay: 0.08 }, () =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                h("p", { class: "description" }, tagline.value!)
              )
            : null,
          actions.value.length
            ? h(DropTransition, { delay: 0.12 }, () =>
                h(
                  "p",
                  { class: "actions" },
                  actions.value.map((action) =>
                    h(AutoLink, {
                      class: ["action-button", action.type],
                      config: action,
                    })
                  )
                )
              )
            : null,
        ]),
      ]);
  },
});
