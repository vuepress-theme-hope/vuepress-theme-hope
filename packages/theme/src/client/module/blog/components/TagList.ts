import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

import { useTagMap } from "@theme-hope/module/blog/composables";

import type { VNode } from "vue";
import type { BlogCategoryFrontmatterOptions } from "vuepress-plugin-blog2";

import "../styles/tag-list.scss";

export default defineComponent({
  name: "TagList",

  setup() {
    const frontmatter = usePageFrontmatter<BlogCategoryFrontmatterOptions>();
    const tagMap = useTagMap();

    const tagList = computed(() =>
      Object.keys(tagMap.value.map).map((tag) => ({
        name: tag,
        path: tagMap.value.map[tag].path,
      }))
    );

    const isActive = (name: string): boolean => name === frontmatter.value.key;

    return (): VNode =>
      h(
        "ul",
        { class: "tag-list-wrapper" },
        tagList.value.map(({ name, path }, index) =>
          h(
            "li",
            {
              class: ["tag", `tag${index % 9}`, { active: isActive(name) }],
            },
            h(RouterLink, { to: path }, () =>
              h("div", { class: "tag-name" }, name)
            )
          )
        )
      );
  },
});
