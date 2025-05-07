import { isLinkAbsolute } from "@vuepress/helper/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h, resolveComponent } from "vue";
import { withBase } from "vuepress/client";
import { generateIndexFromHash } from "vuepress-shared/client";

import { useNavigate } from "@theme-hope/composables/useNavigate";
import { usePure } from "@theme-hope/composables/usePure";

import type { ThemeBlogHomeProjectOptions } from "../../../shared/index.js";
import cssVariables from "../../styles/variables.module.scss";

import "../../styles/blog/project-panel.scss";

export default defineComponent({
  name: "ProjectPanel",

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

    return (): VNode | null =>
      h(
        "div",
        { class: "vp-project-panel" },
        props.items.map(({ icon, link, name, desc, background }) =>
          h(
            "a",
            {
              class: [
                "vp-project-card",
                {
                  [`color${generateIndexFromHash(name, Number(cssVariables.colorNumber))}`]:
                    !isPure.value && !background,
                },
              ],
              ...(background ? { style: background } : {}),
              href: isLinkAbsolute(link) ? withBase(link) : link,
              onClick: (e) => {
                navigate(link);
                e.preventDefault();
              },
            },
            [
              icon
                ? h(resolveComponent("VPIcon"), {
                    class: "vp-project-icon",
                    icon,
                  })
                : null,
              h("div", { class: "vp-project-name" }, name),
              h("div", { class: "vp-project-desc" }, desc),
            ],
          ),
        ),
      );
  },
});
