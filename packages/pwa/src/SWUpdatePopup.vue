<template>
  <transition name="sw-update-popup">
    <slot :reload="reload" :enabled="enabled" :message="message" :buttonText="buttonText">
      <div v-if="enabled" class="sw-update-popup">
        {{ message }}
        <br />
        <button @click="reload">{{ buttonText }}</button>
      </div>
    </slot>
  </transition>
</template>

<script lang='ts'>
/* global SW_UPDATE_POPUP */
import { Component, Prop, Vue } from 'vue-property-decorator';
import event from './event';
import { i18n } from '@mr-hope/vuepress-shared-utils';

@Component
export default class SWUpdatePopup extends Vue {
  private updateEvent: any = null;

  private get enabled() {
    return Boolean(this.updateEvent);
  }

  private get message() {
    const { message } = i18n.getLocale(this.$lang).pwa;

    return message;
  }

  private get buttonText() {
    const { buttonText } = i18n.getLocale(this.$lang).pwa;

    return buttonText;
  }

  private onSWUpdated(updateEvent: any) {
    this.updateEvent = updateEvent;
  }

  private reload() {
    if (this.updateEvent) {
      this.updateEvent.skipWaiting().then(() => {
        location.reload(true);
      });
      this.updateEvent = null;
    }
  }
}
</script>

<style lang="stylus" scoped>
.sw-update-popup
  position fixed
  right 1em
  bottom 1em
  padding 1em
  border 1px solid #3eaf7c
  border-radius 3px
  background #fff
  box-shadow 0 4px 16px rgba(0, 0, 0, 0.5)
  text-align center
  z-index 2

.sw-update-popup > button
  margin-top 0.5em
  padding 0.25em 2em

.sw-update-popup-enter-active, .sw-update-popup-leave-active
  transition opacity 0.3s, transform 0.3s

.sw-update-popup-enter, .sw-update-popup-leave-to
  opacity 0
  transform translate(0, 50%) scale(0.5)
</style>
