import { isString } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { useData } from "@theme-hope/composables/useData";
import { usePageAuthor } from "@theme-hope/composables/usePageInfo";

import "../../styles/base/page-footer.scss";

export default defineComponent({
  name: "PageFooter",

  setup() {
    const { frontmatter, theme, themeLocale } = useData();
    const author = usePageAuthor();

    const enabled = computed(() => {
      const { copyright, footer } = frontmatter.value;

      return (
        // footer is not disabled
        footer !== false &&
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        Boolean(copyright || footer || themeLocale.value.displayFooter)
      );
    });

    const footer = computed(() => {
      const { footer } = frontmatter.value;

      return isString(footer) ? footer : (themeLocale.value.footer ?? "");
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
      const { license: globalLicense } = theme.value;
      const { copyright: globalCopyright } = themeLocale.value;

      return (
        copyright ??
        (license
          ? getCopyrightText(license)
          : (globalCopyright ??
            (authorText.value || globalLicense
              ? getCopyrightText(globalLicense)
              : false)))
      );
    });

    return (): VNode | null =>
      enabled.value
        ? h("footer", { class: "vp-footer-wrapper", "vp-footer": "" }, [
            footer.value
              ? h("div", { class: "vp-footer", innerHTML: footer.value })
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
