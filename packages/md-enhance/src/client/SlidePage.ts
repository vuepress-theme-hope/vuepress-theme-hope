import { onClickOutside } from "@vueuse/core";
import { Content } from "@vuepress/client";
import { defineComponent, h, ref } from "vue";
import { useRouter } from "vue-router";
import { BackIcon, HomeIcon } from "./components/icons";

import type { VNode } from "vue";

import "./styles/layout.scss";

export default defineComponent({
  name: "SlidePage",

  setup() {
    const router = useRouter();
    const showMenu = ref(false);
    const menu = ref<HTMLElement | null>(null);

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
      h("div", { class: "presentation" }, [
        h(Content),
        h("div", { ref: menu, class: ["menu", { active: showMenu.value }] }, [
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
      ]);
  },
});
