<template>
  <div class="icon-display-wrapper">
    <div v-for="icon in icons" :key="icon" class="icon">
      <div class="iconfont" :class="icon" />
      <div class="text" v-text="icon" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "IconDisplay",

  props: {
    link: {
      type: String,
      required: true,
    },

    iconPrefix: {
      type: String,
      default: "icon-",
    },
  },

  data: () => ({
    icons: [],
  }),

  mounted() {
    axios.get(this.link).then(({ data }) => {
      const regExp = new RegExp(`\\n\\.(${this.iconPrefix}.*?):before`, "g");
      let result;

      while ((result = regExp.exec(data))) this.icons.push(result[1]);
    });
  },
};
</script>

<style lang="stylus">
.icon-display-wrapper
  display flex
  margin 10px 0
  flex-wrap wrap

  .icon
    box-sizing border-box
    width 20%
    text-align center
    padding 10px

    @media (max-width 768px)
      width 25%

    @media (max-width 412px)
      width 33.333%

    .iconfont
      color var(--dark-grey)
      font-size 32px

    .text
      margin-top 8px
      font-size 14px
</style>
