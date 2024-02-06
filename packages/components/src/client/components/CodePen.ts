import type { CodePenOptions } from "create-codepen";
import { renderCodePen } from "create-codepen";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, onMounted } from "vue";

import "../styles/code-pen.scss";

export default defineComponent({
  name: "CodePen",

  props: {
    /**
     * CodePen link
     *
     * CodePen 链接
     */
    link: { type: String, default: "" },

    /**
     * CodePen username
     *
     * CodePen 用户名
     */
    user: { type: String, default: "" },

    /**
     * CodePen hash
     *
     * CodePen hash
     */
    slugHash: { type: String, default: "" },

    /**
     * CodePen title
     *
     * CodePen 标题
     */
    title: { type: String, default: "" },

    /**
     * CodePen height
     *
     * CodePen 高度
     */
    height: {
      type: [String, Number],
      default: 380,
    },

    /**
     * CodePen theme
     *
     * CodePen 主题
     */
    theme: {
      type: String as PropType<"default" | "light" | "dark">,
      default: "default",
    },

    /**
     * CodePen default tab
     *
     * CodePen 默认标签
     */
    defaultTab: {
      type: Array as PropType<string[]>,
      default: () => ["result"],
    },

    /**
     * CodePen loading status
     *
     * CodePen 加载状态
     */
    status: {
      type: String as PropType<"autoload" | "preview" | "clicktorun">,
      default: "preview",
    },
  },

  setup(props) {
    const getInfo = (): {
      user: string | undefined;
      slugHash: string | undefined;
    } => {
      const result =
        /(?:^(?:https?:)?\/\/codepen.io\/|^\/|^)(.*?)\/(?:pen|embed)\/(.*?)\/?$/.exec(
          props.link,
        );

      return {
        user: result?.[1],
        slugHash: result?.[2],
      };
    };

    const user = computed(() => getInfo().user || props.user);

    const slugHash = computed(() => getInfo().slugHash || props.slugHash);

    const options = computed(
      () =>
        <CodePenOptions>{
          user: user.value,
          "slug-hash": slugHash.value,
          "theme-id": props.theme,
          "default-tab": props.defaultTab.join(","),
          "pen-title": props.title,
          height: props.height,
          preview: props.status === "preview" ? "true" : "",
        },
    );

    onMounted(() => {
      if (props.status !== "clicktorun")
        renderCodePen(options.value, `.codepen-${slugHash.value}`);
    });

    return (): VNode =>
      h(
        "div",
        {
          class: ["codepen-wrapper", `codepen-${slugHash.value}`],
        },
        [
          props.status === "clicktorun"
            ? h(
                "button",
                {
                  type: "button",
                  class: "codepen-button",
                  onClick: () => {
                    renderCodePen(options.value, `.codepen-${slugHash.value}`);
                  },
                },
                "Run Code",
              )
            : null,
          h("span", [
            "See the Pen ",
            h("a", { href: props.link }, [props.title]),
            " by ",
            h("a", { href: `https://codepen.io/${user.value}` }, [user.value]),
            " on ",
            h("a", { href: `https://codepen.io` }, ["CodePen"]),
            ".",
          ]),
        ],
      );
  },
});
