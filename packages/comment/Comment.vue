<template>
  <div v-show="enable" class="comments-wrapper">
    <Valine v-if="options.type === 'valine'" :valine-config="options" />
    <Vssue v-else-if="options.type === 'vssue'" :title="$title" />
  </div>
</template>

<script lang='ts'>
/* global COMMENT_OPTIONS */
import { Component, Prop, Vue } from 'vue-property-decorator';
import Valine from './src/Valine.vue';

@Component({ components: { Valine } })
export default class Comment extends Vue {
  /** 是否启用 */
  @Prop({ type: Boolean, default: true })
  private readonly enable!: boolean;

  /** 插件配置 */
  private options = COMMENT_OPTIONS;
}
</script>
