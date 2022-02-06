import { usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, nextTick, ref } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/password-modal.scss";

export default defineComponent({
  name: "PasswordModal",

  props: {
    full: { type: Boolean, default: false },
  },

  emits: ["verify"],

  setup(props, { emit }) {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const password = ref("");
    const hasTried = ref(false);

    const locale = computed(() => themeLocale.value.encryptLocales);

    const verify = (): void => {
      hasTried.value = false;

      emit("verify", password.value);

      void nextTick().then(() => {
        hasTried.value = true;
      });
    };

    return (): VNode =>
      h(
        "div",
        {
          class: [
            "password-modal",
            { expand: props.full || frontmatter.value.home },
          ],
        },
        [
          h(
            "div",
            { class: ["hint", { tried: hasTried.value }] },
            hasTried.value ? locale.value.errorHint : locale.value.title
          ),
          h("div", { class: "input" }, [
            h("input", {
              type: "password",
              value: password.value,
              onInput: ({ target }: InputEvent) => {
                password.value = (target as HTMLInputElement).value;
              },
              onKeydown: ({ key }: KeyboardEvent) => {
                if (key === "Enter") verify();
              },
            }),
            h("button", { onClick: () => verify() }, "OK"),
          ]),
        ]
      );
  },
});
