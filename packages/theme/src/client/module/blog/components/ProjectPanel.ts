import { usePageFrontmatter, withBase } from "@vuepress/client";
import { defineComponent, h, resolveComponent } from "vue";

import {
  ArticleIcon,
  BookIcon,
  FriendIcon,
  LinkIcon,
  ProjectIcon,
} from "@theme-hope/module/blog/components/icons";
import { useNavigate, usePure } from "@theme-hope/composables";

import type { VNode } from "vue";
import type { HopeThemeBlogHomePageFrontmatter } from "../../../../shared";

import "../styles/project-panel.scss";

const AVAILABLE_PROJECT_TYPES = [
  "link",
  "article",
  "book",
  "project",
  "friend",
];

export default defineComponent({
  name: "ProjectPanel",

  components: { ArticleIcon, BookIcon, FriendIcon, LinkIcon, ProjectIcon },

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeBlogHomePageFrontmatter>();
    const pure = usePure();
    const navigate = useNavigate();

    const renderIcon = (icon = "", alt = "icon"): VNode | null => {
      // built in icon
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h(resolveComponent(`${icon}-icon`));

      // it’s a full image link
      if (icon.match(/^https?:\/\//))
        return h("img", { src: icon, alt, class: "image" });

      // it’s an absolute image link
      if (icon.startsWith("/"))
        return h("img", { src: withBase(icon), alt, class: "image" });

      // render as icon font
      return h(resolveComponent("FontIcon"), { icon });
    };

    return (): VNode | null =>
      frontmatter.value.projects?.length
        ? h(
            "div",
            { class: "project-panel" },
            frontmatter.value.projects.map(
              ({ icon, link, name, desc }, index) =>
                h(
                  "div",
                  {
                    class: [
                      "project",
                      // TODO: magic number 9 is tricky here
                      { [`project${index % 9}`]: !pure.value },
                    ],
                    onClick: () => navigate(link),
                  },
                  [
                    renderIcon(icon, name),
                    h("div", { class: "name" }, name),
                    h("div", { class: "desc" }, desc),
                  ]
                )
            )
          )
        : null;
  },
});
