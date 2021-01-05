/* eslint-disable vue/require-explicit-emits */
import Vue from "vue";
import { ManifestOption } from "../types";
import ArrowLeftIcon from "./icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "./icons/ArrowRightIcon.vue";
import CloseIcon from "./icons/CloseIcon.vue";
import { PWAI18NConfig } from "@mr-hope/vuepress-shared";
import { i18n } from "./define";

export interface SafariNavigator extends Navigator {
  standalone: boolean;
}

interface InstallPromptEvent extends Event {
  readonly platforms: string;
  prompt: () => void;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default Vue.extend({
  name: "PWAInstallModal",

  components: { ArrowLeftIcon, ArrowRightIcon, CloseIcon },

  data: () => ({
    manifest: {} as ManifestOption,
    isIOS: false,

    deferredprompt: null as InstallPromptEvent | null,
  }),

  computed: {
    i18n(): PWAI18NConfig {
      return i18n[this.$localePath || "/"];
    },
  },

  mounted(): void {
    // eslint-disable-next-line no-prototype-builtins
    if (window.hasOwnProperty("BeforeInstallPromptEvent")) {
      // handle iOS specifically, includes the regular iPad, iPad pro but not macOS
      this.isIOS =
        navigator.userAgent.includes("iPhone") ||
        navigator.userAgent.includes("iPad") ||
        Boolean(
          navigator.userAgent.includes("Macintosh") &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2
        );

      if (this.isIOS) this.$emit("can-install", true);

      // grab an install event
      window.addEventListener("beforeinstallprompt", (event) => {
        this.deferredprompt = event as InstallPromptEvent;

        this.$emit("can-install", true);
        event.preventDefault();
      });

      void this.getManifest();

      document.addEventListener("keyup", (event) => {
        if (event.key === "Escape") this.$emit("toogle", false);
      });
    }
  },

  methods: {
    async getManifest(): Promise<void> {
      const manifestContent = localStorage.getItem("manifest");

      if (manifestContent)
        this.manifest = JSON.parse(manifestContent) as ManifestOption;
      else
        try {
          const response = await fetch(`${SW_BASE_URL}manifest.webmanifest`);
          const data = (await response.json()) as ManifestOption;

          this.manifest = data;
          localStorage.setItem("manifest", JSON.stringify(data));
        } catch (err) {
          console.error(
            "Error getting manifest, check that you have a valid web manifest or network connection"
          );
        }
    },

    scrollToLeft(): void {
      const screenshotsDiv = document.querySelector(".screenshot");

      if (screenshotsDiv)
        screenshotsDiv.scrollBy({
          left: -screenshotsDiv.clientWidth,
          top: 0,
          behavior: "smooth",
        });
    },

    scrollToRight(): void {
      const screenshotsDiv = document.querySelector(".screenshot");
      if (screenshotsDiv)
        screenshotsDiv.scrollBy({
          left: screenshotsDiv.clientWidth,
          top: 0,
          behavior: "smooth",
        });
    },

    async install(): Promise<boolean> {
      if (this.deferredprompt) {
        this.deferredprompt.prompt();

        document.dispatchEvent(new CustomEvent("show"));

        const choiceResult = await this.deferredprompt.userChoice;

        if (choiceResult.outcome === "accepted") {
          console.info("PWA has been installed");

          this.$emit("toogle", false);
          this.$emit("can-install", false);

          return true;
        } else {
          console.info("You choose to not install PWA");

          this.$emit("toogle", false);
          this.$emit("can-install", false);
        }
      }

      return false;
    },

    hide(): void {
      console.info("User accept the hint");
      this.$emit("hide");
    },
  },
});
