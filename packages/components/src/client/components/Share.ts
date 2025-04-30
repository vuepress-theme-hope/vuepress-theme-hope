import { isFunction, isPlainObject, isString } from "@vuepress/helper/client";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import type { PageData } from "vuepress/client";
import { usePage } from "vuepress/client";

import ShareService from "./ShareService.js";
import type { ShareServiceOptions } from "../../shared/share.js";

declare const SHARE_SERVICES: ShareServiceOptions[];

const shareServices = SHARE_SERVICES;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Share",

  props: {
    /**
     * Share services
     *
     * PDF 文件链接，应为完整链接
     */
    services: {
      type: [String, Array] as PropType<
        string | (ShareServiceOptions | string)[]
      >,

      default: () => shareServices.map(({ name }) => name),
    },

    /**
     * Getter for page title
     */
    titleGetter: {
      type: Function as PropType<(page: PageData) => string>,
      default: (page: PageData) => page.title,
    },

    /**
     * Getter for page description
     */
    descriptionGetter: {
      type: Function as PropType<(page: PageData) => string | undefined | null>,
      default: (page: PageData) => page.frontmatter.description,
    },

    /**
     * Getter for page summary
     */
    summaryGetter: {
      type: Function as PropType<(page: PageData) => string | undefined | null>,
      default: (page: PageData<{ summary?: string }>) => page.summary,
    },

    /**
     * Getter for page summary
     */
    coverGetter: {
      type: Function as PropType<(page: PageData) => string | undefined | null>,
      default: (page: PageData<{ cover?: string }>) => page.cover,
    },

    /**
     * Getter for page summary
     */
    tagGetter: {
      type: Function as PropType<
        (page: PageData) => string | string[] | undefined | null
      >,

      default: ({
        frontmatter,
      }: PageData<
        Record<never, never>,
        { tag?: string | string[]; tags?: string | string[] }
      >) => frontmatter.tag ?? frontmatter.tags,
    },

    /**
     * Whether to display the share component inline
     */
    inline: Boolean,

    /**
     * Use colorful icon
     */
    colorful: Boolean,
  },

  setup(props) {
    const page = usePage();

    const services = computed(() => {
      const serviceOptions = isString(props.services)
        ? props.services.split(",")
        : props.services;

      return serviceOptions
        .map((item) =>
          isPlainObject(item)
            ? item.name && item.link
              ? item
              : null
            : shareServices.find(({ name }) => name === item),
        )
        .filter((item): item is ShareServiceOptions => Boolean(item));
    });

    const shareData = computed(() => {
      const result: Record<string, string | string[]> = {};

      (
        [
          "titleGetter",
          "descriptionGetter",
          "summaryGetter",
          "coverGetter",
          "tagGetter",
        ] as const
      ).forEach((item) => {
        if (isFunction(props[item])) {
          const value = props[item](page.value);

          if (value) result[item.replace("Getter", "")] = value;
        }
      });

      return result;
    });

    return (): VNode =>
      h(
        "div",
        {
          class: "vp-share-buttons",
          style: props.inline ? { display: "inline-block" } : {},
        },
        services.value.map((item) =>
          h(ShareService, {
            config: item,
            ...shareData.value,
            plain: !props.colorful,
          }),
        ),
      );
  },
});
