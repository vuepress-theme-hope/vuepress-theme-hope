import {
  type PropType,
  TransitionGroup,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { isAbsoluteUrl, isLinkHttp, startsWith } from "vuepress-shared/client";

import { CloseIcon } from "./icons.js";
import { type NoticeActionOption } from "../../shared/index.js";

import "../styles/notice.scss";

export default defineComponent({
  name: "NoticeItem",

  props: {
    /**
     * Notice path
     *
     * 通知路径
     */
    path: {
      type: String,
      default: "",
    },

    /**
     * Notice match RegExp
     *
     * 通知路径匹配
     */
    match: {
      type: String,
      default: "",
    },

    /**
     * Notice title
     *
     * 通知标题
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Notice content
     *
     * 通知内容
     */
    content: {
      type: String,
      required: true,
    },

    /**
     * Notice footer
     *
     * 通知操作
     */
    actions: {
      type: Array as PropType<NoticeActionOption[]>,
      default: (): NoticeActionOption[] => [],
    },

    /**
     * Notice key
     *
     * 通知 key
     */
    noticeKey: {
      type: String,
      default: "",
    },

    /**
     * Whether show notice only showOnce
     *
     * 是否仅展示一次通知
     */
    showOnce: Boolean,

    /**
     * Whether the notice shall be confirmed
     *
     * 通知是否需要确认
     */
    confirm: Boolean,

    /**
     * Whether display notice fullscreen
     *
     * 是否全屏显示通知
     */
    fullscreen: Boolean,
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const isVisible = ref(false);

    const key = computed(() =>
      props.noticeKey
        ? `notice-${props.noticeKey}`
        : `${props.title}${props.content}`
    );

    const isMatched = computed(() =>
      props.match
        ? new RegExp(props.match).test(route.path)
        : startsWith(route.path, props.path)
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
        key.value,
        "true"
      );
    };

    const openLink = (link?: string): void => {
      if (link)
        if (isAbsoluteUrl(link)) void router.push(link);
        else if (isLinkHttp(link)) window.open(link);

      close();
    };

    return (): VNode =>
      h(TransitionGroup, { name: "notice-fade" }, () =>
        isMatched.value && isVisible.value
          ? [
              props.fullscreen
                ? h("div", {
                    key: "mask",
                    class: "notice-mask",
                    onClick: () => {
                      if (!props.confirm) close();
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
                    props.confirm
                      ? null
                      : h(CloseIcon, { onClick: (): void => close() }),
                    h("span", { innerHTML: props.title }),
                  ]),
                  h("div", {
                    class: "notice-content",
                    innerHTML: props.content,
                  }),
                  h(
                    "div",
                    { class: "notice-footer" },
                    props.actions.map(({ text, link, type = "" }) =>
                      h("button", {
                        type: "button",
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
