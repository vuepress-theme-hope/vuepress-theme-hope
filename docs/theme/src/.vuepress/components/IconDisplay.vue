<template>
  <div class="icon-display-wrapper">
    <div
      v-for="icon in icons"
      :key="icon"
      class="icon"
      @click="copyToClipboard(icon)"
    >
      <div class="iconfont" :class="icon" />
      <div class="text" v-text="icon" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Message from "@mr-hope/vuepress-plugin-copy-code/lib/client/message";
import { i18n } from "@mr-hope/vuepress-plugin-copy-code/lib/node/i18n";

let message;

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
    message = new Message();
    axios.get(this.link).then(({ data }) => {
      const regExp = new RegExp(`\\n\\.(${this.iconPrefix}.*?):before`, "g");
      let result;

      while ((result = regExp.exec(data))) this.icons.push(result[1]);
    });
  },

  methods: {
    copyToClipboard(content) {
      const selection = document.getSelection();

      /** current selection */
      const selectedRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

      const textAreaElement = document.createElement("textarea");

      textAreaElement.value = content;
      textAreaElement.setAttribute("readonly", "");
      textAreaElement.style.position = "absolute";
      textAreaElement.style.top = "-9999px";
      document.body.appendChild(textAreaElement);

      textAreaElement.select();
      document.execCommand("copy");

      message.pop((i18n[this.$localePath] || i18n["/en/"]).copy);

      document.body.removeChild(textAreaElement);

      // recover the previous selection
      if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }
    },
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
    padding 16px 10px
    border-radius 6px
    text-align center

    @media (max-width 768px)
      width 25%

    @media (max-width 412px)
      width 33.333%

    &:hover
      background-color var(--bgcolor-light)
      cursor pointer

    .iconfont
      color var(--dark-grey)
      font-size 32px

    .text
      margin-top 10px
      font-size 14px
</style>
