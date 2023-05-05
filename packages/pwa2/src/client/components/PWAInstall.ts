import { useToggle } from "@vueuse/core";
import { type VNode, computed, defineComponent, h, onMounted, ref } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import PWAInstallModal from "./PWAInstallModal.js";
import { type ManifestExternalApplicationResource } from "../../shared/index.js";
import { locales } from "../define.js";

import "../styles/modal.scss";

interface ModernNavigator extends Navigator {
  // Nonstandard Api
  getInstalledRelatedApps: () => Promise<ManifestExternalApplicationResource[]>;
}

interface SafariNavigator extends Navigator {
  // Available on Apple’s iOS Safari only.
  standalone: boolean;
}

export default defineComponent({
  name: "PWAInstall",

  setup() {
    const locale = useLocaleConfig(locales);
    const [isOpen, toggleIsOpen] = useToggle(false);

    const canInstall = ref(false);
    const hasRelatedApps = ref(false);
    const isIOS = ref(false);
    const isSafari = ref(false);
    const hinted = ref(false);

    const useHint = computed(
      () => isIOS.value && isSafari.value && hinted.value === false
    );

    const showInstall = computed(
      () => (hasRelatedApps.value && canInstall.value) || useHint.value
    );

    const getInstalledStatus = (): boolean => {
      if ((navigator as SafariNavigator).standalone)
        return (navigator as SafariNavigator).standalone;

      return matchMedia("(display-mode: standalone)").matches;
    };

    const hint = (): void => {
      toggleIsOpen(false);
      hinted.value = true;
      // do not notify again
      localStorage.setItem("iOS-pwa-hint", "hinted");
    };

    onMounted(() => {
      if (getInstalledStatus()) {
        const { userAgent } = navigator;

        // handle iOS specifically
        isIOS.value =
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

        isSafari.value =
          navigator.userAgent.includes("Safari") &&
          !userAgent.includes("Chrome");

        hinted.value = Boolean(localStorage.getItem("iOS-pwa-hint"));
      }

      if ("getInstalledRelatedApps" in (navigator as ModernNavigator))
        void (navigator as ModernNavigator)
          .getInstalledRelatedApps()
          .then((result) => {
            hasRelatedApps.value = result.length > 0;
          });
    });

    return (): VNode =>
      h("div", { id: "pwa-install" }, [
        showInstall.value
          ? h(
              "button",
              {
                type: "button",
                class: "modal-button",
                onClick: () => {
                  toggleIsOpen(true);
                },
              },
              locale.value.install
            )
          : null,
        h(PWAInstallModal, {
          style: {
            display: isOpen.value ? "block" : "none",
          },
          useHint: useHint.value,
          onCanInstall: (value: boolean) => {
            canInstall.value = value;
          },
          onHint: () => hint(),
          onClose: () => toggleIsOpen(false),
        }),
      ]);
  },
});
