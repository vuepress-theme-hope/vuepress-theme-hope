import { usePageData, usePageFrontmatter, useSiteData } from "@vuepress/client";
import type Artalk from "artalk";
import {
  type VNode,
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import {
  type ArtalkOptions,
  type CommentPluginFrontmatter,
} from "../../shared/index.js";

import "artalk/dist/Artalk.css";
import "../styles/artalk.scss";

declare const COMMENT_OPTIONS: ArtalkOptions;

const artalkOptions = COMMENT_OPTIONS;

const enableArtalk = Boolean(artalkOptions.server);

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Artalk",

  props: {
    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup: (props) => {
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>();
    const page = usePageData();
    const route = useRoute();
    const site = useSiteData();

    const artalkContainer = ref<HTMLDivElement>();

    let artalk: Artalk.default | null = null;

    const enableComment = computed(() => {
      if (!enableArtalk) return false;
      const pluginConfig = artalkOptions.comment !== false;
      const pageConfig = frontmatter.value.comment;

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // not disabled in anywhere
        (pluginConfig !== false && pageConfig !== false)
      );
    });

    const initArtalk = async (): Promise<void> => {
      if (enableComment.value) {
        const { default: _Artalk } = await import(
          /* webpackChunkName: "artalk" */ "artalk"
        );

        // FIXME: Typescript type issues
        const Artalk = _Artalk as unknown as typeof _Artalk.default;

        try {
          artalk = new Artalk({
            site: site.value.title,
            useBackendConf: false,
            ...artalkOptions,
            el: artalkContainer.value!,
            pageTitle: page.value.title,
            darkMode: props.darkmode,
            pageKey: route.path,
          });

          if (artalkOptions.useBackendConf)
            artalk.on("conf-loaded", () => {
              artalk!.setDarkMode(props.darkmode);
            });
        } catch (err) {
          // FIXME: Not sure what the issue is, relevant issue:
          // https://github.com/vuepress/vuepress-next/issues/1249
          // https://github.com/ArtalkJS/Artalk/discussions/367
        }
      }
    };

    onMounted(() => {
      watch(
        () => [enableComment.value, route.path],
        () => {
          void nextTick().then(() => initArtalk());
        },
        { immediate: true }
      );

      watch(
        () => props.darkmode,
        (value) => {
          artalk?.setDarkMode(value);
        }
      );
    });

    return (): VNode | null =>
      enableComment.value
        ? h(
            "div",
            { class: "artalk-wrapper" },
            h("div", { ref: artalkContainer })
          )
        : null;
  },
});
