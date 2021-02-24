import Vue from "vue";

export default Vue.extend({
  name: "CodeGroupItem",

  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  mounted() {
    // eslint-disable-next-line
    if (this.$parent && (this.$parent as any).loadTabs) {
      // eslint-disable-next-line
      (this.$parent as any).loadTabs();
    }
  },
});
