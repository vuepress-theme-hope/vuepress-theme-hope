<!--
 * @Author: Mr.Hope
 * @Date: 2020-01-13 18:40:39
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-20 14:36:07
 * @Description: 一个简单的加载图标
-->
<template>
  <svg
    style="enable-background:new 0 0 50 50;"
    viewBox="0 0 30 30"
    x="0px"
    xmlns="http://www.w3.org/2000/svg"
    y="0px"
  >
    <rect height="5" width="4" x="0" y="13">
      <animate
        attributeName="height"
        attributeType="XML"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
        values="5;21;5"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
        values="13; 5; 13"
      />
    </rect>
    <rect height="5" width="4" x="10" y="13">
      <animate
        attributeName="height"
        attributeType="XML"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
        values="5;21;5"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
        values="13; 5; 13"
      />
    </rect>
    <rect height="5" width="4" x="20" y="13">
      <animate
        attributeName="height"
        attributeType="XML"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
        values="5;21;5"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
        values="13; 5; 13"
      />
    </rect>
  </svg>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {}
</script>
