import { useStorage } from "@vueuse/core";
import {
  type PropType,
  type VNode,
  defineComponent,
  h,
  onMounted,
  ref,
  watch,
} from "vue";

import "../styles/tabs.scss";

export interface TabProps extends Record<string, unknown> {
  title: string;
  id?: string;
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

  setup(props, { slots }) {
    // index of current active item
    const activeIndex = ref(props.active);

    // refs of the tab buttons
    const tabRefs = ref<HTMLUListElement[]>([]);

    // update store
    const updateStore = (): void => {
      if (props.tabId) {
        const { title, id: value = title } = props.data[activeIndex.value];

        tabStore.value[props.tabId] = value;
      }
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
          ({ title, id: value = title }) =>
            tabStore.value[props.tabId] === value
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
            const index = props.data.findIndex(
              ({ title, id: value = title }) => value === newValue
            );

            if (index !== -1) activeIndex.value = index;
          }
        }
      );
    });

    return (): VNode | null =>
      props.data.length
        ? h("div", { class: "tab-list" }, [
            h(
              "div",
              { class: "tab-list-nav", role: "tablist" },
              props.data.map(({ title }, index) => {
                const isActive = index === activeIndex.value;

                return h(
                  "button",
                  {
                    ref: (element) => {
                      if (element)
                        tabRefs.value[index] = <HTMLUListElement>element;
                    },
                    class: ["tab-list-nav-item", { active: isActive }],
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
                  title
                );
              })
            ),
            props.data.map(({ title, id: value = title }, index) => {
              const isActive = index === activeIndex.value;

              return h(
                "div",
                {
                  class: ["tab-item", { active: isActive }],
                  id: `tab-${props.id}-${index}`,
                  role: "tabpanel",
                  "aria-expanded": isActive,
                },
                slots[`tab${index}`]?.({ title, value, isActive })
              );
            }),
          ])
        : null;
  },
});
