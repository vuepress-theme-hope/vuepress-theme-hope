import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";

import { usePageAuthor, useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";
import type { HopeThemeNormalPageFrontmatter } from "../../shared";

import "../styles/footer.scss";

export default defineComponent({
  name: "PageFooter",

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();
    const author = usePageAuthor();

    const enable = computed(() => {
      const { copyright, footer } = frontmatter.value;

      return (
        footer !== false &&
        Boolean(copyright || footer || themeLocale.value.displayFooter)
      );
    });

    const content = computed(() => {
      const { footer } = frontmatter.value;

      return footer === false
        ? false
        : typeof footer === "string"
        ? footer
        : themeLocale.value.footer || "";
    });

    const copyright = computed(() =>
      frontmatter.value.copyright === false
        ? false
        : frontmatter.value.copyright ||
          (themeLocale.value.copyright === false
            ? false
            : themeLocale.value.copyright ||
              (author.value.length
                ? `Copyright © ${new Date().getFullYear()} ${
                    author.value[0].name
                  }`
                : ""))
    );

    return (): VNode | null =>
      enable.value
        ? h("footer", { class: "footer-wrapper" }, [
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
