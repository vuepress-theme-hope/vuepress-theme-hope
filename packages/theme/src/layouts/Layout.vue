<template>
  <div
    :class="pageClasses"
    class="theme-container"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <!-- 密码弹窗 -->
    <Password v-if="globalEncrypted" @enter="globalPasswordCheck" />
    <!-- 内容 -->
    <template v-else>
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <slot slot="top" name="sidebar-top" />
        <slot slot="bottom" name="sidebar-bottom" />
      </Sidebar>

      <Password v-if="currentPathEncrypted && !globalEncrypted" @enter="setPassword" />

      <BlogPage v-else-if="$page.frontmatter.blogpage && blogConfig" />

      <Home v-else-if="$page.frontmatter.home" />

      <Page v-else :sidebar-items="sidebarItems">
        <slot slot="top" name="page-top" />
        <slot slot="bottom" name="page-bottom" />
      </Page>
    </template>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import BlogPage from '@theme/components/BlogPage.vue';
import { EncryptOptions } from '../../types';
import Home from '@theme/components/Home.vue';
import Navbar from '@theme/components/Navbar.vue';
import Page from '@theme/components/Page.vue';
import Password from '@theme/components/Password.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import globalEncryptMixin from '@theme/util/globalEncryptMixin';
import layoutMixin from '@theme/util/layoutMixin.ts';
import pageEncryptMixin from '@theme/util/pageEncryptMixin';

@Component({ components: { BlogPage, Home, Page, Password, Sidebar, Navbar } })
export default class Layout extends Mixins(
  globalEncryptMixin,
  layoutMixin,
  pageEncryptMixin
) {
  /** 博客配置 */
  private get blogConfig() {
    return this.$themeConfig.blog === false
      ? false
      : this.$themeConfig.blog || {};
  }
}
</script>
