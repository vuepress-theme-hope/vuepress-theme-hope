<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:03
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-25 23:06:00
 * @Description: 页面主体
 *
 * 为每个页面都添加了 路径导航 / 页脚 支持
-->
<template>
  <main class="page">
    <!-- 路径导航 -->
    <ModuleTransition>
      <BreadCrumb :key="$route.path" />
    </ModuleTransition>

    <slot name="top" />

    <!-- 页面信息 -->
    <ModuleTransition delay="0.04">
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
    <ModuleTransition v-if="!pagePassword || pageDescrypted" delay="0.16">
      <Comment :key="$route.path" />
    </ModuleTransition>

    <!-- 页脚 -->
    <ModuleTransition delay="0.20">
      <PageFooter :key="$route.path" />
    </ModuleTransition>

    <slot name="bottom" />
  </main>
</template>

<script>
import * as md5 from 'md5';
import ModuleTransition from '@theme/components/ModuleTransition';
import PageEdit from '@parent-theme/components/PageEdit.vue';
import PageNav from '@parent-theme/components/PageNav.vue';
import Password from '@theme/components/Password.vue';

export default {
  components: { ModuleTransition, PageEdit, PageNav, Password },
  props: {
    sidebarItems: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    /** 用户输入的密码 */
    password: ''
  }),

  computed: {
    /** 当前页面密码 */
    pagePassword() {
      /** 页面当前密码 */
      const { password } = this.$frontmatter;
      const passwordType = typeof password;

      return passwordType === 'undefined'
        ? ''
        : passwordType === 'number'
        ? md5(this.$frontmatter.password.toString())
        : passwordType === ' string'
        ? md5(this.$frontmatter.password)
        : '';
    },

    /** 当前页面解密状态 */
    pageDescrypted() {
      return this.password === this.pagePassword;
    }
  }
};
</script>

<style lang="stylus">
.page
  padding-bottom 2rem
  display block
</style>
