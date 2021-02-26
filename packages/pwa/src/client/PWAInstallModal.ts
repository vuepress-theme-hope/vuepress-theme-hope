/* eslint-disable vue/require-explicit-emits */
import Vue from "vue";
import ArrowLeftIcon from "./icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "./icons/ArrowRightIcon.vue";
import CloseIcon from "./icons/CloseIcon.vue";
import { i18n } from "./define";

import type { ManifestOption, PWAI18NConfig } from "../types";

interface InstallPromptEvent extends Event {
  readonly platforms: string;
  prompt: () => void;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let escapeHandler: (event: KeyboardEvent) => void;
let installPromptHandler: (event: Event) => void;

export default Vue.extend({
  name: "PWAInstallModal",

  components: { ArrowLeftIcon, ArrowRightIcon, CloseIcon },

  props: {
    useHint: {
      type: Boolean,
      default: false,
    },
  },

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
      installPromptHandler = (event): void => {
        this.deferredprompt = event as InstallPromptEvent;

        this.$emit("can-install", true);
        event.preventDefault();
      };

      // grab an install event
      window.addEventListener("beforeinstallprompt", installPromptHandler);

      void this.getManifest();

      escapeHandler = (event): void => {
        if (event.key === "Escape") this.$emit("toogle", false);
      };

      document.addEventListener("keyup", escapeHandler);
    }
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    // eslint-disable-next-line no-prototype-builtins
    if (window.hasOwnProperty("BeforeInstallPromptEvent"))
      document.removeEventListener("beforeinstallprompt", installPromptHandler);
    document.removeEventListener("keyup", escapeHandler);
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

    hint(): void {
      console.info("You accepted the install hint");
      this.$emit("hint");
    },
  },
});
