import {
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
  toRef,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import AutoLink from "@theme-hope/components/AutoLink";

import type { PropType, VNode } from "vue";
import type {
  AutoLink as AutoLinkType,
  HopeThemeNavGroup,
} from "../../../../shared";

import "../styles/nav-screen-dropdown.scss";

export default defineComponent({
  name: "NavScreenDropdown",

  props: {
    config: {
      type: Object as PropType<
        HopeThemeNavGroup<AutoLinkType | HopeThemeNavGroup<AutoLinkType>>
      >,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const config = toRef(props, "config");

    const dropdownAriaLabel = computed(
      () => config.value.ariaLabel || config.value.text
    );

    const open = ref(false);

    watch(
      () => route.path,
      () => {
        open.value = false;
      }
    );

    const isLastItemOfArray = <T>(item: T, arr: T[]): boolean =>
      arr[arr.length - 1] === item;

    return (): VNode[] => [
      h(
        "button",
        {
          class: ["nav-screen-dropdown-title", { active: open.value }],
          type: "button",
          "aria-label": dropdownAriaLabel.value,
          onClick: () => {
            open.value = !open.value;
          },
        },
        [
          h("span", { class: "title" }, [
            h(resolveComponent("FontIcon"), { icon: config.value.icon }),
            props.config.text,
          ]),
          h("span", { class: ["arrow", open.value ? "down" : "right"] }),
        ]
      ),
      h(
        "ul",
        {
          class: ["nav-screen-dropdown", { hide: !open.value }],
        },
        config.value.children.map((child) =>
          h(
            "li",
            { class: "dropdown-item" },
            "children" in child
              ? [
                  h(
                    "h4",
                    { class: "dropdown-subtitle" },
                    child.link
                      ? h(AutoLink, {
                          config: child as AutoLinkType,
                          onFocusout: () => {
                            if (
                              isLastItemOfArray(child, config.value.children) &&
                              child.children.length === 0
                            )
                              open.value = false;
                          },
                        })
                      : h("span", child.text)
                  ),
                  h(
                    "ul",
                    { class: "dropdown-subitem-wrapper" },
                    child.children.map((grandchild) =>
                      h(
                        "li",
                        { class: "dropdown-subitem" },
                        h(AutoLink, {
                          config: grandchild,
                          onFocusout: () => {
                            if (
                              isLastItemOfArray(grandchild, child.children) &&
                              isLastItemOfArray(child, config.value.children)
                            )
                              open.value = false;
                          },
                        })
                      )
                    )
                  ),
                ]
              : h(AutoLink, {
                  config: child,
                  onFocusout: () => {
                    if (isLastItemOfArray(child, config.value.children))
                      open.value = false;
                  },
                })
          )
        )
      ),
    ];
  },
});
