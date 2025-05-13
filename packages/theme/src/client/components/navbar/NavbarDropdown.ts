import type { Slot } from "@vuepress/helper/client";
import type { PropType, SlotsType, VNode } from "vue";
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

import "../../styles/navbar/navbar-dropdown.scss";

export default defineComponent({
  name: "NavbarDropdown",

  props: {
    /**
     * Dropdown config
     *
     * 下拉列表配置
     */
    config: {
      type: Object as PropType<
        NavGroup<AutoLinkOptions | NavGroup<AutoLinkOptions>>
      >,

      required: true,
    },
  },

  slots: Object as SlotsType<{
    title?: Slot;
  }>,

  setup(props, { slots }) {
    const config = toRef(props, "config");

    const dropdownAriaLabel = computed(
      () => config.value.ariaLabel ?? config.value.text,
    );

    const open = ref(false);

    /**
     * Open the dropdown when user tab and click from keyboard.
     *
     * Use event.detail to detect tab and click from keyboard.
     * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
     */
    const handleDropdown = (event: MouseEvent): void => {
      const isTriggerByTab = event.detail === 0;

      if (isTriggerByTab) open.value = !open.value;
    };

    onContentUpdated(() => {
      open.value = false;
    });

    return (): VNode =>
      h("div", { class: ["vp-dropdown-wrapper", { open: open.value }] }, [
        h(
          "button",
          {
            type: "button",
            class: "vp-dropdown-title",
            "aria-label": dropdownAriaLabel.value,
            onClick: handleDropdown,
          },
          [
            slots.title?.() ?? [
              h(resolveComponent("VPIcon"), { icon: config.value.icon }),
              props.config.text,
            ],
            h("span", { class: "arrow" }),
            h(
              "ul",
              { class: "vp-dropdown" },
              config.value.children.map((child, index) => {
                const isLastChild = index === config.value.children.length - 1;

                return h(
                  "li",
                  { class: "vp-dropdown-item" },
                  "children" in child
                    ? [
                        h(
                          "h4",
                          { class: "vp-dropdown-subtitle" },
                          child.link
                            ? h(AutoLink, {
                                config: child as AutoLinkOptions,
                                onFocusout: () => {
                                  if (
                                    // No children
                                    child.children.length === 0 &&
                                    isLastChild
                                  )
                                    open.value = false;
                                },
                              })
                            : child.text,
                        ),
                        h(
                          "ul",
                          { class: "vp-dropdown-subitems" },
                          child.children.map((grandchild, grandIndex) =>
                            h(
                              "li",
                              { class: "vp-dropdown-subitem" },
                              h(AutoLink, {
                                config: grandchild,
                                onFocusout: () => {
                                  if (
                                    // Last item of grandchild
                                    grandIndex === child.children.length - 1 &&
                                    isLastChild
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
                          if (isLastChild) open.value = false;
                        },
                      }),
                );
              }),
            ),
          ],
        ),
      ]);
  },
});
