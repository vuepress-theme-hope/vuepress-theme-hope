import type { PropType, VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
  toRef,
} from "vue";
import { onContentUpdated } from "vuepress/client";

import AutoLink from "@theme-hope/components/base/AutoLink";

import type { AutoLinkOptions, NavGroup } from "../../../shared/index.js";

import "../../styles/navbar/nav-screen-menu.scss";

export default defineComponent({
  name: "NavScreenMenu",

  props: {
    /**
     * Navbar Screen nav-screen-menu list config
     *
     * 导航栏下拉列表配置
     */
    config: {
      type: Object as PropType<
        NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>
      >,

      required: true,
    },
  },

  setup(props) {
    const config = toRef(props, "config");

    const ariaLabel = computed(
      () => config.value.ariaLabel ?? config.value.text,
    );

    const open = ref(false);

    const isLastItemOfArray = <T>(item: T, arr: T[]): boolean =>
      arr[arr.length - 1] === item;

    onContentUpdated(() => {
      open.value = false;
    });

    return (): VNode[] => [
      h(
        "button",
        {
          type: "button",
          class: ["vp-nav-screen-menu-title", { active: open.value }],
          "aria-label": ariaLabel.value,
          onClick: () => {
            open.value = !open.value;
          },
        },
        [
          h("span", { class: "text" }, [
            h(resolveComponent("VPIcon"), {
              icon: config.value.icon,
              sizing: "both",
            }),
            props.config.text,
          ]),
          h("span", { class: ["arrow", open.value ? "down" : "end"] }),
        ],
      ),
      h(
        "ul",
        {
          class: ["vp-nav-screen-menu", { hide: !open.value }],
        },
        config.value.children.map((child) =>
          h(
            "li",
            { class: "vp-nav-screen-menu-item" },
            "children" in child
              ? [
                  h(
                    "h4",
                    { class: "vp-nav-screen-menu-subtitle" },
                    child.link
                      ? h(AutoLink, {
                          config: child as AutoLinkOptions,
                          onFocusout: () => {
                            if (
                              isLastItemOfArray(child, config.value.children) &&
                              child.children.length === 0
                            )
                              open.value = false;
                          },
                        })
                      : child.text,
                  ),
                  h(
                    "ul",
                    { class: "vp-nav-screen-menu-subitems" },
                    child.children.map((grandchild) =>
                      h(
                        "li",
                        { class: "vp-nav-screen-menu-subitem" },
                        h(AutoLink, {
                          config: grandchild,
                          onFocusout: () => {
                            if (
                              isLastItemOfArray(grandchild, child.children) &&
                              isLastItemOfArray(child, config.value.children)
                            )
                              open.value = false;
                          },
                        }),
                      ),
                    ),
                  ),
                ]
              : h(AutoLink, {
                  config: child,
                  onFocusout: () => {
                    if (isLastItemOfArray(child, config.value.children))
                      open.value = false;
                  },
                }),
          ),
        ),
      ),
    ];
  },
});
