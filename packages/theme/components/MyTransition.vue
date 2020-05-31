<template>
  <transition
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MyTransition extends Vue {
  @Prop({ type: Number, default: 0 })
  private readonly delay!: number;

  @Prop({ type: Number, default: 0.25 })
  private readonly duration!: number;

  private setStyle(items: HTMLElement) {
    items.style.transition = `transform ${this.duration}s ease-in-out ${this.delay}s, opacity ${this.duration}s ease-in-out ${this.delay}s`;
    items.style.transform = "translateY(-20px)";
    items.style.opacity = "0";
  }

  private unsetStyle(items: HTMLElement) {
    items.style.transform = "translateY(0)";
    items.style.opacity = "1";
  }
}
</script>

<style lang="stylus">
.drop-enter, .drop-leave-to
  opacity 0
  transform translateY(-20px)
</style>
