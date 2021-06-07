<template>
  <transition
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
  </transition>
  <transition-group
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
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { PropType } from "vue";

export default defineComponent({
  name: "DropTransition",

  props: {
    type: { type: String as PropType<"single" | "group">, default: "single" },
    delay: { type: Number, default: 0 },
    duration: { type: Number, default: 0.25 },
  },

  setup(props) {
    const setStyle = (items: HTMLElement): void => {
      items.style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      items.style.transform = "translateY(-20px)";
      items.style.opacity = "0";
    };

    const unsetStyle = (items: HTMLElement): void => {
      items.style.transform = "translateY(0)";
      items.style.opacity = "1";
    };

    return {
      setStyle,
      unsetStyle,
    };
  },
});
</script>
