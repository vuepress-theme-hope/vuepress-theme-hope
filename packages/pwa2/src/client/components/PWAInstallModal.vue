<template>
  <div id="install-modal-wrapper">
    <div class="background" @click="$emit('toggle', false)" />

    <div class="install-modal">
      <div class="header">
        <button
          class="close-button"
          :aria-label="locale.close"
          @click="$emit('toggle', false)"
        >
          <CloseIcon />
        </button>
        <div class="logo">
          <img
            v-if="manifest.icons"
            :src="manifest.icons[0].src"
            alt="App Logo"
          />
          <div class="title">
            <h1>{{ manifest.short_name || manifest.name }}</h1>
            <p class="desc">{{ locale.explain }}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="highlight">
          <div v-if="manifest.features" class="feature-wrapper">
            <h3>{{ locale.feature }}</h3>
            <ul v-if="manifest.features">
              <li
                v-for="feature in manifest.features"
                :key="feature"
                v-text="feature"
              />
            </ul>
          </div>

          <div v-if="manifest.screenshots" class="screenshot-wrapper">
            <button :aria-label="locale.prevImage" @click="scrolltoLeft">
              <ArrowLeftIcon />
            </button>
            <section class="screenshot">
              <div
                v-for="screenshot in manifest.screenshots"
                :key="screenshot.src"
              >
                <img alt="App Screenshot" :src="screenshot.src" />
              </div>
            </section>
            <button :aria-label="locale.nextImage" @click="scrolltoRight">
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <div class="description">
          <h3 v-text="locale.desc" />
          <p v-text="manifest.description" />
        </div>
      </div>

      <div v-if="useHint" class="ios-text" @click="hint">
        <p>{{ locale.iOSInstall }}</p>
        <button class="success">Got it!</button>
      </div>
      <div v-else class="button-wrapper">
        <button class="install-button" @click="install">
          {{ locale.install }} <span>{{ manifest.short_name }}</span>
        </button>
        <button class="cancel-button" @click="$emit('toggle', false)">
          {{ locale.cancel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { withBase } from "@vuepress/client";
import { onBeforeMount, defineComponent, onMounted, ref } from "vue";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./icons";
import { locales } from "../define";

import type { ManifestOption } from "../../shared";

interface InstallPromptEvent extends Event {
  readonly platforms: string;
  prompt: () => void;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let escapeHandler: (event: KeyboardEvent) => void;
let installPromptHandler: (event: Event) => void;

export default defineComponent({
  name: "PWAInstallModal",

  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
  },

  props: {
    useHint: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["can-install", "hint", "toggle"],

  setup(_props, { emit }) {
    const locale = useLocaleConfig(locales);

    const manifest = ref<ManifestOption>({});
    const isIOS = ref(false);
    const deferredprompt = ref<InstallPromptEvent | null>(null);

    const getManifest = async (): Promise<void> => {
      const manifestContent = localStorage.getItem("manifest");

      if (manifestContent)
        manifest.value = JSON.parse(manifestContent) as ManifestOption;
      else
        try {
          const response = await fetch(withBase("manifest.webmanifest"));
          const data = (await response.json()) as ManifestOption;

          manifest.value = data;
          localStorage.setItem("manifest", JSON.stringify(data));
        } catch (err) {
          console.error(
            "[PWA]: Error getting manifest, check that you have a valid web manifest or network connection"
          );
        }
    };

    const scrolltoLeft = (): void => {
      const screenshotsDiv = document.querySelector(".screenshot");

      if (screenshotsDiv)
        screenshotsDiv.scrollBy({
          left: -screenshotsDiv.clientWidth,
          top: 0,
          behavior: "smooth",
        });
    };

    const scrolltoRight = (): void => {
      const screenshotsDiv = document.querySelector(".screenshot");
      if (screenshotsDiv)
        screenshotsDiv.scrollBy({
          left: screenshotsDiv.clientWidth,
          top: 0,
          behavior: "smooth",
        });
    };

    const install = async (): Promise<void> => {
      if (deferredprompt.value) {
        deferredprompt.value.prompt();

        document.dispatchEvent(new CustomEvent("show"));

        const choiceResult = await deferredprompt.value.userChoice;

        if (choiceResult.outcome === "accepted") {
          console.info("PWA has been installed");

          emit("toggle", false);
          emit("can-install", false);
        } else {
          console.info("You choose to not install PWA");

          emit("toggle", false);
          emit("can-install", false);
        }
      }
    };

    const hint = (): void => {
      console.info("You accepted the install hint");
      emit("hint");
    };

    onMounted(() => {
      // eslint-disable-next-line no-prototype-builtins
      if (window.hasOwnProperty("BeforeInstallPromptEvent")) {
        installPromptHandler = (event): void => {
          deferredprompt.value = event as InstallPromptEvent;

          emit("can-install", true);
          event.preventDefault();
        };

        // grab an install event
        window.addEventListener("beforeinstallprompt", installPromptHandler);

        void getManifest();

        escapeHandler = (event): void => {
          if (event.key === "Escape") emit("toggle", false);
        };

        document.addEventListener("keyup", escapeHandler);
      }
    });

    onBeforeMount(() => {
      // eslint-disable-next-line no-prototype-builtins
      if (window.hasOwnProperty("BeforeInstallPromptEvent"))
        document.removeEventListener(
          "beforeinstallprompt",
          installPromptHandler
        );
      document.removeEventListener("keyup", escapeHandler);
    });

    return {
      locale,
      isIOS,
      manifest,

      getManifest,
      scrolltoLeft,
      scrolltoRight,
      install,
      hint,
    };
  },
});
</script>
