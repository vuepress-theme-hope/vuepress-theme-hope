---
# 这是文章的标题
title: 页面配置
# 你可以自定义封面图片
cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: Ms.Hope
# 设置写作时间
date: 2020-01-01
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
tag:
  - 页面配置
  - 使用指南
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: 这是测试显示的页脚
# 你可以自定义版权信息
copyright: 无版权
---

`more` 注释之前的内容被视为文章摘要。

<!-- more -->

## 页面标题

The first H1 title in Markdown will be regarded as page title.

Markdown 中的第一个 H1 标题会被视为页面标题。

你可以在 Markdown 的 Frontmatter 中设置页面标题。

```md
---
title: 页面标题
---
```

## 页面信息

你可以在 Markdown 的 Frontmatter 中设置页面信息。

- 作者设置为 Ms.Hope。
- 写作日期为 2020 年 1 月 1 日
- 分类为 “使用指南”
- 标签为 “页面配置” 和 “使用指南”

## 页面内容

你可以自由在这里书写你的 Markdown。

::: tip 图片引入

- 你可以将图片和 Markdown 文件放置在一起使用相对路径进行引用。
- 对于 `.vuepress/public` 文件夹的图片，请使用绝对链接 `/` 进行引用。

:::

## 组件

每个 Markdown 页面都会被转换为一个 Vue 组件，这意味着你可以在 Markdown 中使用 Vue 语法：

{{ 1 + 1 }}

<!-- markdownlint-disable MD033 -->

<ul>
  <li v-for="i in 3">{{ i }}</li>
</ul>

<!-- markdownlint-enable MD033 -->

你也可以创建并引入你自己的组件。

<MyComponent />

<script setup>
import { defineComponent, h, ref } from 'vue';

const MyComponent = defineComponent({
  setup() {
    const input = ref('Hello world!');
    const onInput = (e) => {
      input.value = e.target.value;
    };

    return () => [
      h('p', [
        h('span','输入: '),
        h('input', {
          value: input.value,
          onInput,
        }),
      ]),
      h('p', [h('span','输出: '), input.value]),
    ];
  },
});
</script>

---

主题包含一些有用的组件。这里是一些例子:

- 文字结尾应该有深蓝色的 徽章文字 徽章。 <Badge text="徽章文字" color="#242378" />

- 一个卡片:

  ```component VPCard
  title: Mr.Hope
  desc: Where there is light, there is hope
  logo: https://mister-hope.com/logo.svg
  link: https://mister-hope.com
  background: rgba(253, 230, 138, 0.15)
  ```
