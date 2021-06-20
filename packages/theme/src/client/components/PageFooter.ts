import { computed, defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";
import MediaLinks from "./medialinks";
import { useThemeLocaleData } from "../composables";

import { VNode } from "vue";
import type {
  HopeFooterConfig,
  HopeThemeNormalPageFrontmatter,
} from "../../shared";

export default defineComponent({
  name: "PageFooter",

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const themeLocaleData = useThemeLocaleData();

    const config = computed<HopeFooterConfig>(
      () => themeLocaleData.value.footer || {}
    );

    const enable = computed(() => {
      const { copyrightText, footer, medialinks } = frontmatter.value;

      return (
        footer !== false &&
        Boolean(copyrightText || footer || medialinks || config.value.display)
      );
    });

    const content = computed(() => {
      const { footer } = frontmatter.value;

      return footer === false
        ? false
        : typeof footer === "string"
        ? footer
        : config.value.content || "";
    });

    const copyright = computed(() =>
      frontmatter.value.copyrightText === false
        ? false
        : frontmatter.value.copyrightText ||
          (config.value.copyright === false
            ? false
            : config.value.copyright ||
              (themeLocaleData.value.author
                ? `Copyright © ${new Date().getFullYear()} ${
                    themeLocaleData.value.author
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
