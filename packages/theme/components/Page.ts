/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Prop, Vue } from "vue-property-decorator";
import Anchor from "@theme/components/Anchor.vue";
import Comment from "@Comment";
import MyTransition from "@theme/components/MyTransition.vue";
import PageEdit from "@theme/components/PageEdit.vue";
import PageFooter from "@theme/components/PageFooter.vue";
import { PageHeader } from "@mr-hope/vuepress-types";
import PageInfo from "@PageInfo";
import PageNav from "@theme/components/PageNav.vue";
import Password from "@theme/components/Password.vue";
import { SidebarItem } from "@theme/util/sidebar";

@Component({
  components: {
    Anchor,
    Comment,
    MyTransition,
    PageEdit,
    PageFooter,
    PageInfo,
    PageNav,
    Password,
  },
})
export default class Page extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly sidebarItems!: SidebarItem[];

  @Prop({ type: Array, default: () => [] })
  private readonly headers!: PageHeader[];

  /** 用户输入的密码 */
  private password = "";

  /** 是否启用评论 */
  private commentEnable(): boolean {
    return this.$themeConfig.comment !== false;
  }

  /** 当前页面密码 */
  private get pagePassword(): string {
    /** 页面当前密码 */
    const { password } = this.$frontmatter;

    return typeof password === "number"
      ? password.toString()
      : typeof password === "string"
      ? password
      : "";
  }

  /** 当前页面解密状态 */
  private get pageDescrypted(): boolean {
    return this.password === this.pagePassword;
  }
}
