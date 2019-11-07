<template>
  <div v-show="enable" class="comments-wrapper">
    <Valine v-if="options.type==='valine'" :valine-config="options" />
    <Vssue v-else :title="$title" />
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
};
</script>
