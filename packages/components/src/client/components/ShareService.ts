/* eslint-disable vue/require-default-prop */
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { isArray, isLinkHttp, isString } from "@vuepress/shared";
import {
  type PropType,
  type VNode,
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

import { type ShareServiceOptions } from "../../shared/share.js";
import { getMetaContent } from "../utils/index.js";

import "balloon-css/balloon.css";
import "vuepress-shared/client/styles/popup.scss";
import "../styles/share-service.scss";

declare const SHARE_CONTENT_SELECTOR: string;

const renderIcon = (content: string, contentClass = ""): VNode => {
  const className = ["share-icon", contentClass];

  // is a link
  if (isLinkHttp(content) || isAbsoluteUrl(content))
    return h("img", { class: className, src: content, "no-view": "" });

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
     * Share title
     */
    title: {
      type: String,
      required: false,
    },

    /**
     * Share description
     */
    description: {
      type: String,
      required: false,
    },

    /**
     * Share url
     */
    url: {
      type: String,
      required: false,
    },

    /**
     * Share summary
     */
    summary: {
      type: String,
      required: false,
    },

    /**
     * Share image
     */
    cover: {
      type: String,
      required: false,
    },

    /**
     * Share tag
     */
    tag: {
      type: [Array, String] as PropType<string | string[]>,
      required: false,
    },
  },

  setup(props) {
    let popup: Popup;
    const page = usePageData();
    const frontmatter = usePageFrontmatter();

    const showPopup = ref(false);

    const getShareLink = (): string => {
      const title = props.title ?? page.value.title;
      const description =
        props.description ??
        frontmatter.value.description ??
        getMetaContent("description") ??
        getMetaContent("og:description") ??
        getMetaContent("twitter:description");
      const url =
        props.url ?? typeof window === "undefined"
          ? null
          : window.location.href;
      const cover = props.cover ?? getMetaContent("og:image");
      const image = document
        .querySelector<HTMLImageElement>(
          `${SHARE_CONTENT_SELECTOR} :not(a) > img`
        )
        ?.getAttribute("src");
      const tags =
        props.tag ?? frontmatter.value["tag"] ?? frontmatter.value["tags"];
      const tag = isArray(tags)
        ? tags.filter(isString).join(",")
        : isString(tags)
        ? tags
        : null;

      return props.config.link.replace(
        /\[([^\]]+)\]/g,
        (_, config: string): string => {
          const keys = config.split("|");

          for (const key of keys) {
            if (key === "url" && url) return url;
            if (key === "title" && title) return title;
            if (key === "description" && description) return description;
            if (key === "summary" && props.summary) return props.summary;
            if (key === "cover" && cover) return cover;
            if (key === "image" && image) return image;
            if (key === "tags" && tag) return tag;
          }

          return "";
        }
      );
    };

    const share = (): void => {
      const link = getShareLink();

      switch (props.config.action) {
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
            .then((dataURL) => {
              popup.emit(
                `<img src="${dataURL}" alt="qrcode" class="share-qrcode" />`
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
        config: { name, icon, shape, color },
        plain,
      } = props;

      return [
        h(
          "button",
          {
            type: "button",
            class: ["vp-share-button", { plain }],
            "aria-label": name,
            "data-balloon-pos": "up",
            onClick: () => share(),
          },
          plain
            ? renderIcon(shape, "plain")
            : icon
            ? renderIcon(icon)
            : h("div", {
                class: "vp-share-icon colorful",
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
