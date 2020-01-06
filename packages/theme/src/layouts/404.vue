<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote v-text="getMsg()" />
      <router-link to="/">{{ linkText }}</router-link>
    </div>
  </div>
</template>
<script>
const msgs = {
  'zh-CN': [
    '这里什么也没有',
    '我们是怎么来到这儿的？',
    '这 是 四 零 四 !',
    '看起来你访问了一个失效的链接'
  ],
  'en-US': [
    // eslint-disable-next-line quotes
    "There's nothing here.",
    // eslint-disable-next-line quotes
    'How did we get here?',
    // eslint-disable-next-line quotes
    "That's a Four-Oh-Four.",
    // eslint-disable-next-line quotes
    "Looks like we've got some broken links."
  ]
};
const linkTexts = {
  'zh-CN': '带我回家',
  'en-US': 'Take me home'
};

export default {
  name: 'NotFound',

  data: () => ({
    title: '404',
    msgs: '',
    linkText: '带我回家'
  }),

  mounted() {
    this.msgs = msgs[this.$lang];
    this.linkText = linkTexts[this.$lang];
  },

  methods: {
    getMsg() {
      return this.msgs[Math.floor(Math.random() * this.msgs.length)];
    }
  }
};
</script>
