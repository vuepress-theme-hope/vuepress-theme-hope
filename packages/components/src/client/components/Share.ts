import { type PageData, usePageData } from "@vuepress/client";
import { isFunction, isPlainObject, isString } from "@vuepress/shared";
import { type PropType, type VNode, computed, defineComponent, h } from "vue";

import ShareService from "./ShareService.js";
import { type ShareServiceOptions } from "../../shared/share.js";

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

      required: true,
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
      type: Function as PropType<(page: PageData) => string>,
      default: (page: PageData) => page.title,
    },

    /**
     * Use colorful icon
     */
    colorful: Boolean,
  },

  setup(props) {
    const page = usePageData();

    // FIXME:
    console.log(
      (isString(props.services) ? props.services.split(",") : props.services)
        .map((item) =>
          isPlainObject(item)
            ? item.name && item.link
              ? item
              : null
            : shareServices.find(({ name }) => name === item)
        )
        .filter((item): item is ShareServiceOptions => item != null)
    );

    const service = computed(() => {
      const services = isString(props.services)
        ? props.services.split(",")
        : props.services;

      return services
        .map((item) =>
          isPlainObject(item)
            ? item.name && item.link
              ? item
              : null
            : shareServices.find(({ name }) => name === item)
        )
        .filter((item): item is ShareServiceOptions => item != null);
    });

    const shareData = computed(() => {
      const result: { title?: string; description?: string } = {};

      if (isFunction(props.titleGetter))
        result.title = props.titleGetter(page.value);
      if (isFunction(props.descriptionGetter))
        result.description = props.descriptionGetter(page.value);

      return result;
    });

    return (): VNode => {
      return h(
        "div",
        {
          class: "share-wrapper",
        },
        service.value.map((item) =>
          h(ShareService, {
            config: item,
            ...shareData.value,
            plain: !props.colorful,
          })
        )
      );
    };
  },
});
