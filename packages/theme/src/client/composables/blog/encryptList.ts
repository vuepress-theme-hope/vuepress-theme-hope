import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import { computed, inject, provide } from "vue";
import { sortArticles } from "../../utils";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type EncryptedListRef = ComputedRef<ArticleDetail[]>;

export const encryptedListSymbol: InjectionKey<EncryptedListRef> =
  Symbol.for("encryptedList");

/**
 * Inject encryptedList
 */
export const useEncryptedList = (): EncryptedListRef => {
  const encryptedList = inject(encryptedListSymbol);

  if (!encryptedList) {
    throw new Error("useEncryptedList() is called without provider.");
  }

  return encryptedList;
};

/**
 * Provide encryptedList
 */
export const setupEncryptedList = (): void => {
  const currentSlides = useBlogType<ArticleDetail>("encrypted");

  const encryptedList = computed(() => {
    return sortArticles(
      currentSlides.value.map(({ meta, path }) => ({
        ...meta,
        path,
      })),
      "sticky"
    );
  });

  provide(encryptedListSymbol, encryptedList);
};
