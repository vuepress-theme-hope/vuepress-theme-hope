import Vue from "vue";
import PWAInstallModal from "./PWAInstallModal.vue";
import { i18n } from "./define";

import type { ManifestRelatedApps } from "../types";

interface ModernNavigator extends Navigator {
  // Unstandard Api
  getInstalledRelatedApps: () => Promise<ManifestRelatedApps[]>;
}

interface SafariNavigator extends Navigator {
  // Available on Apple’s iOS Safari only.
  standalone: boolean;
}

export default Vue.extend({
  name: "PWAInstall",

  components: { PWAInstallModal },

  data: () => ({
    canInstall: false,
    hasRelatedApps: false,
    isOpen: false,
    isIOS: false,
    isSafari: false,
    hinted: false,
  }),

  computed: {
    install(): string {
      return i18n[this.$localePath || "/"].install;
    },

    useHint(): boolean {
      return this.isIOS && this.isSafari && this.hinted === false;
    },

    showInstall(): boolean {
      return (this.hasRelatedApps && this.canInstall) || this.useHint;
    },
  },

  mounted(): void {
    if (this.getInstalledStatus()) {
      const { userAgent } = navigator;

      // handle iOS specifically
      this.isIOS =
        // regular iPhone
        userAgent.includes("iPhone") ||
        // regular iPad
        userAgent.includes("iPad") ||
        // iPad pro
        Boolean(
          userAgent.includes("Macintosh") &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2
        );

      this.isSafari =
        navigator.userAgent.includes("Safari") && !userAgent.includes("Chrome");

      this.hinted = Boolean(localStorage.getItem("iOS-pwa-hint"));
    }

    if ("getInstalledRelatedApps" in (navigator as ModernNavigator))
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

    hint(): void {
      this.isOpen = false;
      this.hinted = true;
      // do not notify again
      localStorage.setItem("iOS-pwa-hint", "hinted");
    },
  },
});
