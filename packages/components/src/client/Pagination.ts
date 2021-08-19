/* eslint-disable vue/require-explicit-emits */
import Vue from "vue";
import { componentI18n } from "./define";

import type { ComponentI18nConfig } from "../types";

export default Vue.extend({
  name: "Pagination",

  model: {
    prop: "currentPage",
    event: "change",
  },

  props: {
    /** Number of total items */
    total: { type: Number, default: 10 },
    /** Items per page */
    perPage: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 },
  },

  data: () => ({
    input: "",
  }),

  computed: {
    totalPages(): number {
      return Math.ceil(this.total / this.perPage);
    },

    enable(): boolean {
      return Boolean(this.totalPages) && this.totalPages !== 1;
    },

    displayLeftEllipsis(): boolean {
      if (this.totalPages < 7) return false;

      return this.currentPage > 4;
    },

    displayRightEllipsis(): boolean {
      if (this.totalPages < 7) return false;

      return this.currentPage < this.totalPages - 3;
    },

    /** Page indexs */
    indexs(): number[] {
      const { currentPage, totalPages } = this;
      let min = 1;
      let max = totalPages;
      const arr = [];

      if (totalPages >= 7)
        if (currentPage <= 4 && currentPage < totalPages - 3) {
          min = 1;
          max = 5;
        } else if (currentPage > 4 && currentPage >= totalPages - 3) {
          max = totalPages;
          min = totalPages - 4;
        } else if (totalPages > 7) {
          min = currentPage - 2;
          max = currentPage + 2;
        }

      // Generate page index
      for (let i = min; i <= max; i++) arr.push(i);

      return arr;
    },

    i18n(): ComponentI18nConfig["pagination"] {
      return componentI18n[this.$localePath || "/"].pagination;
    },
  },

  mounted(): void {
    const { index } = this.$route.query;

    this.navigate(index ? Number(index) : 1);
  },

  methods: {
    /** Navigate to certain page */
    navigate(page: number): void {
      const query = { ...this.$route.query };

      if (query.page === page.toString() || (page === 1 && !query.page)) return;

      this.$emit("change", page);

      if (page === 1) delete query.page;
      else query.page = page.toString();

      void this.$router.push({ path: this.$route.path, query });
    },

    /** Check and navigate to certain page */
    jumpPage(index: string): void {
      const pageNum = parseInt(index);

      if (pageNum <= this.totalPages && pageNum > 0) this.navigate(pageNum);
      else
        alert(
          this.i18n.errorText.replace(/\$page/g, this.totalPages.toString())
        );
    },
  },
});
