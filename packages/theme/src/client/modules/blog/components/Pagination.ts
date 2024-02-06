import type { VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { Message } from "vuepress-shared/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import "vuepress-shared/client/styles/message.scss";
import "../styles/pagination.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",

  props: {
    /**
     * Number of total items
     *
     * 项目总数
     */
    total: { type: Number, default: 10 },
    /**
     * Items per page
     *
     * 每页项目数
     */
    perPage: { type: Number, default: 10 },

    /**
     * Current page number
     *
     * 当前页面
     */
    current: { type: Number, default: 1 },
  },

  emits: ["updateCurrentPage"],

  setup(props, { emit }) {
    let message: Message;
    const themeLocale = useThemeLocaleData();

    const input = ref("");

    const locale = computed(() => themeLocale.value.paginationLocales);

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
    const navigate = (page: number): void => emit("updateCurrentPage", page);

    /** Check and navigate to certain page */
    const jumpPage = (index: string): void => {
      const pageNum = parseInt(index, 10);

      if (pageNum <= totalPages.value && pageNum > 0) navigate(pageNum);
      else
        message.pop(
          `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>${locale.value.errorText.replace(
            /\$page/gu,
            totalPages.value.toString(),
          )}`,
        );
    };

    onMounted(() => {
      message = new Message();
    });

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
                        onClick: () => navigate(props.current - 1),
                      },
                      locale.value.prev,
                    )
                  : null,

                // Left ellipsis
                displayLeftEllipsis.value
                  ? [
                      h(
                        "div",
                        {
                          role: "navigation",
                          onClick: () => navigate(1),
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
                      onClick: () => navigate(num),
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
                          onClick: () => navigate(totalPages.value),
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
                        onClick: () => navigate(props.current + 1),
                      },
                      locale.value.next,
                    )
                  : null,
              ]),
              h("div", { class: "vp-pagination-nav" }, [
                h(
                  "label",
                  { for: "navigation-text" },
                  `${locale.value.navigate}: `,
                ),
                h("input", {
                  id: "navigation-text",
                  value: input.value,
                  onInput: ({ target }: InputEvent) => {
                    input.value = (<HTMLInputElement>target).value;
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
                    role: "navigation",
                    title: locale.value.action,
                    onClick: () => jumpPage(input.value),
                  },
                  locale.value.action,
                ),
              ]),
            ])
          : [],
      );
  },
});
