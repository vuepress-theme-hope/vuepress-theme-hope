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

  hinted = false;

  get install(): string {
    return i18n[this.$localePath || "/"].install;
  }

  get showInstall(): boolean {
    return (
      (this.hasRelatedApps && this.canInstall) ||
      (this.isIOS && this.hinted === false)
    );
  }

  mounted(): void {
    if (
      "standalone" in navigator &&
      (navigator as SafariNavigator).standalone === false
    ) {
      this.isIOS = true;
      this.hinted = Boolean(localStorage.getItem("iOS-pwa-hint"));
    }

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

  hide(): void {
    this.isOpen = false;
    this.hinted = true;
    localStorage.setItem("iOS-pwa-hint", "hinted");
  }
}
