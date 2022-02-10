import { computed, defineComponent, h, ref, toRef, watch } from "vue";
import { useRoute } from "vue-router";

import AutoLink from "@theme-hope/components/AutoLink";
import { useIconPrefix } from "@theme-hope/composables";

import type { PropType, VNode } from "vue";
import type {
  AutoLink as AutoLinkType,
  HopeThemeNavGroup,
} from "../../../../shared";

import "../styles/dropdown-link.scss";

export default defineComponent({
  name: "NavbarDropdownLink",

  props: {
    config: {
      type: Object as PropType<
        HopeThemeNavGroup<AutoLinkType | HopeThemeNavGroup<AutoLinkType>>
      >,
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

    const isLastItemOfArray = <T>(item: T, arr: T[]): boolean =>
      arr[arr.length - 1] === item;

    return (): VNode =>
      h("div", { class: ["dropdown-wrapper", { open: open.value }] }, [
        h(
          "button",
          {
            class: "dropdown-title",
            type: "button",
            ariaLabel: dropdownAriaLabel.value,
            onClick: handleDropdown,
          },
          [
            slots.title?.() ||
              h("span", { class: "title" }, [
                config.value.icon
                  ? h("i", {
                      class: `icon ${iconPrefix.value}${config.value.icon}`,
                    })
                  : null,
                props.config.text,
              ]),
            h("span", { class: "arrow" }),
            h(
              "ul",
              { class: "nav-dropdown" },
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
          ]
        ),
      ]);
  },
});
