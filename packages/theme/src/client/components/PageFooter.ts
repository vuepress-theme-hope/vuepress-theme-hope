import { isString } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { usePageFrontmatter } from "vuepress/client";

import {
  usePageAuthor,
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

import "../styles/footer.scss";

export default defineComponent({
  name: "PageFooter",

  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
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

    const authorText = computed(() =>
      author.value.map(({ name }) => name).join(", "),
    );

    const getCopyrightText = (license?: string): string =>
      `Copyright © ${new Date().getFullYear()} ${authorText.value} ${
        license ? `${license} Licensed` : ""
      }`;

    const copyright = computed(() => {
      const { copyright, license = "" } = frontmatter.value;
      const { license: globalLicense } = themeData.value;
      const { copyright: globalCopyright } = themeLocale.value;

      return (
        copyright ??
        (license
          ? getCopyrightText(license)
          : isString(globalCopyright)
            ? globalCopyright
            : authorText.value || globalLicense
              ? getCopyrightText(globalLicense)
              : false)
      );
    });

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
