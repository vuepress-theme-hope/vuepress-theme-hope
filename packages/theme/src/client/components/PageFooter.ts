import { computed, defineComponent, h } from "vue";
import { useAuthor } from "@mr-hope/vuepress-shared/lib/client";
import { usePageFrontmatter } from "@vuepress/client";
import MediaLinks from "./medialinks";
import { useThemeLocaleData } from "../composables";

import type { VNode } from "vue";
import type {
  HopeThemeFooterLocaleOptions,
  HopeThemeNormalPageFrontmatter,
} from "../../shared";

export default defineComponent({
  name: "PageFooter",

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const themeLocaleData = useThemeLocaleData();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const author = useAuthor(themeLocaleData.value.author);

    const config = computed<HopeThemeFooterLocaleOptions>(
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
