import Vue, { PropType } from "vue";
import Anchor from "@theme/components/Anchor.vue";
import Comment from "@Comment";
import MyTransition from "@theme/components/MyTransition.vue";
import PageEdit from "@theme/components/PageEdit.vue";
import { PageHeader } from "@mr-hope/vuepress-types";
import PageInfo from "@PageInfo";
import PageNav from "@theme/components/PageNav.vue";
import Password from "@theme/components/Password.vue";
import { SidebarItem } from "@theme/util/sidebar";

export default Vue.extend({
  name: "Page",

  components: {
    Anchor,
    Comment,
    MyTransition,
    PageEdit,
    PageInfo,
    PageNav,
    Password,
  },
  props: {
    sidebarItems: {
      type: Array as PropType<SidebarItem[]>,
      default: (): SidebarItem[] => [],
    },
    headers: {
      type: Array as PropType<PageHeader[]>,
      default: (): PageHeader[] => [],
    },
  },

  data: () => ({
    password: "",
  }),

  computed: {
    commentEnable(): boolean {
      return this.$themeConfig.comment !== false;
    },

    pagePassword(): string {
      const { password } = this.$frontmatter;

      return typeof password === "number"
        ? password.toString()
        : typeof password === "string"
        ? password
        : "";
    },

    pageDescrypted(): boolean {
      return this.password === this.pagePassword;
    },
  },
});
