import { clickOutside } from "@mr-hope/vuepress-shared/client";
import { Content } from "@vuepress/client";
import { defineComponent, h, ref, onBeforeUnmount, withDirectives } from "vue";
import { useRouter } from "vue-router";
import { BackIcon, HomeIcon } from "./components/icons";

import type { VNode } from "vue";

import "./styles/layout.scss";

export default defineComponent({
  name: "SlidePage",

  setup() {
    const router = useRouter();
    const showMenu = ref(false);

    const toggle = (): void => {
      showMenu.value = !showMenu.value;
    };

    const closeMenu = (): void => {
      showMenu.value = false;
    };

    const back = (): void => {
      closeMenu();
      window.history.go(-1);
    };

    const home = (): void => {
      closeMenu();
      void router.push("/");
    };

    onBeforeUnmount(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.querySelector("html")!.classList.remove("reveal-full-page");
      document.body.classList.remove("reveal-viewport");
      document.body.style.removeProperty("--slide-width");
      document.body.style.removeProperty("--slide-height");
    });

    return (): VNode =>
      h("div", { class: "presentation" }, [
        h(Content),
        withDirectives(
          h("div", { class: { menu: true, active: showMenu.value } }, [
            h(
              "button",
              { class: "menu-button", onClick: () => toggle() },
              h("span", { class: "icon" })
            ),
            h(
              "button",
              { class: "back-button", onClick: () => back() },
              h(BackIcon)
            ),
            h(
              "button",
              { class: "home-button", onClick: () => home() },
              h(HomeIcon)
            ),
          ]),
          [[clickOutside, closeMenu]]
        ),
      ]);
  },
});
