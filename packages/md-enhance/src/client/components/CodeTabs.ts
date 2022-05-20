import { ClientOnly } from "@vuepress/client";
import { useStorage } from "@vueuse/core";
import { defineComponent, h, ref, watch } from "vue";
import type { PropType, VNode } from "vue";

import "../styles/code-tabs.scss";

const codeTabStore = useStorage<Record<string, string>>(
  "VUEPRESS_CODE_TAB_STORE",
  {}
);

export default defineComponent({
  name: "CodeTabs",

  props: {
    active: { type: Number, default: 0 },
    data: {
      type: Array as PropType<
        {
          code: string;
          title: string;
        }[]
      >,
      required: true,
    },
    codeId: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const getInitialIndex = (): number => {
      if (props.codeId) {
        const valueIndex = props.data.findIndex(
          ({ title }) => codeTabStore.value[props.codeId] === title
        );

        if (valueIndex !== -1) return valueIndex;
      }

      return props.active;
    };

    // index of current active item
    const activeIndex = ref(getInitialIndex());

    // refs of the tab buttons
    const tabRefs = ref<HTMLUListElement[]>([]);

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

      if (props.codeId)
        codeTabStore.value[props.codeId] = props.data[activeIndex.value].title;
    };

    watch(
      () => codeTabStore.value[props.codeId],
      (newValue, oldValue) => {
        if (props.codeId && newValue !== oldValue) {
          const index = props.data.findIndex(({ title }) => title === newValue);

          if (index !== -1) activeIndex.value = index;
        }
      }
    );

    return (): VNode | null => {
      return h(ClientOnly, () =>
        props.data.length
          ? h("div", { class: "code-tabs" }, [
              h(
                "div",
                { class: "code-tabs-nav" },
                props.data.map(({ title }, index) => {
                  const isActive = index === activeIndex.value;

                  return h(
                    "button",
                    {
                      ref: (element) => {
                        if (element)
                          tabRefs.value[index] = element as HTMLUListElement;
                      },
                      class: ["code-tabs-nav-tab", { active: isActive }],
                      "aria-pressed": isActive,
                      "aria-expanded": isActive,
                      onClick: () => {
                        activeIndex.value = index;
                      },
                      onKeydown: (event: KeyboardEvent) =>
                        keyboardHandler(event, index),
                    },
                    title
                  );
                })
              ),
              props.data.map(({ code }, index) => {
                const isActive = index === activeIndex.value;

                return h("div", {
                  class: ["code-tab", { active: isActive }],
                  "aria-selected": isActive,
                  innerHTML: code,
                });
              }),
            ])
          : null
      );
    };
  },
});
