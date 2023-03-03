import {
  type Component,
  type FunctionalComponent,
  type VNode,
  defineComponent,
  h,
  onBeforeUpdate,
  ref,
} from "vue";

import "../styles/code-group.scss";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_DEV__: boolean;

export interface CodeGroupItemProps {
  title: string;
  active?: boolean;
}

export const CodeGroupItem: FunctionalComponent<CodeGroupItemProps> = (
  { active = false },
  { slots }
): VNode =>
  h(
    "div",
    {
      class: ["code-group-item", { active }],
      "aria-selected": active,
    },
    slots["default"]?.()
  );

CodeGroupItem.displayName = "CodeGroupItem";

export const CodeGroup = defineComponent({
  name: "CodeGroup",

  setup(_props, { slots }) {
    // index of current active item
    const activeIndex = ref(-1);

    // refs of the tab buttons
    const tabRefs = ref<HTMLUListElement[]>([]);

    // after removing a code-group-item, we need to clear the ref
    // of the removed item to avoid issues caused by HMR
    if (__VUEPRESS_DEV__)
      onBeforeUpdate(() => {
        tabRefs.value = [];
      });

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
        activateNext(i);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev(i);
      }
    };

    return (): VNode | null => {
      // NOTICE: here we put the `slots.default()` inside the render function to make
      // the slots reactive, otherwise the slot content won’t be changed once the
      // `setup()` function of current component is called

      // get children code-group-item
      const items = (slots["default"]?.() || [])
        .filter((vNode) => (vNode.type as Component).name === "CodeGroupItem")
        .map((vNode) => {
          if (vNode.props === null) vNode.props = {};

          return vNode as VNode & { props: Exclude<VNode["props"], null> };
        });

      // do not render anything if there is no code-group-item
      if (items.length === 0) return null;

      // if `activeIndex` is invalid
      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        // find the index of the code-group-item with `active` props
        activeIndex.value = items.findIndex((vNode) => "active" in vNode.props);

        // if there is no `active` props on code-group-item, set the first item active
        if (activeIndex.value === -1) activeIndex.value = 0;
      }
      // set the active item
      else {
        items.forEach((vNode, index) => {
          vNode.props["active"] = index === activeIndex.value;
        });
      }

      return h("div", { class: "code-group" }, [
        h(
          "div",
          { class: "code-group-nav" },
          items.map((vNode, index) => {
            const isActive = index === activeIndex.value;

            return h(
              "button",
              {
                ref: (element) => {
                  if (element) tabRefs.value[index] = <HTMLUListElement>element;
                },
                class: ["code-group-nav-tab", { active: isActive }],
                "aria-pressed": isActive,
                "aria-expanded": isActive,
                onClick: () => {
                  activeIndex.value = index;
                },
                onKeydown: (event: KeyboardEvent) =>
                  keyboardHandler(event, index),
              },
              <string[]>vNode.props["title"]
            );
          })
        ),
        items,
      ]);
    };
  },
});
