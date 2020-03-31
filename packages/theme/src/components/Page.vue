<template>
  <main class="page">
    <!-- 路径导航 -->
    <ModuleTransition>
      <BreadCrumb :key="$route.path" />
    </ModuleTransition>

    <slot name="top" />

    <!-- 页面信息 -->
    <ModuleTransition v-if="commentEnable" delay="0.04">
      <PageInfo :key="$route.path" />
    </ModuleTransition>

    <!-- 页面密码 -->
    <ModuleTransition delay="0.08">
      <Password
        v-if="pagePassword && !pageDescrypted"
        :key="$route.path"
        :page="true"
        @enter="password = $event"
      />
    </ModuleTransition>

    <!-- 页面内容 -->
    <ModuleTransition v-show="!pagePassword || pageDescrypted" delay="0.08">
      <Content :key="$route.path" class="theme-default-content" />
    </ModuleTransition>

    <!-- 编辑链接 -->
    <ModuleTransition v-if="!pagePassword || pageDescrypted" delay="0.12">
      <PageEdit :key="$route.path" />
    </ModuleTransition>

    <!-- 页面导航 -->
    <ModuleTransition v-if="!pagePassword || pageDescrypted" delay="0.14">
      <PageNav :key="$route.path" v-bind="{ sidebarItems }" />
    </ModuleTransition>

    <!-- 页面评论 -->
    <ModuleTransition v-if="(!pagePassword || pageDescrypted) && commentEnable" delay="0.16">
      <Comment :key="$route.path" />
    </ModuleTransition>

    <!-- 页脚 -->
    <ModuleTransition delay="0.20">
      <PageFooter :key="$route.path" />
    </ModuleTransition>

    <slot name="bottom" />
  </main>
</template>

<script lang='ts'>
import * as md5 from 'md5';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Comment from '@Comment';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import PageEdit from '@theme/components/PageEdit.vue';
import PageInfo from '@PageInfo';
import PageNav from '@theme/components/PageNav.vue';
import Password from '@theme/components/Password.vue';
import { SidebarItem } from '@theme/util/sidebar';

@Component({
  components: {
    Comment,
    ModuleTransition,
    PageEdit,
    PageInfo,
    PageNav,
    Password
  }
})
export default class Page extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly sidebarItems!: SidebarItem[];

  /** 用户输入的密码 */
  private password = '';

  /** 是否启用评论 */
  private commentEnable() {
    return this.$themeConfig.comment !== false;
  }

  /** 当前页面密码 */
  private get pagePassword() {
    /** 页面当前密码 */
    const { password } = this.$frontmatter;
    const passwordType = typeof password;

    return passwordType === 'undefined'
      ? ''
      : passwordType === 'number'
      ? md5(this.$frontmatter.password.toString())
      : passwordType === 'string'
      ? md5(this.$frontmatter.password)
      : '';
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
</style>
