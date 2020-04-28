<template>
  <Common v-slot="slotProps" :sidebar="$frontmatter.blog !== true">
    <Password v-if="currentPathEncrypted && !globalEncrypted" @enter="setPassword" />

    <BlogPage v-else-if="$frontmatter.blog && $themeConfig.blog !== false" />

    <Home v-else-if="$frontmatter.home" />

    <Page v-else :sidebar-items="slotProps.sidebarItems">
      <slot slot="top" name="page-top" />
      <slot slot="bottom" name="page-bottom" />
    </Page>
  </Common>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator';
import BlogPage from '@theme/components/BlogPage.vue';
import Common from '@theme/components/Common.vue';
import Home from '@theme/components/Home.vue';
import Page from '@theme/components/Page.vue';
import PageEncryptMixin from '@theme/util/pageEncryptMixin';
import Password from '@theme/components/Password.vue';

@Component({ components: { BlogPage, Common, Home, Page, Password } })
export default class Layout extends Mixins(PageEncryptMixin) {}
</script>
