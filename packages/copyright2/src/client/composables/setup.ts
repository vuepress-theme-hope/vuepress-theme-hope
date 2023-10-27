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
declare const COPYRIGHT_MAX_LENGTH: number;
declare const COPYRIGHT_TRIGGER_LENGTH: number;

const canonical = COPYRIGHT_CANONICAL;

export const setupCopyright = (): void => {
  const frontmatter = usePageFrontmatter<CopyrightPluginFrontmatter>();
  const locale = useLocaleConfig(COPYRIGHT_LOCALES);
  const page = usePageData<CopyrightPluginPageData>();

  const enabled = computed(
    () =>
      Boolean(frontmatter.value.copy) ||
      (frontmatter.value.copy !== false && COPYRIGHT_GLOBAL),
  );

  const copyOptions = computed(() =>
    isPlainObject(frontmatter.value.copy) ? frontmatter.value.copy : null,
  );

  const disableCopy = computed(
    () => copyOptions.value?.disableCopy ?? COPYRIGHT_DISABLE_COPY,
  );

  const disableSelection = computed(() =>
    enabled.value
      ? copyOptions.value?.disableSelection ?? COPYRIGHT_DISABLE_SELECTION
      : false,
  );

  const maxLength = computed(() =>
    enabled.value ? copyOptions.value?.maxLength ?? COPYRIGHT_MAX_LENGTH : 0,
  );

  const triggerLength = computed(
    () => copyOptions.value?.triggerLength ?? COPYRIGHT_TRIGGER_LENGTH,
  );

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
              isLinkHttp(canonical) ? canonical : `https://${canonical}`,
            )}${page.value.path}`
          : window.location.href,
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
        const textLength = textRange.toString().length;

        if (
          disableCopy.value ||
          (maxLength.value && textLength > maxLength.value)
        )
          return event.preventDefault();

        if (textLength >= triggerLength.value) {
          event.preventDefault();

          const copyright = getCopyright();
          const node = document.createElement("div");

          node.appendChild(selection.getRangeAt(0).cloneContents());

          if (event.clipboardData) {
            event.clipboardData.setData(
              "text/html",
              `${node.innerHTML}<hr><div class="copyright">${copyright.replace(
                /\\n/g,
                "<br>",
              )}</div>`,
            );
            event.clipboardData.setData(
              "text/plain",
              `${
                selection.getRangeAt(0).cloneContents().textContent || ""
              }\n------\n${copyright}`,
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
