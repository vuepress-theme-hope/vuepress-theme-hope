<!--
 * @Author: Mr.Hope
 * @Date: 2020-01-08 20:40:27
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-13 18:29:16
 * @Description: 评论组件
-->
<template>
  <div v-show="enable" class="comments-wrapper">
    <Valine v-if="options.type === 'valine'" :valine-config="options" />
    <Vssue v-else-if="options.type === 'vssue'" :title="$title" />
  </div>
</template>

<script lang='ts'>
/* global COMMENT_OPTIONS */
import { Component, Prop, Vue } from 'vue-property-decorator';
import Valine from './Valine.vue';

@Component({ components: { Valine } })
export default class Comment extends Vue {
  /** 是否启用 */
  @Prop({ type: Boolean, default: true })
  private readonly enable!: boolean;

  /** 插件配置 */
  private options = COMMENT_OPTIONS;
}
</script>
