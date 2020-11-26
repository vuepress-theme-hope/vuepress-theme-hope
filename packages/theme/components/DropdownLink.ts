import Vue, { PropType } from "vue";
import DropdownTransition from "@theme/components/DropdownTransition.vue";
import { NavBarConfigItem } from "@theme/util/navbar";
import NavLink from "@theme/components/NavLink.vue";

export default Vue.extend({
  name: "DropdownLink",

  components: { NavLink, DropdownTransition },

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
