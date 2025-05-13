import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useMetaLocale } from "@theme-hope/composables/info/useMetaLocale";
import { useData } from "@theme-hope/composables/useData";
import { resolveEditLink } from "@theme-hope/utils/info/resolveEditLink";

import type { AutoLinkOptions } from "../../../shared/index.js";

export const useEditLink = (): ComputedRef<null | AutoLinkOptions> => {
  const { frontmatter, page, themeLocale } = useData();
  const metaLocale = useMetaLocale();

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
      text: metaLocale.value.editLink,
      link,
    };
  });
};
