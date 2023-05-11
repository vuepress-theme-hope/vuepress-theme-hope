import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "@vuepress/client";
import { type SlotsType, type VNode, computed, defineComponent, h } from "vue";

import AutoLink from "@theme-hope/components/AutoLink";
import DropTransition from "@theme-hope/components/transitions/DropTransition";

import { type ThemeProjectHomePageFrontmatter } from "../../shared/index.js";

import "../styles/hero-info.scss";

export default defineComponent({
  name: "HeroInfo",

  slots: Object as SlotsType<{
    heroImage?: () => VNode | VNode[];
    heroInfo?: () => VNode | VNode[];
  }>,

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<ThemeProjectHomePageFrontmatter>();
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

    const actions = computed(() => frontmatter.value.actions ?? []);

    return (): VNode =>
      h("header", { class: "hero-info-wrapper" }, [
        slots.heroImage?.() ||
          h(DropTransition, { appear: true, type: "group" }, () => [
            heroImage.value
              ? h("img", {
                  key: "light",
                  class: { light: heroImageDark.value },
                  src: heroImage.value,
                  alt: heroAlt.value,
                })
              : null,
            heroImageDark.value
              ? h("img", {
                  key: "dark",
                  class: "dark",
                  src: heroImageDark.value,
                  alt: heroAlt.value,
                })
              : null,
          ]),
        slots.heroInfo?.() ??
          h("div", { class: "hero-info" }, [
            heroText.value
              ? h(DropTransition, { appear: true, delay: 0.04 }, () =>
                  h("h1", { id: "main-title" }, <string>heroText.value)
                )
              : null,
            tagline.value
              ? h(DropTransition, { appear: true, delay: 0.08 }, () =>
                  h("p", { class: "description" }, <string>tagline.value)
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
                        noExternalLinkIcon: true,
                      })
                    )
                  )
                )
              : null,
          ]),
      ]);
  },
});
