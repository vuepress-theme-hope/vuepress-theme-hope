import type { VNode } from "vue";
import { computed, defineComponent, h, nextTick, ref } from "vue";

import PageTitle from "@theme-hope/components/base/PageTitle";
import LockIcon from "@theme-hope/components/encrypt/LockIcon";
import { useData } from "@theme-hope/composables/useData";

import "../../styles/encrypt/password-modal.scss";

export default defineComponent({
  name: "PasswordModal",

  props: {
    /** Password hint */
    hint: String,

    /**
     * Whether is fullscreen
     *
     * 是否是全屏
     */
    full: Boolean,

    /**
     * Whether to show title
     *
     * 是否显示标题
     */
    showTitle: Boolean,
  },

  emits: ["verify"],

  setup(props, { emit }) {
    const { frontmatter, themeLocale } = useData();
    const password = ref("");
    const hasTried = ref(false);
    const remember = ref(false);

    const encryptLocale = computed(() => themeLocale.value.encryptLocales);

    const passwordLabel = computed(() => encryptLocale.value.password ?? "Password");
    const submitText = computed(() => encryptLocale.value.submit ?? "OK");

    const verify = (): void => {
      hasTried.value = false;

      emit("verify", password.value, remember.value);

      void nextTick().then(() => {
        hasTried.value = true;
      });
    };

    return (): VNode =>
      h(
        "div",
        {
          class: ["vp-decrypt-layer", { expand: props.full || frontmatter.value.home }],
        },
        [
          props.showTitle ? h(PageTitle) : null,
          h("div", { class: "vp-decrypt-modal" }, [
            h(
              "div",
              {
                id: "password-hint",
                class: ["vp-decrypt-hint", { tried: hasTried.value }],
                ...(hasTried.value ? { role: "alert" } : {}),
              },
              hasTried.value
                ? encryptLocale.value.errorHint
                : h(LockIcon, { "aria-label": encryptLocale.value.iconLabel }),
            ),
            props.hint ? h("div", { class: "vp-decrypt-hint" }, props.hint) : null,
            h("div", { class: "vp-decrypt-input" }, [
              h("input", {
                id: "password-input",
                type: "password",
                value: password.value,
                placeholder: encryptLocale.value.placeholder,
                autocomplete: "current-password",
                "aria-label": passwordLabel.value,
                "aria-invalid": hasTried.value ? "true" : "false",
                "aria-describedby": "password-hint",
                onInput: ({ target }: InputEvent) => {
                  password.value = (target as HTMLInputElement).value;
                  hasTried.value = false;
                },
                onKeydown: ({ key }: KeyboardEvent) => {
                  if (key === "Enter") verify();
                },
              }),
            ]),
            h("div", { class: "vp-remember-password" }, [
              h("input", {
                id: "remember-password",
                type: "checkbox",
                value: remember.value,
                onChange: () => {
                  remember.value = !remember.value;
                },
              }),
              h("label", { for: "remember-password" }, encryptLocale.value.remember),
            ]),
            h(
              "button",
              {
                type: "button",
                class: "vp-decrypt-submit",
                onClick: () => {
                  verify();
                },
              },
              submitText.value,
            ),
          ]),
        ],
      );
  },
});
