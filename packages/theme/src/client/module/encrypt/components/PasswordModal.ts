import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, nextTick, ref } from "vue";

import { LockIcon } from "./icons";
import { useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/password-modal.scss";

export default defineComponent({
  name: "PasswordModal",

  props: {
    full: Boolean,
  },

  emits: ["verify"],

  setup(props, { emit }) {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const password = ref("");
    const hasTried = ref(false);
    const remember = ref(false);

    const locale = computed(() => themeLocale.value.encryptLocales);

    let hintHandler: number | null = null;

    const verify = (): void => {
      // clear previous handler
      if (hintHandler) clearTimeout(hintHandler);
      hasTried.value = false;

      emit("verify", password.value, remember.value);

      void nextTick().then(() => {
        hasTried.value = true;

        hintHandler = setTimeout(() => {
          hasTried.value = false;
        }, 1000) as unknown as number;
      });
    };

    return (): VNode =>
      h(
        "div",
        {
          class: [
            "password-layer",
            { expand: props.full || frontmatter.value["home"] },
          ],
        },
        h("div", { class: "password-modal" }, [
          h(
            "div",
            { class: ["hint", { tried: hasTried.value }] },
            hasTried.value
              ? locale.value.errorHint
              : h(LockIcon, { "aria-label": locale.value.iconLabel })
          ),
          h("div", { class: "password" }, [
            h("input", {
              type: "password",
              value: password.value,
              placeholder: locale.value.placeholder,
              onInput: ({ target }: InputEvent) => {
                password.value = (target as HTMLInputElement).value;
              },
              onKeydown: ({ key }: KeyboardEvent) => {
                if (key === "Enter") verify();
              },
            }),
          ]),
          h("div", { class: "remember-password" }, [
            h("input", {
              type: "checkbox",
              value: remember.value,
              onChange: () => (remember.value = !remember.value),
            }),
            h("span", locale.value.remember),
          ]),
          h("button", { class: "submit", onClick: () => verify() }, "OK"),
        ])
      );
  },
});
