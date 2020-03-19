<template>
  <transition
    name="module"
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ModuleTransition extends Vue {
  @Prop({ type: String, default: '0' })
  private readonly delay!: string;

  @Prop({ type: String, default: '.25' })
  private readonly duration!: string;

  private setStyle(items: HTMLElement) {
    items.style.transition = `all ${this.duration}s ease-in-out ${this.delay}s`;
    items.style.transform = 'translateY(-20px)';
    items.style.opacity = '0';
  }

  private unsetStyle(items: HTMLElement) {
    items.style.transform = 'translateY(0)';
    items.style.opacity = '1';
  }
}
</script>

<style lang="stylus">
.module-enter, .module-leave-to
  opacity 0
  transform translateY(-20px)
</style>
