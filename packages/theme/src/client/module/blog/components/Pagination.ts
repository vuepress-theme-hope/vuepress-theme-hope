import { computed, defineComponent, h, ref, VNode } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";

import "../styles/pagination.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",

  props: {
    /** Number of total items */
    total: { type: Number, default: 10 },
    /** Items per page */
    perPage: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 },
  },

  emits: ["updateCurrentPage"],

  setup(props, { emit }) {
    const themeLocale = useThemeLocaleData();

    const input = ref("");

    const locale = computed(() => themeLocale.value.paginationLocales);

    const totalPages = computed(() => Math.ceil(props.total / props.perPage));

    const enable = computed(
      () => Boolean(totalPages.value) && totalPages.value !== 1
    );

    const displayLeftEllipsis = computed(() => {
      if (totalPages.value < 7) return false;

      return props.currentPage > 4;
    });
    const displayRightEllipsis = computed(() => {
      if (totalPages.value < 7) return false;

      return props.currentPage < totalPages.value - 3;
    });

    /** Page indexs */
    const indexs = computed(() => {
      const { currentPage } = props;
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
      const pageNum = parseInt(index);

      if (pageNum <= totalPages.value && pageNum > 0) navigate(pageNum);
      else
        alert(
          locale.value.errorText.replace(/\$page/g, totalPages.value.toString())
        );
    };

    return (): VNode =>
      h(
        "div",
        { class: "pagination-wrapper" },
        enable.value
          ? h("div", { class: "pagination-list" }, [
              h("div", { class: "page-number" }, [
                // prev button
                props.currentPage > 1
                  ? h(
                      "div",
                      {
                        class: "prev",
                        role: "navigation",
                        unselectable: "on",
                        onClick: () => navigate(props.currentPage - 1),
                      },
                      locale.value.prev
                    )
                  : null,

                // left ellipsis
                ...(displayLeftEllipsis.value
                  ? [
                      h(
                        "div",
                        {
                          role: "navigation",
                          onClick: () => navigate(1),
                        },
                        1
                      ),
                      h("div", { class: "ellipsis" }, "..."),
                    ]
                  : []),

                // numbers
                ...indexs.value.map((num) =>
                  h(
                    "div",
                    {
                      key: num,
                      class: { active: props.currentPage === num },
                      role: "navigation",
                      onClick: () => navigate(num),
                    },
                    num
                  )
                ),

                // right ellipsis
                ...(displayRightEllipsis.value
                  ? [
                      h("div", { class: "ellipsis" }, "..."),
                      h(
                        "div",
                        {
                          role: "navigation",
                          onClick: () => navigate(totalPages.value),
                        },
                        totalPages.value
                      ),
                    ]
                  : []),

                // next button
                props.currentPage < totalPages.value
                  ? h(
                      "div",
                      {
                        class: "next",
                        role: "navigation",
                        unselectable: "on",
                        onClick: () => navigate(props.currentPage + 1),
                      },
                      locale.value.next
                    )
                  : null,
              ]),
              h("div", { class: "navigate-wrapper" }, [
                h(
                  "label",
                  { for: "navigation-text" },
                  `${locale.value.navigate}: `
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
                    class: "navigate",
                    role: "navigation",
                    title: locale.value.action,
                    onClick: () => jumpPage(input.value),
                  },
                  locale.value.action
                ),
              ]),
            ])
          : []
      );
  },
});
