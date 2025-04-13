import { decodeData, useDarkMode } from "@vuepress/helper/client";
import { watchImmediate } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, shallowRef } from "vue";

import "../styles/kotlin-playground.scss";

export default defineComponent({
  name: "KotlinPlayground",

  props: {
    /**
     * Playground file data
     *
     * 演示文件数据
     */
    files: {
      type: String,
      required: true,
    },

    /**
     * Playground title
     *
     * 演示标题
     */
    title: String,

    /**
     * Playground settings
     *
     * 演示设置
     */
    settings: String,
  },

  setup(props) {
    const isDarkMode = useDarkMode();

    const kotlinPlayground = shallowRef<HTMLDivElement>();

    const files = computed(
      () => JSON.parse(decodeData(props.files)) as string[],
    );

    const settings = computed(() => ({
      theme: isDarkMode.value ? "darcula" : "default",
      ...(JSON.parse(decodeURIComponent(props.settings ?? "{}")) as Record<
        string,
        string
      >),
    }));

    const renderPlayground = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return;

      const { default: playground } = await import(
        /* webpackChunkName: "kotlin-playground" */ "kotlin-playground"
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      playground(kotlinPlayground.value!);
    };

    onMounted(() => {
      watchImmediate(isDarkMode, () => renderPlayground(), {
        flush: "post",
      });
    });

    return (): VNode =>
      h("div", { class: "kotlin-playground-wrapper" }, [
        props.title
          ? h("div", { class: "header" }, decodeURIComponent(props.title))
          : null,
        h(
          "div",
          {
            class: "kotlin-playground-container",
            key: isDarkMode.value ? "dark" : "light",
          },

          h(
            "div",
            {
              class: "kotlin-playground",
              ref: kotlinPlayground,
              ...settings.value,
            },
            [
              h("pre", files.value[0]),
              // Hidden dependency
              files.value.length > 1
                ? files.value.map((content, index) =>
                    index === 0
                      ? null
                      : h(
                          "textarea",
                          { class: "hidden-dependency", readonly: "" },
                          content,
                        ),
                  )
                : null,
            ],
          ),
        ),
      ]);
  },
});
