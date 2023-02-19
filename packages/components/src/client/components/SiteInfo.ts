import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import {
  type VNode,
  computed,
  defineComponent,
  h,
  resolveComponent,
} from "vue";
import {
  BitbucketIcon,
  GitHubIcon,
  GiteeIcon,
  GitlabIcon,
  SourceIcon,
  resolveRepoType,
  useLocaleConfig,
} from "vuepress-shared/client";

import { type SiteInfoLocaleConfig } from "../../shared/index.js";

import "balloon-css/balloon.css";
import "../styles/site-info.scss";

declare const SITE_INFO_LOCALES: SiteInfoLocaleConfig;

export default defineComponent({
  name: "DemoProject",

  components: {
    BitbucketIcon,
    GiteeIcon,
    GitHubIcon,
    GitlabIcon,
    SourceIcon,
  },

  props: {
    /**
     * Name of site
     *
     * 站点名称
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * Site description
     *
     * 站点描述
     */
    desc: {
      type: String,
      default: "",
    },

    /**
     * Site logo
     *
     * 站点图标
     */
    logo: {
      type: String,
      default: "",
    },

    /**
     * Site link
     *
     * 站点链接
     */
    url: {
      type: String,
      required: true,
    },

    /**
     * Site preview image
     *
     * 站点预览
     */
    preview: {
      type: String,
      required: true,
    },

    /**
     * Site repo
     *
     * 站点仓库
     */
    repo: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const locale = useLocaleConfig(SITE_INFO_LOCALES);
    const background = computed(() =>
      isLinkHttp(props.preview) ? props.preview : withBase(props.preview)
    );
    const repoType = computed(() =>
      props.repo ? resolveRepoType(props.repo) : null
    );

    return (): VNode =>
      h(
        "div",
        {
          class: "site-info",
          onClick: () => {
            window.open(props.url, "_blank");
          },
        },
        [
          h("div", {
            class: "site-info-preview",
            style: {
              background: `url(${background.value}) center/cover no-repeat`,
            },
          }),
          h("div", { class: "site-info-detail" }, [
            props.logo
              ? h("img", {
                  class: "site-info-logo",
                  src: props.logo,
                  loading: "lazy",
                  "no-view": "",
                })
              : null,
            h("div", { class: "site-info-name" }, props.name),
            h("div", { class: "site-info-desc" }, props.desc),
          ]),
          props.repo
            ? h(
                "div",
                { class: "site-info-source-wrapper" },
                h(
                  "a",
                  {
                    class: "site-info-source",
                    href: props.repo,
                    // hint text
                    "aria-label": locale.value.source,
                    "data-balloon-pos": "left",
                    title: locale.value.source,
                    target: "_blank",
                  },
                  h(resolveComponent(`${repoType.value!}Icon`))
                )
              )
            : null,
        ]
      );
  },
});
