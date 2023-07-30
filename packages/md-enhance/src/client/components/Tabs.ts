import { useStorage } from "@vueuse/core";
import type { PropType, SlotsType, VNode } from "vue";
import { defineComponent, h, onMounted, ref, shallowRef, watch } from "vue";

import "../styles/tabs.scss";

export interface TabProps extends Record<string, unknown> {
  id: string;
}

const tabStore = useStorage<Record<string, string>>("VUEPRESS_TAB_STORE", {});

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tabs",

  props: {
    /**
     * Active tab index
     *
     * 激活的标签页序号
     */
    active: {
      type: Number,
      default: 0,
    },

    /**
     * tab data
     *
     * 标签页数据
     */
    data: {
      type: Array as PropType<TabProps[]>,
      required: true,
    },

    /**
     * Tab id
     *
     * 标签页 id
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * tab id
     *
     * 标签页 id
     */
    tabId: {
      type: String,
      default: "",
    },
  },

  slots: Object as SlotsType<{
    [slot: `title${number}`]: (props: {
      value: string;
      isActive: boolean;
    }) => VNode[];
    [slot: `tab${number}`]: (props: {
      value: string;
      isActive: boolean;
    }) => VNode[];
  }>,

  setup(props, { slots }) {
    // index of current active item
    // eslint-disable-next-line vue/no-setup-props-destructure
    const activeIndex = ref(props.active);

    // refs of the tab buttons
    const tabRefs = shallowRef<HTMLUListElement[]>([]);

    // update store
    const updateStore = (): void => {
      if (props.tabId)
        tabStore.value[props.tabId] = props.data[activeIndex.value].id;
    };

    // activate next tab
    const activateNext = (index = activeIndex.value): void => {
      activeIndex.value = index < tabRefs.value.length - 1 ? index + 1 : 0;
      tabRefs.value[activeIndex.value].focus();
    };

    // activate previous tab
    const activatePrev = (index = activeIndex.value): void => {
      activeIndex.value = index > 0 ? index - 1 : tabRefs.value.length - 1;
      tabRefs.value[activeIndex.value].focus();
    };

    // handle keyboard event
    const keyboardHandler = (event: KeyboardEvent, index: number): void => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = index;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev();
      }

      updateStore();
    };

    const getInitialIndex = (): number => {
      if (props.tabId) {
        const valueIndex = props.data.findIndex(
          ({ id }) => tabStore.value[props.tabId] === id,
        );

        if (valueIndex !== -1) return valueIndex;
      }

      return props.active;
    };

    onMounted(() => {
      activeIndex.value = getInitialIndex();

      watch(
        () => tabStore.value[props.tabId],
        (newValue, oldValue) => {
          if (props.tabId && newValue !== oldValue) {
            const index = props.data.findIndex(({ id }) => id === newValue);

            if (index !== -1) activeIndex.value = index;
          }
        },
      );
    });

    return (): VNode | null =>
      props.data.length
        ? h("div", { class: "vp-tabs" }, [
            h(
              "div",
              { class: "vp-tabs-nav", role: "tablist" },
              props.data.map(({ id }, index) => {
                const isActive = index === activeIndex.value;

                return h(
                  "button",
                  {
                    type: "button",
                    ref: (element) => {
                      if (element)
                        tabRefs.value[index] = <HTMLUListElement>element;
                    },
                    class: ["vp-tab-nav", { active: isActive }],
                    role: "tab",
                    "aria-controls": `tab-${props.id}-${index}`,
                    "aria-selected": isActive,
                    onClick: () => {
                      activeIndex.value = index;
                      updateStore();
                    },
                    onKeydown: (event: KeyboardEvent) =>
                      keyboardHandler(event, index),
                  },
                  slots[`title${index}`]({ value: id, isActive }),
                );
              }),
            ),
            props.data.map(({ id }, index) => {
              const isActive = index === activeIndex.value;

              return h(
                "div",
                {
                  class: ["vp-tab", { active: isActive }],
                  id: `tab-${props.id}-${index}`,
                  role: "tabpanel",
                  "aria-expanded": isActive,
                },
                slots[`tab${index}`]({ value: id, isActive }),
              );
            }),
          ])
        : null;
  },
});
