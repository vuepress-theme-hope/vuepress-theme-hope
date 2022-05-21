import { usePageFrontmatter, withBase } from "@vuepress/client";
import { isArray, isLinkExternal, isLinkHttp } from "@vuepress/shared";
import { computed, defineComponent, h, resolveComponent } from "vue";
import { RouterLink } from "vue-router";

import type { VNode } from "vue";
import type { HopeThemeProjectHomePageFrontmatter } from "../../shared";

export default defineComponent({
  name: "HomeFeatures",

  setup() {
    const frontmatter =
      usePageFrontmatter<HopeThemeProjectHomePageFrontmatter>();

    const features = computed(() => {
      if (isArray(frontmatter.value.features))
        return frontmatter.value.features;

      return [];
    });

    const getIcon = (icon = ""): VNode | null => {
      return isLinkHttp(icon)
        ? h("img", { class: "icon", src: icon })
        : icon.startsWith("/")
        ? h("img", { class: "icon", src: withBase(icon) })
        : icon
        ? h(resolveComponent("FontIcon"), { icon })
        : null;
    };

    return (): VNode | null =>
      features.value.length
        ? h(
            "div",
            { class: "features" },
            frontmatter.value.features?.map((feature) => {
              const children = [
                getIcon(feature.icon),
                h("h2", { innerHTML: feature.title }),
                h("p", { innerHTML: feature.details }),
              ];

              return feature.link
                ? isLinkExternal(feature.link)
                  ? h(
                      "a",
                      {
                        class: "feature link",
                        href: feature.link,
                        role: "navigation",
                        target: "_blank",
                      },
                      children
                    )
                  : h(
                      RouterLink,
                      {
                        class: "feature link",
                        to: feature.link,
                        role: "navigation",
                      },
                      () => children
                    )
                : h("div", { class: "feature" }, children);
            })
          )
        : null;
  },
});
