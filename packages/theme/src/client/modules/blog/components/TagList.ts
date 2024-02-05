import { entries } from "@vuepress/helper/client";
import type { BlogPluginCategoryFrontmatter } from "@vuepress/plugin-blog";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";
import { RouteLink, usePageFrontmatter } from "vuepress/client";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useTagMap } from "@theme-hope/modules/blog/composables/index";

import "../styles/tag-list.scss";

export default defineComponent({
  name: "TagList",

  setup() {
    const frontmatter = usePageFrontmatter<BlogPluginCategoryFrontmatter>();
    const tagMap = useTagMap();

    const isActive = (name: string): boolean =>
      name === frontmatter.value.blog?.name;

    return (): VNode =>
      h(
        "ul",
        { class: "tag-list-wrapper" },
        entries(tagMap.value.map)
          // Sort from more to less
          .sort(([, a], [, b]) => b.items.length - a.items.length)
          .map(([tag, { path, items }]) =>
            h(
              "li",
              {
                class: [
                  "tag",
                  // TODO: magic number 9 is tricky here
                  `tag${generateIndexFromHash(tag, 9)}`,
                  { active: isActive(tag) },
                ],
              },
              h(RouteLink, { to: path }, () => [
                tag,
                h("span", { class: "tag-num" }, items.length),
              ]),
            ),
          ),
      );
  },
});
