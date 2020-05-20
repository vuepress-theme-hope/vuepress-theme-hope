<template>
  <Common :sidebar="false">
    <template #sidebar-bottom>
      <BlogInfo v-if="$themeConfig.blog !== false" />
    </template>

    <Password v-if="currentPathEncrypted && !globalEncrypted" @enter="setPassword" />
    <BlogPage v-else />
  </Common>
</template>

<script lang='ts'>
import { Component, Mixins } from "vue-property-decorator";
import BlogInfo from "@theme/components/BlogInfo.vue";
import BlogPage from "@theme/components/BlogPage.vue";
import Common from "@theme/components/Common.vue";
import PageEncryptMixin from "@theme/util/pageEncryptMixin";
import Password from "@theme/components/Password.vue";

@Component({ components: { BlogInfo, BlogPage, Common, Password } })
export default class Blog extends Mixins(PageEncryptMixin) {}
</script>
