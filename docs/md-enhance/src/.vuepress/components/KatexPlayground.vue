<template>
  <div class="katex-playground">
    <textarea
      name="katex-playground"
      id="katex-playground"
      cols="30"
      rows="10"
      placeholder="Input your tex here"
      v-model="input"
    />
    <p
      class="katex-block"
      :class="{ 'katex-error': error }"
      v-html="result || 'Here will be the render result'"
    ></p>
  </div>
</template>

<script>
import { renderToString } from "katex";

export default {
  name: "KatexPlayground",

  data: () => ({
    input: `\\frac {\\partial^r} {\\partial \\omega^r} \\left(\\frac {y^{\\omega}} {\\omega}\\right)
= \\left(\\frac {y^{\\omega}} {\\omega}\\right) \\left\\{(\\log y)^r + \\sum_{i=1}^r \\frac {(-1)^ Ir \\cdots (r-i+1) (\\log y)^{ri}} {\\omega^i} \\right\\}`,
    result: "",
    error: false,
  }),

  mounted() {
    try {
      this.result = renderToString(this.input, {
        displayMode: true,
        throwOnError: true,
      });
    } catch (error) {
      this.result = error.toString();
    }
  },

  watch: {
    input(value) {
      try {
        this.result = renderToString(value, {
          displayMode: true,
          throwOnError: true,
        });
        this.error = false;
      } catch (error) {
        this.result = error.toString();
        this.error = true;
      }
    },
  },
};
</script>

<style lang="stylus">
.katex-playground
  textarea
    width 100%
    background-color var(--bgcolor-light)
    color var(--text-color)
    font-size 18px
    border-color var(--border-color)
    resize vertical
</style>
