---
title: Демоверсии
icon: discover
category:
  - Демо
docs:
  - name: Fast Request
    url: https://dromara.org/fast-request/en/
    source: https://github.com/dromara/fast-request
    preview: /assets/image/fast-request.jpg

  - name: Waline
    url: https://waline.js.org/en/
    source: https://github.com/walinejs/waline
    preview: /assets/image/waline.jpg

  - name: ALIST
    url: https://alist.nn.ci/
    source: https://github.com/alist-org/docs
    preview: /assets/image/alist.jpg

  - name: Taskiq
    url: https://taskiq-python.github.io/
    source: https://github.com/taskiq-python/taskiq/tree/master/docs
    preview: /assets/image/taskiq.jpg

  - name: Nosana
    url: https://docs.nosana.io/
    source: https://github.com/nosana-ci/docs.nosana.io
    preview: /assets/image/nosana.jpg

  - name: Pulsar
    url: https://pulsar-edit.dev/
    source: https://github.com/pulsar-edit/pulsar-edit.github.io
    preview: /assets/image/plusar.jpg

blog:
  - name: Блог Mr.Hope
    url: https://mrhope.site
    source: https://github.com/Mister-Hope/Mister-Hope.github.io
    preview: /assets/image/mrhope.jpg
---

## Живая демонстрация

- [stackblitz](https://stackblitz.com/fork/vuepress-theme-hope)

## Документация

<DemoProject
  v-for="item in $frontmatter.docs"
  :key="item.link"
  :name="item.name"
  :url="item.url"
  :source="item.source"
  :preview="item.preview"
/>

## Блог

<DemoProject
  v-for="item in $frontmatter.blog"
  :key="item.link"
  :name="item.name"
  :url="item.url"
  :source="item.source"
  :preview="item.preview"
/>

## Еще

- Не стесняйтесь добавлять свои

<script setup lang="ts">
import DemoProject from '@DemoProject';
</script>
