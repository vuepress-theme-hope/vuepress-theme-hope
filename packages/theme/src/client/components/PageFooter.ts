import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";

import MediaLinks from "@theme-hope/components/medialinks";
import { usePageAuthor, useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";
import type { HopeThemeNormalPageFrontmatter } from "../../shared";

export default defineComponent({
  name: "PageFooter",

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const themeLocaleData = useThemeLocaleData();
    const author = usePageAuthor();

    const enable = computed(() => {
      const { copyrightText, footer, medialinks } = frontmatter.value;

      return (
        footer !== false &&
        Boolean(
          copyrightText ||
            footer ||
            medialinks ||
            themeLocaleData.value.displayFooter
        )
      );
    });

    const content = computed(() => {
      const { footer } = frontmatter.value;

      return footer === false
        ? false
        : typeof footer === "string"
        ? footer
        : themeLocaleData.value.footer || "";
    });

    const copyright = computed(() =>
      frontmatter.value.copyrightText === false
        ? false
        : frontmatter.value.copyrightText ||
          (themeLocaleData.value.copyright === false
            ? false
            : themeLocaleData.value.copyright ||
              (author.value.length
                ? `Copyright © ${new Date().getFullYear()} ${
                    author.value[0].name
                  }`
                : ""))
    );

    return (): VNode | null =>
      enable.value
        ? h("footer", { class: "footer-wrapper" }, [
            frontmatter.value.home && frontmatter.value.blog
              ? null
              : h(MediaLinks),
            h("div", { class: "footer", innerHTML: content.value }),
            copyright.value
              ? h("div", {
                  class: "copyright",
                  innerHTML: copyright.value,
                })
              : null,
          ])
        : null;
  },
});
