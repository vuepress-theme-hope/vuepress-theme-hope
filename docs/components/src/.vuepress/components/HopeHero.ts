import { usePageFrontmatter, useSiteLocaleData } from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import { computed, defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import { DropTransition } from "@theme-hope/components/transitions";
import HopeLogo from "./HopeLogo";

import type { VNode } from "vue";
import type { HopeThemeProjectHomePageFrontmatter } from "vuepress-theme-hope";

export default defineComponent({
  name: "HopeHero",

  setup() {
    const frontmatter =
      usePageFrontmatter<HopeThemeProjectHomePageFrontmatter>();
    const siteLocale = useSiteLocaleData();

    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) return null;

      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });

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
        h(HopeLogo),
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
