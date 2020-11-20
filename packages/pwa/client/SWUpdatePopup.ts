import { Component, Vue } from "vue-property-decorator";
import event from "./event";
import { i18n } from "./define";

@Component
export default class SWUpdatePopup extends Vue {
  private updateEvent: { skipWaiting: () => Promise<void> } | null = null;

  private get enabled(): boolean {
    return Boolean(this.updateEvent);
  }

  private get message(): string {
    return i18n[this.$localePath || "/"].update;
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
