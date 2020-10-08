import { computed, defineComponent, ref } from "@vue/composition-api";
import { HopeLangI18nConfigItem, i18n } from "@mr-hope/vuepress-shared-utils";

export default defineComponent({
  name: "Pagination",

  // TODO: Rebuild it in Vue3
  model: {
    prop: "currentPage",
    event: "change",
  },

  props: {
    /** Number of total items */
    total: { type: Number, default: 10 },

    /** Items per page */
    perPage: { type: Number, default: 10 },

    /** Items per page */
    currentPage: { type: Number, required: true },
  },

  // emits: ["change"],

  setup(props) {
    const input = ref("");

    const totalPages = ref(Math.ceil(props.total / props.perPage));

    const enable = Boolean(totalPages.value) && totalPages.value !== 1;

    const displayLeftEllipsis = computed(() => {
      if (totalPages.value <= 5) return false;

      return props.currentPage > 4;
    });

    const displayRightEllipsis = computed(() => {
      if (totalPages.value <= 5) return false;

      return props.currentPage <= totalPages.value - 3;
    });

    /** Page indexs */
    const indexs = computed(() => {
      let min = 1;
      let max = totalPages.value;
      const arr = [];

      if (totalPages.value >= 7)
        if (props.currentPage > 4 && props.currentPage < totalPages.value - 3) {
          min = Number(props.currentPage) - 2;
          max = Number(props.currentPage) + 2;
        } else if (props.currentPage <= 4) {
          min = 1;
          max = 5;
        } else {
          max = totalPages.value;
          min = totalPages.value - 4;
        }

      // Generate page index
      for (let i = min; i <= max; i++) arr.push(i);

      return arr;
    });

    return {
      displayLeftEllipsis,
      displayRightEllipsis,
      enable,
      indexs,
      input,
      totalPages,
    };
  },

  computed: {
    i18n(): HopeLangI18nConfigItem["pagination"] {
      return (
        i18n.getLocale(this.$lang).pagination ||
        i18n.getDefaultLocale().pagination
      );
    },
  },

  mounted(): void {
    const { index } = this.$route.query;

    this.navigate(index ? Number(index) : 1);
  },

  methods: {
    /** Navigate to certain page */
    navigate(index: number): void {
      const path = `${this.$route.path}?index=${index}`;

      this.$emit("change", index);
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
