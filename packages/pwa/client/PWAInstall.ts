import Vue from "vue";
import PWAInstallModal from "./PWAInstallModal.vue";
import { SafariNavigator } from "./PWAInstallModal";
import { i18n } from "./define";

interface ModernNavigator extends Navigator {
  getInstalledRelatedApps: () => Promise<unknown[]>;
}

export default Vue.extend({
  name: "PWAInstall",

  components: { PWAInstallModal },

  data: () => ({
    canInstall: false,
    hasRelatedApps: false,
    isOpen: false,
    isIOS: false,
    hinted: false,
  }),

  computed: {
    install(): string {
      return i18n[this.$localePath || "/"].install;
    },

    showInstall(): boolean {
      return (
        (this.hasRelatedApps && this.canInstall) ||
        (this.isIOS && this.hinted === false)
      );
    },
  },

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
  },

  methods: {
    getInstalledStatus(): boolean {
      if ((navigator as SafariNavigator).standalone)
        return (navigator as SafariNavigator).standalone;

      return matchMedia("(display-mode: standalone)").matches;
    },

    hide(): void {
      this.isOpen = false;
      this.hinted = true;
      localStorage.setItem("iOS-pwa-hint", "hinted");
    },
  },
});
