<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="meta-item edit-link">
      <NavLink class="label" :item="editNavLink">
        <template #before>
          <EditIcon />
        </template>
      </NavLink>
    </div>

    <div v-if="updateTime" class="meta-item update-time">
      <span class="label">{{ themeLocale.lastUpdatedText }}: </span>
      <span class="info">{{ updateTime }}</span>
    </div>

    <div
      v-if="contributors && contributors.length"
      class="meta-item contributors"
    >
      <span class="label">{{ themeLocale.contributorsText }}: </span>
      <span class="info">
        <template v-for="(contributor, index) in contributors" :key="index">
          <span class="contributor" :title="`email: ${contributor.email}`">
            {{ contributor.name }}
          </span>
          <template v-if="index !== contributors.length - 1">, </template>
        </template>
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import type { ComputedRef } from "vue";
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from "@vuepress/client";
import { useThemeLocaleData } from "../composables";
import { resolveEditLink } from "../utils";
import NavLink from "./NavLink.vue";
import { EditIcon } from "./icons";

import type {
  HopeThemePageData,
  HopeThemeNormalPageFrontmatter,
  NavLink as NavLinkType,
} from "../../shared";

const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<HopeThemePageData>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true;
    if (!showEditLink) {
      return null;
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = "main",
      docsDir = "",
      editLinkText,
    } = themeLocale.value;

    if (!docsRepo) return null;

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    });

    if (!editLink) return null;

    return {
      text: editLinkText ?? "Edit this page",
      link: editLink,
    };
  });
};

const useUpdateTime = (): ComputedRef<null | string> => {
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData();
  const page = usePageData<HopeThemePageData>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true;

    if (!showLastUpdated) return null;

    if (!page.value.git?.updatedTime) return null;

    const updatedDate = new Date(page.value.git?.updatedTime);

    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};

const useContributors = (): ComputedRef<
  null | Required<HopeThemePageData["git"]>["contributors"]
> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<HopeThemePageData>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true;

    if (!showContributors) return null;

    return page.value.git?.contributors ?? null;
  });
};

export default defineComponent({
  name: "PageMeta",

  components: {
    EditIcon,
    NavLink,
  },

  setup() {
    const themeLocale = useThemeLocaleData();
    const editNavLink = useEditNavLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();

    return {
      themeLocale,
      editNavLink,
      updateTime,
      contributors,
    };
  },
});
</script>
