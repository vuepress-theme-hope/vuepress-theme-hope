<template>
  <Common :sidebar="$frontmatter.blog !== true">
    <template #sidebar-bottom>
      <BlogInfo v-if="$frontmatter.blog && $themeConfig.blog !== false" />
    </template>

    <template #default="slotProps">
      <BlogPage v-if="$frontmatter.blog && $themeConfig.blog !== false" />

      <Home v-else-if="$frontmatter.home" />

      <Page v-else :headers="slotProps.headers" :sidebar-items="slotProps.sidebarItems">
        <slot slot="top" name="page-top" />
        <slot slot="bottom" name="page-bottom" />
      </Page>
    </template>
  </Common>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import BlogInfo from "@BlogInfo";
import BlogPage from "@BlogPage";
import Common from "@theme/components/Common.vue";
import Home from "@theme/components/Home.vue";
import Page from "@theme/components/Page.vue";

@Component({ components: { BlogInfo, BlogPage, Common, Home, Page } })
export default class Layout extends Vue {}
</script>
