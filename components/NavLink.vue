<!--
 * @Author: Mr.Hope
 * @Date: 2019-09-18 11:40:17
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-12 10:55:51
 * @Description: 导航栏链接按钮
 *
 * 在官方的基础上添加了图标支持
-->
<template>
  <router-link
    :exact="exact"
    :to="link"
    @focusout.native="focusoutAction"
    class="nav-link"
    v-if="!isExternal(link)"
  >
    <i :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" v-if="item.icon" />
    {{ item.text }}
  </router-link>
  <a
    :href="link"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    @focusout="focusoutAction"
    class="nav-link external"
    v-else
  >
    <i :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" v-if="item.icon" />
    {{ item.text }}
    <OutboundLink />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '@parent-theme/util';

export default {
  props: { item: { required: true } },

  computed: {
    link() {
      return ensureExt(this.item.link);
    },

    exact() {
      if (this.$site.locales) return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link);

      return this.link === '/';
    }
  },

  methods: {
    isExternal,
    isMailto,
    isTel,
    focusoutAction() {
      this.$emit('focusout');
    }
  }
};
</script>
