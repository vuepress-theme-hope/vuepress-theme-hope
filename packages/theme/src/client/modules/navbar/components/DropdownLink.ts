import type { PropType, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, ref, toRef, watch } from "vue";
import { usePageData } from "vuepress/client";

import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";

import type {
  AutoLinkOptions as AutoLinkType,
  NavGroup,
} from "../../../../shared/index.js";

import "../styles/dropdown-link.scss";

export default defineComponent({
  name: "NavbarDropdownLink",

  props: {
    /**
     * Dropdown config
     *
     * 下拉列表配置
     */
    config: {
      type: Object as PropType<NavGroup<AutoLinkType | NavGroup<AutoLinkType>>>,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    title: () => VNode;
  }>,

  setup(props, { slots }) {
    const page = usePageData();
    const config = toRef(props, "config");

    const dropdownAriaLabel = computed(
      () => config.value.ariaLabel || config.value.text,
    );

    const open = ref(false);

    watch(
      () => page.value.path,
      () => {
        open.value = false;
      },
    );

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

    return (): VNode =>
      h("div", { class: ["dropdown-wrapper", { open: open.value }] }, [
        h(
          "button",
          {
            type: "button",
            class: "dropdown-title",
            "aria-label": dropdownAriaLabel.value,
            onClick: handleDropdown,
          },
          [
            slots.title?.() ||
              h("span", { class: "title" }, [
                h(HopeIcon, { icon: config.value.icon }),
                props.config.text,
              ]),
            h("span", { class: "arrow" }),
            h(
              "ul",
              { class: "nav-dropdown" },
              config.value.children.map((child, index) => {
                const isLastChild = index === config.value.children.length - 1;

                return h(
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
                                    // No children
                                    child.children.length === 0 &&
                                    isLastChild
                                  )
                                    open.value = false;
                                },
                              })
                            : h("span", child.text),
                        ),
                        h(
                          "ul",
                          { class: "dropdown-subitem-wrapper" },
                          child.children.map((grandchild, grandIndex) =>
                            h(
                              "li",
                              { class: "dropdown-subitem" },
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
