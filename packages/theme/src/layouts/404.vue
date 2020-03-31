<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote v-text="msg" />
      <router-link to="/">{{ linkText }}</router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { i18n } from '@mr-hope/vuepress-shared-utils';

@Component
export default class NotFound extends Vue {
  private title = '404';

  private msgs = [''];

  private linkText = '带我回家';

  private mounted() {
    const locale =
      this.$themeLocaleConfig.error404 || i18n.getDefaultLocale().error404;

    this.msgs = locale.text;
    this.linkText = locale.link;
  }

  private get msg() {
    return this.msgs[Math.floor(Math.random() * this.msgs.length)];
  }
}
</script>
