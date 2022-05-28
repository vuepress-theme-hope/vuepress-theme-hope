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

    return (): VNode =>
      h("div", { class: ["dropdown-wrapper", { open: open.value }] }, [
        h(
          "button",
          {
            class: "dropdown-title",
            type: "button",
            "aria-label": dropdownAriaLabel.value,
            onClick: handleDropdown,
          },
          [
            slots["title"]?.() ||
              h("span", { class: "title" }, [
                h(resolveComponent("FontIcon"), { icon: config.value.icon }),
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
                                    // no children
                                    child.children.length === 0 &&
                                    isLastChild
                                  )
                                    open.value = false;
                                },
                              })
                            : h("span", child.text)
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
                                    // last item of grandchild
                                    grandIndex === child.children.length - 1 &&
                                    isLastChild
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
                          if (isLastChild) open.value = false;
                        },
                      })
                );
              })
            ),
          ]
        ),
      ]);
  },
});
