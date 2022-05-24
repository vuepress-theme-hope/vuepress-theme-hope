# CodePen

This component adds CodePen demos.

You can use it in Markdown to add a embed demo。

<!-- more -->

## Demo

A demo with user and slug hash:

<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="isDarkmode? 'dark': 'light'"
/>

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="isDarkmode? 'dark': 'light'"
/>
```

A demo with link:

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="isDarkmode? 'dark': 'light'"
/>

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="isDarkmode? 'dark': 'light'"
/>
```

<script setup lang="ts">
import { useDarkMode } from '@vuepress/theme-default/lib/client'

const isDarkmode = useDarkMode();
</script>
