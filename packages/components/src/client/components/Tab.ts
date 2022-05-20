import { ClientOnly } from "@vuepress/client";
import { useStorage } from "@vueuse/core";
import { defineComponent, h, onBeforeUpdate, ref, watch } from "vue";
import type { FunctionalComponent, VNode } from "vue";

import "../styles/tab.scss";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_DEV__: boolean;

export interface TabProps {
  title: string;
  label?: string;
  value?: string;
  active?: boolean;
}

export const Tab: FunctionalComponent<TabProps> = (
  { active = false },
  { slots }
): VNode =>
  h(
    "div",
    {
      class: ["tab-item", { active }],
      "aria-selected": active,
    },
    slots.default?.()
  );

Tab.displayName = "Tab";

const tabStatusStore = useStorage<Record<string, string>>(
  "VUEPRESS_TAB_STORE",
  {}
);

export const Tabs = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tabs",

  props: {
    tabId: {
      type: String,
      default: "",
    },
  },

  setup(props, { slots }) {
    const getTabs = (): (VNode & { props: TabProps })[] =>
      (slots.default?.() || []).filter(
        (vnode) => (vnode.type as FunctionalComponent).displayName === "Tab"
      ) as (VNode & { props: TabProps })[];

    const getInitialActiveIndex = (): number => {
      const tabs = getTabs();

      if (props.tabId) {
        const valueIndex = tabs.findIndex(
          ({ props: componentProps }) =>
            tabStatusStore.value[props.tabId] ===
            (componentProps?.value || componentProps?.title)
        );

        if (valueIndex !== -1) return valueIndex;
      }

      return Math.max(
        tabs.findIndex(({ props }) => (props as TabProps)?.active),
        0
      );
    };

    // index of current active item
    const activeIndex = ref(getInitialActiveIndex());

    // refs of the tab buttons
    const tabRefs = ref<HTMLUListElement[]>([]);

    // activate next tab
    const activateNext = (i = activeIndex.value): void => {
      activeIndex.value = i < tabRefs.value.length - 1 ? i + 1 : 0;
      tabRefs.value[activeIndex.value].focus();
    };

    // activate previous tab
    const activatePrev = (i = activeIndex.value): void => {
      activeIndex.value = i > 0 ? i - 1 : tabRefs.value.length - 1;
      tabRefs.value[activeIndex.value].focus();
    };

    // handle keyboard event
    const keyboardHandler = (event: KeyboardEvent, i: number): void => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = i;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev();
      }
    };

    // after removing a code tab, we need to clear the ref
    // of the removed item to avoid issues caused by HMR
    if (__VUEPRESS_DEV__)
      onBeforeUpdate(() => {
        tabRefs.value = [];
      });

    watch(
      () => tabStatusStore.value[props.tabId],
      (newValue, oldValue) => {
        if (props.tabId && newValue !== oldValue) {
          const tabs = getTabs();
          const index = tabs.findIndex(
            ({ props }) => (props?.value || props?.title) === newValue
          );

          if (index !== -1) activeIndex.value = index;
        }
      }
    );

    return (): VNode | null => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won’t be changed once the
      // `setup()` function of current component is called

      // get tab items
      const tabs = (slots.default?.() || []).filter(
        (vnode) => (vnode.type as FunctionalComponent).displayName === "Tab"
      ) as (VNode & { props: TabProps })[];

      // do not render anything if there is no tab item
      if (tabs.length === 0) return null;

      // set the active item
      tabs.forEach(({ props: componentProps }, index) => {
        const isActive = index === activeIndex.value;

        if (componentProps.active !== isActive)
          componentProps.active = isActive;
        if (isActive && props.tabId)
          tabStatusStore.value[props.tabId] =
            componentProps.value || componentProps.title;
      });

      return h(ClientOnly, () =>
        h("div", { class: "tab-list" }, [
          h(
            "div",
            { class: "tab-list-nav" },
            tabs.map((vnode, index) => {
              const isActive = index === activeIndex.value;

              return h(
                "button",
                {
                  ref: (element) => {
                    if (element)
                      tabRefs.value[index] = element as HTMLUListElement;
                  },
                  class: ["tab-list-nav-item", { active: isActive }],
                  "aria-pressed": isActive,
                  "aria-expanded": isActive,
                  onClick: () => {
                    activeIndex.value = index;
                  },
                  onKeydown: (event: KeyboardEvent) =>
                    keyboardHandler(event, index),
                },
                vnode.props.title
              );
            })
          ),
          tabs,
        ])
      );
    };
  },
});
