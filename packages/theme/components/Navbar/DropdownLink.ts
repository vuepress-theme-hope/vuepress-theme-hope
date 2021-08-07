import Vue from "vue";
import NavLink from "@theme/components/Navbar/NavLink.vue";

import type { PropType } from "vue";
import type { NavBarConfigItem } from "@theme/utils/navbar";

export default Vue.extend({
  name: "DropdownLink",

  components: { NavLink },

  props: {
    item: { type: Object as PropType<NavBarConfigItem>, required: true },
  },

  data: () => ({
    open: false,
  }),

  computed: {
    dropdownAriaLabel(): string {
      return this.item.ariaLabel || this.item.text;
    },

    iconPrefix(): string {
      const { iconPrefix } = this.$themeConfig;

      return iconPrefix === "" ? "" : iconPrefix || "icon-";
    },
  },

  watch: {
    $route(): void {
      this.open = false;
    },
  },

  methods: {
    setOpen(value: boolean): void {
      this.open = value;
    },

    handleDropdown(event: MouseEvent): void {
      const isTriggerByTab = event.detail === 0;
      if (isTriggerByTab) this.setOpen(!this.open);
    },

    isLastItemOfArray(
      item: NavBarConfigItem,
      array: NavBarConfigItem[]
    ): boolean {
      if (Array.isArray(array)) return item === array[array.length - 1];

      return false;
    },
  },
});
