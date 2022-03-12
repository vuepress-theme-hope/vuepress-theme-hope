import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import PageMeta from "@theme-hope/components/PageMeta";
import PageNav from "@theme-hope/components/PageNav";
import PageTitle from "@theme-hope/components/PageTitle";
import { useIconPrefix } from "@theme-hope/composables";
import PasswordModal from "@theme-hope/module/encrypt/components/PasswordModal";
import { useThemeLocaleData } from "@theme-hope/composables";
import { usePathEncrypt } from "@theme-hope/module/encrypt/composables";
import { useDarkMode } from "@theme-hope/module/outlook/composables";

import type { VNode } from "vue";
import type { HopeThemeNormalPageFrontmatter } from "../../shared";

import "../styles/page.scss";

export default defineComponent({
  name: "NormalPage",

  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const { isDarkMode } = useDarkMode();
    const iconPrefix = useIconPrefix();
    const themeLocale = useThemeLocaleData();
    const { isEncrypted, validateToken } = usePathEncrypt();

    const breadcrumbEnable = computed(
      () =>
        frontmatter.value.breadcrumb ||
        (frontmatter.value.breadcrumb !== false &&
          themeLocale.value.breadcrumb !== false)
    );

    const breadcrumbIconEnable = computed(
      () =>
        frontmatter.value.breadcrumbIcon ||
        (frontmatter.value.breadcrumbIcon !== false &&
          themeLocale.value.breadcrumbIcon !== false)
    );

    const tocEnable = computed(
      () =>
        frontmatter.value.toc ||
        (frontmatter.value.toc !== false && themeLocale.value.toc !== false)
    );

    return (): VNode =>
      h(
        "main",
        { class: "page", id: "main-content" },
        isEncrypted.value
          ? h(PasswordModal, { onVerify: validateToken })
          : [
              slots.top?.(),
              h(resolveComponent("BreadCrumb"), {
                enable: breadcrumbEnable.value,
                icon: breadcrumbIconEnable.value,
                iconPrefix: iconPrefix.value,
              }),
              h(PageTitle),
              tocEnable.value
                ? h(resolveComponent("TOC"), {
                    headingDepth: frontmatter.value.headingDepth,
                  })
                : null,
              slots.contentBefore?.(),
              h(MarkdownContent),
              slots.contentAfter?.(),
              h(PageMeta),
              h(PageNav),
              h(resolveComponent("PageComment"), {
                darkmode: isDarkMode.value,
              }),
              slots.bottom?.(),
            ]
      );
  },
});
