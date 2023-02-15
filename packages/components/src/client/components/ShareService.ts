/* eslint-disable vue/require-default-prop */
import { usePageData } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import {
  type PropType,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
} from "vue";
import {
  Popup,
  endsWith,
  isAbsoluteUrl,
  openPopupWindow,
  startsWith,
} from "vuepress-shared/client";

import {
  type ShareAction,
  type ShareServiceOptions,
} from "../../shared/share.js";

import "vuepress-shared/client/styles/popup.scss";
import "../styles/share-service.scss";

const renderIcon = (content: string, contentClass = ""): VNode => {
  const className = ["share-icon", contentClass];

  // is a link
  if (isLinkHttp(content) || isAbsoluteUrl(content))
    return h("img", { class: className, src: content });

  // is html content
  if (startsWith(content, "<") && endsWith(content, ">"))
    return h("div", { class: className, innerHTML: content });

  // is class
  return h("div", { class: [...className, content] });
};

export default defineComponent({
  name: "ShareService",

  props: {
    /**
     * Share config
     *
     * 分享配置
     */
    config: {
      type: Object as PropType<ShareServiceOptions>,
      default: () => ({}),
    },

    /**
     * is plain
     */
    plain: Boolean,

    /**
     * Shared title
     */
    title: {
      type: String,
      required: false,
    },

    /**
     * Shared description
     */
    description: {
      type: String,
      required: false,
    },

    /**
     * Shared url
     */
    url: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    let popup: Popup;
    const page = usePageData();

    const showPopup = ref(false);

    const title = computed(() => props.title ?? page.value.title);
    const description = computed(
      () => props.description ?? page.value.frontmatter.description ?? null
    );
    const url = computed(() =>
      props.url ?? typeof window === "undefined" ? null : window.location.href
    );

    const shareLink = computed(() =>
      props.config.link.replace(
        /\[([^\]]+)\]/g,
        (_, config: string): string => {
          const keys = config.split("|");

          for (const key of keys) {
            if (key === "url" && url.value) return url.value;
            if (key === "title" && title.value) return title.value;
            if (key === "description" && description.value)
              return description.value;
          }

          return "";
        }
      )
    );

    const share = (link: string, action?: ShareAction): void => {
      switch (action) {
        case "navigate":
          window.open(link);
          break;

        case "open":
          window.open(link, "_blank");
          break;

        case "qrcode":
          void import(/* webpackChunkName: "qrcode" */ "qrcode")
            .then(({ toDataURL }) =>
              toDataURL(link, {
                errorCorrectionLevel: "H",
                width: 250,
                scale: 1,
                margin: 1.5,
              })
            )
            .then((dataUrl) => {
              popup.emit(
                `<img src="${dataUrl}" alt="qrcode" class="share-qrcode" />`
              );
            });
          break;

        // "popup" shall be default action
        default:
          openPopupWindow(link, "share");
      }
    };

    onMounted(() => {
      popup = new Popup();
    });

    return (): (VNode | null)[] => {
      const {
        config: { name, action, icon, shape, color },
        plain,
      } = props;

      return [
        h(
          "button",
          {
            class: ["share-button", { plain }],
            "aria-label": name,
            "data-balloon-pos": "up",
            onClick: () => share(shareLink.value, action),
          },
          plain
            ? renderIcon(shape, "plain")
            : icon
            ? renderIcon(icon)
            : h("div", {
                class: "share-icon color-wrapper",
                style: {
                  background: color,
                },
                innerHTML: shape,
              })
        ),
        showPopup.value ? h("div", { class: "share-popup" }) : null,
      ];
    };
  },
});
