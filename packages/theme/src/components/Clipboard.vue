<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-12 17:34:34
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 12:50:59
 * @Description: 剪切板组件
-->
<template>
  <div v-html="copyright" />
</template>

<script>
export default {
  props: {
    html: { type: String, default: '' }
  },

  data: () => ({ location: '' }),

  computed: {
    copyright() {
      const author = this.$themeConfig.author || this.$siteTitle;
      const content = {
        'zh-CN': `${this.html}\n-----\n著作权归${author}所有。\n链接：${location}`,
        'en-US': `${this.html}\n-----\nCopyright by ${author}.\nLink: ${location}`
      };

      return content[this.$lang];
    }
  },

  created() {
    this.location = window.location;
  }
};
</script>
