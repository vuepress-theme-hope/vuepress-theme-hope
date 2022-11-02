import { useEventListener } from "@vueuse/core";
import { withBase } from "@vuepress/client";
import { defineComponent, h, onMounted, ref } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./icons.js";
import { locales } from "../define.js";

import type { VNode } from "vue";
import type { ManifestOption } from "../../shared/index.js";

interface InstallPromptEvent extends Event {
  readonly platforms: string;
  prompt: () => void;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default defineComponent({
  name: "PWAInstallModal",

  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
  },

  props: {
    useHint: Boolean,
  },

  emits: ["can-install", "hint", "toggle"],

  setup(props, { emit }) {
    const locale = useLocaleConfig(locales);

    const manifest = ref<ManifestOption>({});
    const deferredPrompt = ref<InstallPromptEvent>();

    const getManifest = async (): Promise<void> => {
      const manifestContent = localStorage.getItem("manifest");

      if (manifestContent)
        manifest.value = <ManifestOption>JSON.parse(manifestContent);
      else
        try {
          const response = await fetch(withBase("manifest.webmanifest"));
          const data = <ManifestOption>await response.json();

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
      if (deferredPrompt.value) {
        deferredPrompt.value.prompt();

        document.dispatchEvent(new CustomEvent("show"));

        const choiceResult = await deferredPrompt.value.userChoice;

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
        useEventListener(window, "beforeinstallprompt", (event) => {
          deferredPrompt.value = <InstallPromptEvent>event;

          emit("can-install", true);
          event.preventDefault();

          useEventListener("keyup", (event): void => {
            if (event.key === "Escape") emit("toggle", false);
          });
        });

        void getManifest();
      }
    });

    return (): VNode =>
      h("div", { id: "install-modal-wrapper" }, [
        h("div", { class: "background", onClick: () => emit("toggle", false) }),

        h("div", { class: "install-modal" }, [
          h("div", { class: "header" }, [
            // close button
            h(
              "button",
              {
                class: "close-button",
                "aria-label": locale.value.close,
                onClick: () => emit("toggle", false),
              },
              h(CloseIcon)
            ),

            h("div", { class: "logo" }, [
              manifest.value.icons
                ? h("img", {
                    src: manifest.value.icons[0]?.src,
                    alt: "App Logo",
                  })
                : null,
              h("div", { class: "title" }, [
                h("h1", manifest.value.short_name || manifest.value.name),
                h("p", { class: "desc" }, locale.value.explain),
              ]),
            ]),
          ]),

          h("div", { class: "content" }, [
            h("div", { class: "highlight" }, [
              manifest.value.features
                ? h("div", { class: "feature-wrapper" }, [
                    h("h3", locale.value.feature),
                    h(
                      "ul",
                      manifest.value.features.map((feature) => h("li", feature))
                    ),
                  ])
                : null,

              manifest.value.screenshots
                ? h("div", { class: "screenshot-wrapper" }, [
                    h(
                      "button",
                      {
                        "aria-label": locale.value.prevImage,
                        onClick: scrolltoLeft,
                      },
                      h(ArrowLeftIcon)
                    ),
                    h("section", { class: "screenshot" }, [
                      manifest.value.screenshots.map((screenshot) =>
                        h(
                          "div",
                          h("img", {
                            src: screenshot.src,
                            alt: "App Screenshot",
                          })
                        )
                      ),
                    ]),
                    h(
                      "button",
                      {
                        "aria-label": locale.value.nextImage,
                        onClick: scrolltoRight,
                      },
                      h(ArrowRightIcon)
                    ),
                  ])
                : null,
            ]),

            h("div", { class: "description" }, [
              h("h3", locale.value.desc),
              h("p", manifest.value.description),
            ]),
          ]),

          props.useHint
            ? h("div", { class: "ios-text", onClick: hint }, [
                h("p", locale.value.iOSInstall),
                h("button", { class: "success" }, "Got it!"),
              ])
            : h("div", { class: "button-wrapper" }, [
                h("button", { class: "install-button", onClick: install }, [
                  locale.value.install,
                  h("span", manifest.value.short_name),
                ]),
                h(
                  "button",
                  {
                    class: "cancel-button",
                    onClick: () => emit("toggle", false),
                  },
                  locale.value.cancel
                ),
              ]),
        ]),
      ]);
  },
});
