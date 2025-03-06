import type { ExactLocaleConfig } from "@vuepress/helper/client";
import { isArray, useLocaleConfig } from "@vuepress/helper/client";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { withBase } from "vuepress/client";
import { RepoIcon } from "vuepress-shared/client";

import type { SiteInfoLocaleData } from "../../shared/index.js";

import "balloon-css/balloon.css";
import "../styles/site-info.scss";

declare const SITE_INFO_LOCALES: ExactLocaleConfig<SiteInfoLocaleData>;

export default defineComponent({
  name: "SiteInfo",

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
     * Site description
     *
     * 站点描述
     */
    desc: String,

    /**
     * Site logo
     *
     * 站点图标
     */
    logo: String,

    /**
     * Site repo
     *
     * 站点仓库
     */
    repo: [String, Array] as PropType<string | string[]>,
  },

  setup(props) {
    const locale = useLocaleConfig(SITE_INFO_LOCALES);

    const repo = computed(() => {
      const { repo } = props;

      return isArray(repo) ? repo : repo ? [repo] : null;
    });

    return (): VNode =>
      h("div", { class: "vp-site-info", "data-name": props.name }, [
        h("a", {
          class: ["vp-site-info-navigator", "no-external-link-icon"],
          title: props.name,
          href: props.url,
          target: "_blank",
        }),
        props.preview
          ? h("div", {
              class: "vp-site-info-preview",
              style: {
                background: `url(${withBase(
                  props.preview,
                )}) center/cover no-repeat`,
              },
            })
          : null,
        h("div", { class: "vp-site-info-detail" }, [
          props.logo
            ? h("img", {
                class: "vp-site-info-logo",
                src: props.logo,
                alt: "",
                loading: "lazy",
                "no-view": "",
              })
            : null,
          h("div", { class: "vp-site-info-name" }, props.name),
          props.desc
            ? h("div", { class: "vp-site-info-desc" }, props.desc)
            : null,
        ]),
        repo.value
          ? h(
              "div",
              { class: "vp-site-info-repo-wrapper" },
              repo.value.map((item) =>
                h(
                  "a",
                  {
                    class: "vp-site-info-repo no-external-link-icon",
                    href: item,
                    // Hint text
                    "aria-label": locale.value.source,
                    "data-balloon-pos": "left",
                    title: locale.value.source,
                    target: "_blank",
                  },
                  h(RepoIcon, { link: item }),
                ),
              ),
            )
          : null,
      ]);
  },
});
