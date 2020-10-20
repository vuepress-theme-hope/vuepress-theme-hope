import { Component, Prop, Vue } from "vue-property-decorator";
import { BlogOptions } from "@theme/types";
import BloggerInfo from "@theme/components/Blog/BloggerInfo.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import { SidebarItem } from "@theme/util/sidebar";
import SidebarLinks from "@theme/components/SidebarLinks.vue";

@Component({ components: { BloggerInfo, SidebarLinks, NavLinks } })
export default class Sidebar extends Vue {
  @Prop({ type: Array, required: true })
  private readonly items!: SidebarItem[];

  private get blogConfig(): BlogOptions {
    return this.$themeConfig.blog || {};
  }

  private get sidebarDisplay(): "mobile" | "none" | "always" {
    return this.blogConfig.sidebarDisplay || "none";
  }
}
