<template>
  <Transition
    v-if="type === 'single'"
    name="drop"
    appear
    @appear="setStyle"
    @after-appear="unsetStyle"
    @enter="setStyle"
    @after-enter="unsetStyle"
    @before-leave="setStyle"
  >
    <slot />
  </Transition>
  <TransitionGroup
    v-if="type === 'group'"
    name="drop"
    appear
    @appear="setStyle"
    @after-appear="unsetStyle"
    @enter="setStyle"
    @after-enter="unsetStyle"
    @before-leave="setStyle"
  >
    <slot />
  </TransitionGroup>
</template>

<script lang="ts">
import { Transition, TransitionGroup, defineComponent } from "vue";

import type { PropType } from "vue";

export default defineComponent({
  name: "DropTransition",

  components: {
    Transition,
    TransitionGroup,
  },

  props: {
    type: { type: String as PropType<"single" | "group">, default: "single" },
    delay: { type: Number, default: 0 },
    duration: { type: Number, default: 0.25 },
  },

  setup(props) {
    const setStyle = (item: Element): void => {
      (
        item as HTMLElement
      ).style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      (item as HTMLElement).style.transform = "translateY(-20px)";
      (item as HTMLElement).style.opacity = "0";
    };

    const unsetStyle = (item: Element): void => {
      (item as HTMLElement).style.transform = "translateY(0)";
      (item as HTMLElement).style.opacity = "1";
    };

    return {
      setStyle,
      unsetStyle,
    };
  },
});
</script>
