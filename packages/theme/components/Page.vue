<template>
  <main class="page">
    <!-- 路径导航 -->
    <MyTransition>
      <BreadCrumb :key="$route.path" />
    </MyTransition>

    <slot name="top" />

    <!-- 页面信息 -->
    <MyTransition v-if="commentEnable" :delay="0.04">
      <PageInfo :key="$route.path" />
    </MyTransition>

    <!-- 页面密码 -->
    <MyTransition :delay="0.08">
      <Password
        v-if="pagePassword && !pageDescrypted"
        :key="$route.path"
        :page="true"
        @enter="password = $event"
      />
    </MyTransition>

    <!-- 页面内容 -->
    <MyTransition v-show="!pagePassword || pageDescrypted" :delay="0.08">
      <Content :key="$route.path" class="theme-default-content" />
    </MyTransition>

    <!-- 编辑链接 -->
    <MyTransition v-if="!pagePassword || pageDescrypted" :delay="0.12">
      <Anchor :key="$route.path" :header="headers" />
    </MyTransition>

    <!-- 编辑链接 -->
    <MyTransition v-if="!pagePassword || pageDescrypted" :delay="0.12">
      <PageEdit :key="$route.path" />
    </MyTransition>

    <!-- 页面导航 -->
    <MyTransition v-if="!pagePassword || pageDescrypted" :delay="0.14">
      <PageNav :key="$route.path" v-bind="{ sidebarItems }" />
    </MyTransition>

    <!-- 页面评论 -->
    <MyTransition v-if="(!pagePassword || pageDescrypted) && commentEnable" :delay="0.16">
      <Comment :key="$route.path" />
    </MyTransition>

    <!-- 页脚 -->
    <MyTransition :delay="0.20">
      <PageFooter :key="$route.path" />
    </MyTransition>

    <slot name="bottom" />
  </main>
</template>

<script lang='ts'>
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
import { SidebarItem } from "../util/sidebar";
import md5 = require("md5");

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
  private commentEnable() {
    return this.$themeConfig.comment !== false;
  }

  /** 当前页面密码 */
  private get pagePassword() {
    /** 页面当前密码 */
    const { password } = this.$frontmatter;
    const passwordType = typeof password;

    return passwordType === "undefined"
      ? ""
      : passwordType === "number"
      ? md5(this.$frontmatter.password.toString())
      : passwordType === "string"
      ? md5(this.$frontmatter.password)
      : "";
  }

  /** 当前页面解密状态 */
  private get pageDescrypted() {
    return this.password === this.pagePassword;
  }
}
</script>

<style lang="stylus">
.page
  padding-bottom 2rem
  display block
  padding-left $sidebarWidth
  background-color var(--background-color)

  // narrow desktop / iPad
  @media (max-width: $MQNarrow)
    padding-left $mobileSidebarWidth

  @media (min-width: ($MQMobile + 1px))
    .theme-container.no-sidebar &
      padding-left 0

  // wide mobile
  @media (max-width: $MQMobile)
    padding-left 0

  @media (min-width: $MQWide)
    .has-anchor &
      padding-right 16rem
</style>
