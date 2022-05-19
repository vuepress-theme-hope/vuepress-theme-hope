import { defineComponent, h, ref } from "vue";
import type { PropType, VNode } from "vue";

import "../styles/code-tabs.scss";

export default defineComponent({
  name: "CodeTabs",

  props: {
    active: { type: Number, default: 0 },
    // active: { type: Number, required: true },
    data: {
      type: Array as PropType<
        {
          code: string;
          title: string;
        }[]
      >,
      default: () => [],
    },
    // data: { type: Array as PropType<CodeData[]>, required: true },
  },

  setup(props) {
    // index of current active item
    const activeIndex = ref(
      // initialized by props
      props.active
    );

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
    };

    return (): VNode | null => {
      return props.data.length
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
        : null;
    };
  },
});
