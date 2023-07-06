import { usePageFrontmatter } from "@vuepress/client";
import { isString } from "@vuepress/shared";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import {
  usePageAuthor,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

import "../styles/footer.scss";

export default defineComponent({
  name: "PageFooter",

  setup() {
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
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
        : isString(footer)
        ? footer
        : themeLocale.value.footer || "";
    });

    const copyright = computed(() =>
      "copyright" in frontmatter.value
        ? frontmatter.value.copyright
        : "copyright" in themeLocale.value
        ? themeLocale.value.copyright
        : author.value.length
        ? `Copyright © ${new Date().getFullYear()} ${author.value[0].name}`
        : false,
    );

    return (): VNode | null =>
      enable.value
        ? h("footer", { class: "vp-footer-wrapper" }, [
            content.value
              ? h("div", { class: "vp-footer", innerHTML: content.value })
              : null,
            copyright.value
              ? h("div", {
                  class: "vp-copyright",
                  innerHTML: copyright.value,
                })
              : null,
          ])
        : null;
  },
});
