import { usePageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import { getAuthor, getCategory, getDate, getTag } from "../../shared";

import type { ComputedRef } from "vue";
import type {
  Author,
  AuthorInfo,
  BasePageFrontMatter,
  DateInfo,
  DateOptions,
} from "../../shared";

export type AuthorRef = ComputedRef<AuthorInfo[]>;

export const useAuthor = (fallback: Author): AuthorRef =>
  computed(() => {
    const { author } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    return getAuthor(fallback, false);
  });

export type CategoryRef = ComputedRef<string[]>;

export const useCategory = (): CategoryRef =>
  computed(() => {
    const { categories, category = categories } =
      usePageFrontmatter<BasePageFrontMatter>().value;

    return getCategory(category);
  });

export type TagRef = ComputedRef<string[]>;

export const useTag = (): TagRef =>
  computed(() => {
    const { tags, tag = tags } =
      usePageFrontmatter<BasePageFrontMatter>().value;

    return getTag(tag);
  });

export type DateRef = ComputedRef<DateInfo | null>;

export const useDate = (options?: DateOptions, fallback?: Date): DateRef =>
  computed(() => {
    const { time, date = time } =
      usePageFrontmatter<BasePageFrontMatter>().value;

    return getDate(date ?? fallback, options);
  });
