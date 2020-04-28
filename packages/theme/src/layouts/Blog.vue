<template>
  <Common :sidebar="false">
    <Password v-if="currentPathEncrypted && !globalEncrypted" @enter="setPassword" />
    <BlogPage v-else />
  </Common>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator';
import BlogPage from '@theme/components/BlogPage.vue';
import Common from '@theme/components/Common.vue';
import Password from '@theme/components/Password.vue';
import pageEncryptMixin from '@theme/util/pageEncryptMixin';

@Component({ components: { BlogPage, Common, Password } })
export default class Blog extends Mixins(pageEncryptMixin) {}
</script>
