import { usePageFrontmatter, withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import { defineComponent, h, resolveComponent } from "vue";
import { isAbsoluteUrl } from "vuepress-shared/client";

import Icon from "@theme-hope/components/Icon";
import {
  ArticleIcon,
  BookIcon,
  FriendIcon,
  LinkIcon,
  ProjectIcon,
} from "@theme-hope/modules/blog/components/icons/index";
import { useNavigate, usePure } from "@theme-hope/composables/index";

import type { VNode } from "vue";
import type { ThemeBlogHomePageFrontmatter } from "../../../../shared/index.js";

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
    const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();
    const pure = usePure();
    const navigate = useNavigate();

    const renderIcon = (icon = "", alt = "icon"): VNode | null => {
      // built in icon
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h(resolveComponent(`${icon}-icon`));

      // it’s a full image link
      if (isLinkHttp(icon)) return h("img", { src: icon, alt, class: "image" });

      // it’s an absolute image link
      if (isAbsoluteUrl(icon))
        return h("img", { src: withBase(icon), alt, class: "image" });

      // render as icon font
      return h(Icon, { icon });
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
