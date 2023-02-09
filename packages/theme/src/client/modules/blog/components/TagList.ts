import { usePageFrontmatter } from "@vuepress/client";
import { type VNode, defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { type BlogPluginCategoryFrontmatter } from "vuepress-plugin-blog2";
import { entries, generateIndexFromHash } from "vuepress-shared/client";

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
        entries(tagMap.value.map).map(([tag, { path, items }]) =>
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
            h(RouterLink, { to: path }, () => [
              tag,
              h("span", { class: "tag-num" }, items.length),
            ])
          )
        )
      );
  },
});
