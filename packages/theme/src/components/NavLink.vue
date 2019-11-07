<!--
 * @Author: Mr.Hope
 * @Date: 2019-09-18 11:40:17
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 12:58:22
 * @Description: 导航栏链接按钮
 *
 * 在官方的基础上添加了图标支持
-->
<template>
  <router-link
    v-if="!isExternal(link)"
    class="nav-link"
    :exact="exact"
    :to="link"
    @focusout.native="focusoutAction"
  >
    <i v-if="item.icon" :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" />
    {{ item.text }}
  </router-link>
  <a
    v-else
    class="nav-link external"
    :href="link"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    @focusout="focusoutAction"
  >
    <i v-if="item.icon" :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" />
    {{ item.text }}
    <OutboundLink />
  </a>
</template>

<script>
import { ensureExt, isExternal, isMailto, isTel } from '@parent-theme/util';

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

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
