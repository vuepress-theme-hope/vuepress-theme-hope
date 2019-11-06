<template>
  <div class="comments-wrapper" v-show="enable">
    <Valine :valine-config="options" v-if="options.type==='valine'" />
    <Vssue :title="$title" v-else />
  </div>
</template>

<script>
/* global COMMENT_OPTIONS */
import Valine from './Valine.vue';

export default {
  components: { Valine },

  props: {
    enable: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    options: COMMENT_OPTIONS
  })
}
</script>
