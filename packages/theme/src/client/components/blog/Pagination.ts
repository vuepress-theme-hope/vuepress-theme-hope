import { Message } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";

import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "@vuepress/helper/message.css";
import "../../styles/blog/pagination.scss";

const ERROR_SVG = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>`;

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",

  props: {
    /**
     * Number of total items
     *
     * 项目总数
     */
    total: {
      type: Number,
      default: 10,
    },

    /**
     * Items per page
     *
     * 每页项目数
     */
    perPage: {
      type: Number,
      default: 10,
    },

    /**
     * Current page number
     *
     * 当前页面
     */
    current: {
      type: Number,
      default: 1,
    },
  },

  emits: ["updateCurrentPage"],

  setup(props, { emit }) {
    const message = new Message();
    const themeLocale = useThemeLocale();

    const input = ref("");

    const paginationLocale = computed(
      () => themeLocale.value.paginationLocales,
    );

    const totalPages = computed(() => Math.ceil(props.total / props.perPage));

    const enable = computed(
      () => Boolean(totalPages.value) && totalPages.value !== 1,
    );

    const displayLeftEllipsis = computed(() => {
      if (totalPages.value < 7) return false;

      return props.current > 4;
    });
    const displayRightEllipsis = computed(() => {
      if (totalPages.value < 7) return false;

      return props.current < totalPages.value - 3;
    });

    /** Page indexes */
    const indexes = computed(() => {
      const { current: currentPage } = props;
      let min = 1;
      let max = totalPages.value;
      const arr = [];

      if (totalPages.value >= 7)
        if (currentPage <= 4 && currentPage < totalPages.value - 3) {
          min = 1;
          max = 5;
        } else if (currentPage > 4 && currentPage >= totalPages.value - 3) {
          max = totalPages.value;
          min = totalPages.value - 4;
        } else if (totalPages.value > 7) {
          min = currentPage - 2;
          max = currentPage + 2;
        }

      // Generate page index
      for (let i = min; i <= max; i++) arr.push(i);

      return arr;
    });

    /** Navigate to certain page */
    const navigate = (page: number): void => {
      emit("updateCurrentPage", page);
    };

    /** Check and navigate to certain page */
    const jumpPage = (index: string): void => {
      const pageNum = parseInt(index, 10);

      if (pageNum <= totalPages.value && pageNum > 0) navigate(pageNum);
      else
        message.pop(
          `${ERROR_SVG}${paginationLocale.value.errorText.replace(
            /\$page/gu,
            totalPages.value.toString(),
          )}`,
        );
    };

    return (): VNode =>
      h(
        "div",
        { class: "vp-pagination" },
        enable.value
          ? h("nav", { class: "vp-pagination-list" }, [
              h("div", { class: "vp-pagination-number " }, [
                // Prev button
                props.current > 1
                  ? h(
                      "div",
                      {
                        class: "prev",
                        role: "navigation",
                        unselectable: "on",
                        onClick: () => {
                          navigate(props.current - 1);
                        },
                      },
                      paginationLocale.value.prev,
                    )
                  : null,

                // Left ellipsis
                displayLeftEllipsis.value
                  ? [
                      h(
                        "div",
                        {
                          role: "navigation",
                          onClick: () => {
                            navigate(1);
                          },
                        },
                        1,
                      ),
                      h("div", { class: "ellipsis" }, "..."),
                    ]
                  : null,
                // Numbers
                indexes.value.map((num) =>
                  h(
                    "div",
                    {
                      key: num,
                      class: { active: props.current === num },
                      role: "navigation",
                      onClick: () => {
                        navigate(num);
                      },
                    },
                    num,
                  ),
                ),

                // Right ellipsis
                displayRightEllipsis.value
                  ? [
                      h("div", { class: "ellipsis" }, "..."),
                      h(
                        "div",
                        {
                          role: "navigation",
                          onClick: () => {
                            navigate(totalPages.value);
                          },
                        },
                        totalPages.value,
                      ),
                    ]
                  : null,
                // Next button
                props.current < totalPages.value
                  ? h(
                      "div",
                      {
                        class: "next",
                        role: "navigation",
                        unselectable: "on",
                        onClick: () => {
                          navigate(props.current + 1);
                        },
                      },
                      paginationLocale.value.next,
                    )
                  : null,
              ]),
              h("div", { class: "vp-pagination-nav" }, [
                h(
                  "label",
                  { for: "navigation-text" },
                  `${paginationLocale.value.navigate}: `,
                ),
                h("input", {
                  id: "navigation-text",
                  value: input.value,
                  onInput: ({ target }: InputEvent) => {
                    input.value = (target as HTMLInputElement).value;
                  },
                  onKeydown: (event: KeyboardEvent) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      jumpPage(input.value);
                    }
                  },
                }),
                h(
                  "button",
                  {
                    class: "vp-pagination-button",
                    type: "button",
                    role: "navigation",
                    title: paginationLocale.value.action,
                    onClick: () => {
                      jumpPage(input.value);
                    },
                  },
                  paginationLocale.value.action,
                ),
              ]),
            ])
          : [],
      );
  },
});
