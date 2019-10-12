<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-12 17:34:34
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-12 22:54:23
 * @Description: 剪切板组件
-->
<template>
  <div v-html="`${html}\n-----\n著作权归${$themeConfig.author||$siteTitle}所有。\n链接：${location}`" />
</template>

<script>
export default {
  props: ['html'],

  data: () => ({ location: '' }),

  created() {
    this.location = window.location;
  }
};
</script>
