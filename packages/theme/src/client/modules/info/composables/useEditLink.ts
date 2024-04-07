import type { ComputedRef } from "vue";
import { computed } from "vue";
import { usePageData, usePageFrontmatter } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import { resolveEditLink } from "@theme-hope/modules/info/utils/index";

import type {
  AutoLinkOptions,
  ThemeNormalPageFrontmatter,
  ThemePageData,
} from "../../../../shared/index.js";

export const useEditLink = (): ComputedRef<null | AutoLinkOptions> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<ThemePageData>();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();

  return computed(() => {
    const {
      repo,
      docsRepo = repo,
      docsBranch = "main",
      docsDir = "",
      editLink,
      editLinkPattern = "",
    } = themeLocale.value;

    const showEditLink = frontmatter.value.editLink ?? editLink ?? true;

    if (!showEditLink) return null;

    if (!docsRepo) return null;

    const link = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      editLinkPattern,
      filePathRelative: page.value.filePathRelative,
    });

    if (!link) return null;

    return {
      text: themeLocale.value.metaLocales.editLink,
      link,
    };
  });
};
