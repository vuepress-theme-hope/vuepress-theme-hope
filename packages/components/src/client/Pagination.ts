/* eslint-disable vue/require-explicit-emits */
import Vue from "vue";
import { ComponentI18NConfig } from "@mr-hope/vuepress-shared";
import { componentI18n } from "./define";

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
      if (this.totalPages <= 5) return false;

      return this.currentPage > 4;
    },

    displayRightEllipsis(): boolean {
      if (this.totalPages <= 5) return false;

      return this.currentPage <= this.totalPages - 3;
    },

    /** Page indexs */
    indexs(): number[] {
      let min = 1;
      let max = this.totalPages;
      const arr = [];

      if (this.totalPages >= 7)
        if (this.currentPage > 4 && this.currentPage < this.totalPages - 3) {
          min = Number(this.currentPage) - 2;
          max = Number(this.currentPage) + 2;
        } else if (this.currentPage <= 4) {
          min = 1;
          max = 5;
        } else {
          max = this.totalPages;
          min = this.totalPages - 4;
        }

      // Generate page index
      for (let i = min; i <= max; i++) arr.push(i);

      return arr;
    },

    i18n(): ComponentI18NConfig["pagination"] {
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
      const path = `${this.$route.path}${page === 1 ? "" : `?page=${page}`}`;

      this.$emit("change", page);
      if (this.$route.fullPath !== path) void this.$router.push(path);
    },

    /** Check and navigate to certain page */
    jumpPage(index: string): void {
      const pageNum = parseInt(index);

      if (pageNum <= this.totalPages && pageNum > 0) this.navigate(pageNum);
      else {
        const errorText = this.i18n.errorText.split("$page");

        alert(`${errorText[0]}${this.totalPages}${errorText[1]}`);
      }
    },
  },
});
