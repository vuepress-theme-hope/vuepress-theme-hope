import { Content } from "@vuepress/client";
import { onClickOutside } from "@vueuse/core";
import type { VNode } from "vue";
import { defineComponent, h, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";

import { BackIcon, HomeIcon } from "./components/icons.js";

import "./styles/slide-page.scss";

export default defineComponent({
  name: "SlidePage",

  setup() {
    const router = useRouter();
    const showMenu = ref(false);

    const menu = shallowRef<HTMLElement>();

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

    onClickOutside(menu, closeMenu);

    return (): VNode =>
      h("div", { class: "vp-reveal-page" }, [
        h(Content),
        h(
          "div",
          { ref: menu, class: ["vp-reveal-menu", { active: showMenu.value }] },
          [
            h(
              "button",
              { type: "button", class: "menu-button", onClick: () => toggle() },
              h("span", { class: "icon" })
            ),
            h(
              "button",
              { type: "button", class: "back-button", onClick: () => back() },
              h(BackIcon)
            ),
            h(
              "button",
              { type: "button", class: "home-button", onClick: () => home() },
              h(HomeIcon)
            ),
          ]
        ),
      ]);
  },
});
