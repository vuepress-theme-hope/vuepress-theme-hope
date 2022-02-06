import { usePageFrontmatter, withBase } from "@vuepress/client";
import { defineComponent, h, resolveComponent } from "vue";

import {
  ArticleIcon,
  BookIcon,
  LinkIcon,
  ProjectIcon,
} from "@theme-hope/module/blog/components/icons";
import { useNavigate } from "@theme-hope/composables";

import type { VNode } from "vue";
import type { HopeThemeBlogHomePageFrontmatter } from "../../../../shared";

export default defineComponent({
  name: "BlogProjectList",

  components: { ArticleIcon, BookIcon, LinkIcon, ProjectIcon },

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeBlogHomePageFrontmatter>();
    const navigate = useNavigate();

    return (): VNode | null =>
      frontmatter.value.projects?.length
        ? h(
            "div",
            { class: "project-list" },
            frontmatter.value.projects.map((project, index) =>
              h(
                "div",
                {
                  class: ["project", `project${index % 9}`],
                  onClick: () => navigate(project.link),
                },
                [
                  project.cover
                    ? h("div", {
                        style: `background: url(${withBase(
                          project.cover
                        )}) center/cover no-repeat;`,
                      })
                    : null,
                  h(resolveComponent(`${project.type}-icon`)),
                  h("div", { class: "name" }, project.name),
                  h("div", { class: "desc" }, project.desc),
                ]
              )
            )
          )
        : null;
  },
});
