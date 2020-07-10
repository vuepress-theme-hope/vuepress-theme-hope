import { Component, Vue } from "vue-property-decorator";
import event from "./event";
import { HopeLangI18nConfigItem, i18n } from "@mr-hope/vuepress-shared-utils";

@Component
export default class SWUpdatePopup extends Vue {
  private updateEvent: { skipWaiting: () => Promise<void> } | null = null;

  private get enabled(): boolean {
    return Boolean(this.updateEvent);
  }

  private get message(): HopeLangI18nConfigItem["pwa"] {
    return i18n.getLocale(this.$lang).pwa || i18n.getDefaultLocale().pwa;
  }

  private created(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    event.$on("sw-updated", this.onSWUpdated);
  }

  private onSWUpdated(updateEvent: { skipWaiting: () => Promise<void> }): void {
    this.updateEvent = updateEvent;
  }

  private reload(): void {
    if (this.updateEvent)
      void this.updateEvent.skipWaiting().then(() => {
        location.reload(true);
        this.updateEvent = null;
      });
  }
}
