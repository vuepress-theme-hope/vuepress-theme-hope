import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import type { PropType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import { isAbsoluteUrl } from "vuepress-shared/client";

import HopeIcon from "@theme-hope/components/HopeIcon";
import { useNavigate, usePure } from "@theme-hope/composables/index";
import {
  ArticleIcon,
  BookIcon,
  FriendIcon,
  LinkIcon,
  ProjectIcon,
} from "@theme-hope/modules/blog/components/icons/index";

import type { ThemeBlogHomeProjectOptions } from "../../../../shared/index.js";

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

  props: {
    /** 项目列表 */
    items: {
      type: Array as PropType<ThemeBlogHomeProjectOptions[]>,
      required: true,
    },
  },

  setup(props) {
    const pure = usePure();
    const navigate = useNavigate();

    const renderIcon = (icon = "", alt = "icon"): VNode | null => {
      // built in icon
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h(resolveComponent(`${icon}-icon`));

      // it’s a full image link
      if (isLinkHttp(icon))
        return h("img", { class: "vp-project-image", src: icon, alt });

      // it’s an absolute image link
      if (isAbsoluteUrl(icon))
        return h("img", {
          class: "vp-project-image",
          src: withBase(icon),
          alt,
        });

      // render as icon font
      return h(HopeIcon, { icon });
    };

    return (): VNode | null =>
      h(
        "div",
        { class: "vp-project-panel" },
        props.items.map(({ icon, link, name, desc }, index) =>
          h(
            "div",
            {
              class: [
                "vp-project-card",
                // TODO: magic number 9 is tricky here
                { [`project${index % 9}`]: !pure.value },
              ],
              onClick: () => navigate(link),
            },
            [
              renderIcon(icon, name),
              h("div", { class: "vp-project-name" }, name),
              h("div", { class: "vp-project-desc" }, desc),
            ],
          ),
        ),
      );
  },
});
