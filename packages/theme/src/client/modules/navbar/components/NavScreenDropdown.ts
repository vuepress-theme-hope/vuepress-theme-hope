import {
  type PropType,
  type VNode,
  computed,
  defineComponent,
  h,
  ref,
  toRef,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import AutoLink from "@theme-hope/components/AutoLink";
import Icon from "@theme-hope/components/Icon";

import {
  type AutoLinkOptions as AutoLinkType,
  type NavGroup,
} from "../../../../shared/index.js";

import "../styles/nav-screen-dropdown.scss";

export default defineComponent({
  name: "NavScreenDropdown",

  props: {
    /**
     * Navbar Screen Dropdown list config
     *
     * 导航栏下拉列表配置
     */
    config: {
      type: Object as PropType<NavGroup<AutoLinkType | NavGroup<AutoLinkType>>>,
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
            h(Icon, { icon: config.value.icon }),
            props.config.text,
          ]),
          h("span", { class: ["arrow", open.value ? "down" : "end"] }),
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
                          config: <AutoLinkType>child,
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
