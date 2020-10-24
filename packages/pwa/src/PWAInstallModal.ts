import { Component, Vue } from "vue-property-decorator";
import { ManifestOption } from "../types";
import ArrowLeftIcon from "@mr-hope/vuepress-shared-utils/icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "@mr-hope/vuepress-shared-utils/icons/ArrowRightIcon.vue";
import CloseIcon from "@mr-hope/vuepress-shared-utils/icons/CloseIcon.vue";
import { PWAI18NConfig } from "@mr-hope/vuepress-shared-utils";

export interface SafariNavigator extends Navigator {
  standalone: boolean;
}

interface InstallPromptEvent extends Event {
  readonly platforms: string;
  prompt: () => void;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

@Component({ components: { ArrowLeftIcon, ArrowRightIcon, CloseIcon } })
export default class PWAInstallModal extends Vue {
  manifestpath = "manifest.webmanifest";
  manifest: ManifestOption = {};
  isIOS = false;

  deferredprompt: InstallPromptEvent | null = null;

  get i18n(): PWAI18NConfig {
    return PWA_I18N[this.$localePath || "/"];
  }

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
  }

  async getManifest(): Promise<void> {
    if (this.manifestpath) {
      try {
        const response = await fetch(this.manifestpath);
        const data = (await response.json()) as ManifestOption;

        if (!data.icons || !data.icons[0])
          console.error("Your web manifest must have atleast one icon listed");

        if (!data.name)
          console.error("Your web manifest must have a name listed");

        if (!data.description)
          console.error("Your web manifest must have a description listed");

        this.manifest = data;
      } catch (err) {
        console.error(
          "Error getting manifest, check that you have a valid web manifest"
        );
      }
    }
  }

  scrollToLeft(): void {
    const screenshotsDiv = document.querySelector(".screenshot");

    if (screenshotsDiv)
      screenshotsDiv.scrollBy({
        left: -screenshotsDiv.clientWidth,
        top: 0,
        behavior: "smooth",
      });
  }

  scrollToRight(): void {
    const screenshotsDiv = document.querySelector(".screenshot");
    if (screenshotsDiv)
      screenshotsDiv.scrollBy({
        left: screenshotsDiv.clientWidth,
        top: 0,
        behavior: "smooth",
      });
  }

  async install(): Promise<boolean> {
    if (this.deferredprompt) {
      this.deferredprompt.prompt();

      document.dispatchEvent(new CustomEvent("show"));

      const choiceResult = await this.deferredprompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        console.log("PWA has been installed");

        this.$emit("toogle", false);
        this.$emit("can-install", false);

        return true;
      } else {
        console.log("You choose to not install PWA");

        this.$emit("toogle", false);
        this.$emit("can-install", false);
      }
    }

    return false;
  }
}
