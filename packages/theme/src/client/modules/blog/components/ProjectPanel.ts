import type { PropType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useNavigate, usePure } from "@theme-hope/composables/index";
import {
  ArticleIcon,
  BookIcon,
  FriendIcon,
  LinkIcon,
  ProjectIcon,
} from "@theme-hope/modules/blog/components/icons/index";

import type { ThemeBlogHomeProjectOptions } from "../../../../shared/index.js";
import cssVariables from "../../../styles/variables.module.scss";

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
    const isPure = usePure();
    const navigate = useNavigate();

    const renderIcon = (icon = ""): VNode | null => {
      // Built in icon
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h(resolveComponent(`${icon}-icon`), {
          class: "vp-project-icon",
        });

      // Render as icon
      return h(resolveComponent("VPIcon"), { class: "vp-project-icon", icon });
    };

    return (): VNode | null =>
      h(
        "div",
        { class: "vp-project-panel" },
        props.items.map(({ icon, link, name, desc, background }) =>
          h(
            "div",
            {
              class: [
                "vp-project-card",
                {
                  [`color${generateIndexFromHash(name, Number(cssVariables.colorNumber))}`]:
                    !isPure.value && !background,
                },
              ],
              ...(background ? { style: background } : {}),
              onClick: () => {
                navigate(link);
              },
            },
            [
              renderIcon(icon),
              h("div", { class: "vp-project-name" }, name),
              h("div", { class: "vp-project-desc" }, desc),
            ],
          ),
        ),
      );
  },
});
