import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { isLinkHttp, isPlainObject, removeEndingSlash } from "@vuepress/shared";
import { useEventListener } from "@vueuse/core";
import { computed, onMounted, watchEffect } from "vue";
import type { RequiredLocaleConfig } from "vuepress-shared/client";
import { useLocaleConfig } from "vuepress-shared/client";

import type {
  CopyrightLocaleData,
  CopyrightPluginFrontmatter,
  CopyrightPluginPageData,
} from "../../shared/index.js";

declare const COPYRIGHT_CANONICAL: string;
declare const COPYRIGHT_DISABLE_COPY: boolean;
declare const COPYRIGHT_DISABLE_SELECTION: boolean;
declare const COPYRIGHT_GLOBAL: boolean;
declare const COPYRIGHT_LOCALES: RequiredLocaleConfig<CopyrightLocaleData>;
declare const COPYRIGHT_TRIGGER_WORDS: number;

const canonical = COPYRIGHT_CANONICAL;

export const setupCopyright = (): void => {
  const frontmatter = usePageFrontmatter<CopyrightPluginFrontmatter>();
  const locale = useLocaleConfig(COPYRIGHT_LOCALES);
  const page = usePageData<CopyrightPluginPageData>();

  const enabled = computed(
    () =>
      Boolean(frontmatter.value.copy) ||
      (frontmatter.value.copy !== false && COPYRIGHT_GLOBAL)
  );

  const disableCopy = computed(() => {
    const frontmatterOptions = frontmatter.value.copy;

    if (!enabled.value) return false;

    if (
      isPlainObject(frontmatterOptions) &&
      "disableCopy" in frontmatterOptions
    )
      return frontmatterOptions.disableCopy;

    return COPYRIGHT_DISABLE_COPY;
  });

  const disableSelection = computed(() => {
    const frontmatterOptions = frontmatter.value.copy;

    if (!enabled.value) return false;

    if (
      isPlainObject(frontmatterOptions) &&
      "disableSelection" in frontmatterOptions
    )
      return frontmatterOptions.disableSelection;

    return COPYRIGHT_DISABLE_SELECTION;
  });

  const getCopyright = (): string => {
    const { author: authorInfo = "", license: licenseInfo = "" } =
      page.value.copyright;
    const { author, license, link } = locale.value;

    return [
      authorInfo ? author.replace(":author", authorInfo) : "",
      licenseInfo ? license.replace(":license", licenseInfo) : "",
      link.replace(
        ":link",
        canonical
          ? `${removeEndingSlash(
              isLinkHttp(canonical) ? canonical : `https://${canonical}`
            )}${page.value.path}`
          : window.location.href
      ),
    ]
      .filter((item) => item)
      .join("\n");
  };

  const onCopy = (event: ClipboardEvent): void => {
    const selection = getSelection();

    if (selection) {
      const textRange = selection.getRangeAt(0);

      if (enabled.value) {
        if (disableCopy.value) return event.preventDefault();

        if (textRange.toString().length >= COPYRIGHT_TRIGGER_WORDS) {
          event.preventDefault();

          const copyright = getCopyright();
          const node = document.createElement("div");

          node.appendChild(selection.getRangeAt(0).cloneContents());

          if (event.clipboardData) {
            event.clipboardData.setData(
              "text/html",
              `${node.innerHTML}<hr><div class="copyright">${copyright.replace(
                /\\n/g,
                "<br>"
              )}</div>`
            );
            event.clipboardData.setData(
              "text/plain",
              `${
                selection.getRangeAt(0).cloneContents().textContent || ""
              }\n------\n${copyright}`
            );
          }
        }
      }
    }
  };

  onMounted(() => {
    const appElement = document.querySelector<HTMLDivElement>("#app")!;

    useEventListener(appElement, "copy", onCopy);

    watchEffect(() => {
      appElement.style.userSelect = disableSelection.value ? "none" : "auto";
    });
  });
};
