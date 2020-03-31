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

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ensureExt, isExternal, isMailto, isTel } from '@theme/util/path';
import { NavBarConfigItem } from '@theme/util/navbar';

@Component
export default class NavLink extends Vue {
  @Prop({ type: Object, required: true })
  private readonly item!: NavBarConfigItem;

  private get link() {
    return ensureExt(this.item.link as string);
  }

  private get exact() {
    if (this.$site.locales)
      return Object.keys(this.$site.locales).some(
        (rootLink) => rootLink === this.link
      );

    return this.link === '/';
  }

  private isExternal = isExternal;

  private isMailto = isMailto;

  private isTel = isTel;

  private focusoutAction() {
    this.$emit('focusout');
  }
}
</script>
