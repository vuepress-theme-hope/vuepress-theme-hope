import {
  TransitionGroup,
  defineComponent,
  onMounted,
  h,
  ref,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import { useLocaleConfig } from "vuepress-shared/client";

import { CloseIcon } from "./icons.js";

import type { PropType, VNode } from "vue";
import type { NoticeLocaleOptions } from "../../shared/index.js";

import "../styles/notice.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Notice",

  props: {
    locales: {
      type: Object as PropType<Record<string, NoticeLocaleOptions>>,
      required: true,
    },

    noticeKey: {
      type: String,
      default: "",
    },

    showOnce: {
      type: Boolean,
      default: false,
    },

    canClose: {
      type: Boolean,
      default: true,
    },

    fullscreen: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const locale = useLocaleConfig(props.locales);
    const router = useRouter();

    const isVisible = ref(false);

    const key = computed(() =>
      props.noticeKey
        ? `notice-${props.noticeKey}`
        : `${props.locales["/"].title}${props.locales["/"].content}`
    );

    onMounted(() => {
      const hasBeenClosed = (
        props.showOnce ? localStorage : sessionStorage
      ).getItem(key.value);

      isVisible.value = !hasBeenClosed;
    });

    const close = (): void => {
      isVisible.value = false;
      (props.showOnce ? localStorage : sessionStorage).setItem(
        "v2-notice",
        "true"
      );
    };

    const openLink = (link?: string): void => {
      if (link) {
        if (link.startsWith("/")) void router.push(link);
        else window.open(link);
      }
      close();
    };

    return (): VNode =>
      h(TransitionGroup, { name: "notice-fade" }, () =>
        isVisible.value && locale.value
          ? [
              props.fullscreen
                ? h("div", {
                    key: "mask",
                    class: "notice-mask",
                    onClick: () => {
                      if (props.canClose !== false) close();
                    },
                  })
                : null,
              h(
                "div",
                {
                  key: "popup",
                  class: ["notice-wrapper", { fullscreen: props.fullscreen }],
                },
                [
                  h("header", { class: "notice-title" }, [
                    h("span", { innerHTML: locale.value.title }),
                    props.canClose === false
                      ? null
                      : h(CloseIcon, { onClick: (): void => close() }),
                  ]),
                  h("p", {
                    class: "notice-content",
                    innerHTML: locale.value.content,
                  }),
                  h(
                    "div",
                    { class: "notice-footer" },
                    locale.value.actions.map(({ text, link, type = "" }) =>
                      h("button", {
                        class: ["notice-footer-action", type],
                        onClick: () => openLink(link),
                        innerHTML: text,
                      })
                    )
                  ),
                ]
              ),
            ]
          : []
      );
  },
});
