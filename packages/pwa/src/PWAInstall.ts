import { Component, Vue } from "vue-property-decorator";
import PWAInstallModal from "./PWAInstallModal.vue";
import { SafariNavigator } from "./PWAInstallModal";
import { i18n } from "./define";

interface ModernNavigator extends Navigator {
  getInstalledRelatedApps: () => Promise<unknown[]>;
}

@Component({ components: { PWAInstallModal } })
export default class PWAInstall extends Vue {
  canInstall = false;
  hasRelatedApps = false;
  isOpen = false;

  isIOS = false;

  get install(): string {
    return i18n[this.$localePath || "/"].install;
  }

  get showInstall(): boolean {
    return this.hasRelatedApps && this.canInstall;
  }

  mounted(): void {
    this.isIOS =
      "standalone" in navigator &&
      (navigator as SafariNavigator).standalone === false;

    if ("getInstalledRelatedApps" in navigator)
      void (navigator as ModernNavigator)
        .getInstalledRelatedApps()
        .then((result) => {
          this.hasRelatedApps = result.length > 0;
        });
  }

  getInstalledStatus(): boolean {
    if ((navigator as SafariNavigator).standalone)
      return (navigator as SafariNavigator).standalone;

    return matchMedia("(display-mode: standalone)").matches;
  }
}
