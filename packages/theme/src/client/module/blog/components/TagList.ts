import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { generateIndexfromHash } from "vuepress-shared/lib/client";

import { useTagMap } from "@theme-hope/module/blog/composables";

import type { VNode } from "vue";
import type { BlogPluginCategoryFrontmatter } from "vuepress-plugin-blog2";

import "../styles/tag-list.scss";

export default defineComponent({
  name: "TagList",

  setup() {
    const frontmatter = usePageFrontmatter<BlogPluginCategoryFrontmatter>();
    const tagMap = useTagMap();

    const tagList = computed(() =>
      Object.entries(tagMap.value.map).map(([name, { path }]) => ({
        name,
        path,
      }))
    );

    const isActive = (name: string): boolean =>
      name === frontmatter.value.blog?.name;

    return (): VNode =>
      h(
        "ul",
        { class: "tag-list-wrapper" },
        tagList.value.map(({ name, path }) =>
          h(
            "li",
            {
              class: [
                "tag",
                // TODO: magic number 9 is tricky here
                `tag${generateIndexfromHash(name, 9)}`,
                { active: isActive(name) },
              ],
            },
            h(RouterLink, { to: path }, () =>
              h("div", { class: "tag-name" }, name)
            )
          )
        )
      );
  },
});
