import { computed, defineComponent, h, ref, toRef, watch } from "vue";
import { useRoute } from "vue-router";
import AutoLink from "../AutoLink";
import ExpandTransition from "../transitions/ExpandTransition";
import { useIconPrefix } from "../../composables";

import type { PropType, VNode } from "vue";
import type { AutoLink as AutoLinkType, NavGroup } from "../../../shared";

export default defineComponent({
  name: "SidebarDropdownLink",

  props: {
    config: {
      type: Object as PropType<NavGroup<AutoLinkType | NavGroup<AutoLinkType>>>,
      required: true,
    },
  },

  setup(props, { slots }) {
    const route = useRoute();
    const iconPrefix = useIconPrefix();
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

    return (): VNode =>
      h("div", { class: ["mobile-dropdown-wrapper", { open: open.value }] }, [
        h(
          "button",
          {
            class: "dropdown-title",
            type: "button",
            ariaLabel: dropdownAriaLabel.value,
            onClick: () => {
              open.value = !open.value;
            },
          },
          [
            slots.title?.() ||
              h("span", { class: "title" }, [
                config.value.icon
                  ? h("i", {
                      class: `iconfont ${iconPrefix.value}${config.value.icon}`,
                    })
                  : null,
                props.config.text,
              ]),
            h("span", { class: ["arrow", open.value ? "down" : "right"] }),
          ]
        ),
        h(ExpandTransition, {
          default: () =>
            h(
              "ul",
              {
                class: "nav-dropdown",
                style: {
                  display: open.value ? "block" : "none",
                },
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
                                    isLastItemOfArray(
                                      child,
                                      config.value.children
                                    ) &&
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
                                    isLastItemOfArray(
                                      grandchild,
                                      child.children
                                    ) &&
                                    isLastItemOfArray(
                                      child,
                                      config.value.children
                                    )
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
        }),
      ]);
  },
});
