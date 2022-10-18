---
title: 安装与使用
date: 2022-06-09
star: true
icon: flower
category: 
- 中文指南
tag:
- 中文安装
- 中文使用
---

:::: info 非学无以广才，非志无以成学
::: right
摘自 [《诫子书》- 诸葛亮](https://hanyu.baidu.com/shici/detail?pid=ce7bcf07f57411e58fb0c8e0eb15ce01&from=kg0)
:::
::::

<!-- more -->

## 前言

![Version](https://img.shields.io/github/stars/holajacky/vuepress-plugin-next-search?style=flat-square&logo=github)&ensp;
![Version](https://img.shields.io/npm/v/vuepress-plugin-next-search.svg?style=flat-square&logo=npm)&ensp;
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-next-search.svg?style=flat-square&logo=npm)&ensp;
![Total downloads](https://img.shields.io/npm/dt/vuepress-plugin-next-search?style=flat-square&logo=npm)&ensp;

当你的内容灰常灰常多的时候，我更推荐你使用\
`@vuepress/plugin-docsearch@next`\
如果文档要求保密性，或者是局域网文档的话，请联系作者优化插件以适配大型文档

**为什么现在不优化超大型文档的搜索功能？**
1. 懒
2. 没有大型文档给我测试

**`next-search`的优缺点很明显：**
- 优点
  - 在保证文档的隐私性的同时，实现了全文搜索
  - 更好的适配了手机端
  - 因为是本地缓存搜索，所以速度杠杠滴！
- 缺点
  - 当文档内容过大的时候，客户端需要承担相应的搜索压力
  - 不适合大型文档（每篇文档的文字都是动辄数万字数的那种）
  - 用爱发电，更新随缘

请自行斟酌是否使用

## 安装

::: code-tabs#install

@tab:active npm

```shell
npm i -D vuepress-plugin-next-search
```

@tab yarn

```shell
yarn add -D vuepress-plugin-next-search
```

:::

## 使用

* 非常重要：如果你使用的插件版本>1.0.0，需要确保在docs下有`.vuepress\styles\index.scss`这个文件，即使是个空的也可以，这个问题后期会解决掉

如果没有夜间模式和多语言，建议使用0.0.5

如果想自动跟随主题色，建议使用0.0.14

如果想自动跟随主题色并可以自行设置颜色，建议使用1.X.X（X代表最新版本）

::: code-tabs#usage

@tab:active ESM

```ts
import { nextSearchPlugin } from 'vuepress-plugin-next-search'
```

@tab CJS

```ts
const { nextSearchPlugin } = require('vuepress-plugin-next-search')
```

:::

只需要在你的`.vuepress/config{.ts,.js}`内的`plugins`中引用插件即可

完整引用如下

```ts
  plugins: [
    nextSearchPlugin({
      fullText: true,
      placeholder: '搜索',
      frontmatter: {
        tag: '标签',
        category: '分类',
      }
    }),
  ]
```

或者也可以这样

```ts
  plugins: [
    nextSearchPlugin({}),
  ]
```

## 2022.8.15 更新了多语言，除了上述写法以外，也支持如下写法

```ts
  plugins: [
    nextSearchPlugin({
      locales:{
        '/':{
          fullText: true,
          placeholder: '搜索',
          frontmatter: {
            tag: '标签',
            category: '分类',
          }
        },
        '/en/':{
          fullText: true,
          placeholder: 'search',
          frontmatter: {
            tag: 'tag',
            category: 'category',
          }
        }
      }
    }),
  ]
```

## 2022.8.16 更新了功能：自动适配主题颜色

要使用如下功能，需要插件版本>1.0.0，并且确保有`.vuepress\styles\index.scss`这个文件，即使是个空的也可以，全部选项都是非必填，不填的选项会自动使用当前主题颜色

0.0.14以下版本不需要此文件也可以使用

稳定版为0.0.14&0.0.5，按需食用

```scss
:root {
  //查询框内输入文字颜色
  --next-search-input-text-color: var(--c-text);
  //查询框选中后边框颜色
  --next-search-input-accent-border-color: var(--c-brand);
  //查询框未选中时边框颜色
  --next-search-input-border-color: var(--c-border);
  //查询结果内所有框线的颜色
  --next-search-border-color: var(--c-border);
  //查询结果的背景底色（包括查询详情背景颜色）
  --next-search-bg-color: var(--c-bg);
  //一级大标题的字体颜色
  --next-search-ppt-text-color: var(--c-bg);
  //一级大标题的背景底色
  --next-search-ppt-bg-color: var(--c-brand);
  //二级小标题的字体颜色
  --next-search-pt-text-color: var(--c-brand);
  //二级小标题的背景底色
  --next-search-pt-bg-color: var(--c-bg-light);
  //查询详情字体颜色
  --next-search-item-text-color: var(--c-brand-light);
  //查询高亮结果字体颜色
  --next-search-hl-text-color: var(--c-bg);
  //查询高亮结果字体背景色
  --next-search-hl-bg-color: var(--c-brand);
  //鼠标移入后详情的背景颜色
  --next-search-item-accent-bg-color: var(--c-brand-light);
  //鼠标移入后查查询详情字体颜色
  --next-search-item-accent-text-color: var(--c-bg);
  //鼠标移入后查询高亮结果字体颜色
  --next-search-hl-accent-text-color: var(--c-brand);
  //鼠标移入后查询高亮结果字体背景色
  --next-search-hl-accent-bg-color: var(--c-bg);
}
```

自定义配色请在`.vuepress\styles\index.scss` 内修改上述几项即可，由于使用跟随主题色的原因，可选色并不是很多，下方是我自己整理的一个官方主题日间模式的颜色搭配，夜间模式待补全

```scss
:root {
  --next-search-input-text-color: #2c3e50;
  --next-search-input-accent-border-color: #3eaf7c;
  --next-search-input-border-color: #eaecef;
  --next-search-border-color: #eaecef;
  --next-search-bg-color: #ffffff;
  --next-search-ppt-text-color: #ffffff;
  --next-search-ppt-bg-color: #3eaf7c;
  --next-search-pt-text-color: #3eaf7c;
  --next-search-pt-bg-color: #F5FFFA;
  --next-search-item-text-color: #3eaf7c;
  --next-search-hl-text-color: #ffffff;
  --next-search-hl-bg-color: #3eaf7c;
  --next-search-item-accent-bg-color: #F0FFF0;
  --next-search-item-accent-text-color: #3eaf7c;
  --next-search-hl-accent-text-color: #ffffff;
  --next-search-hl-accent-bg-color: #3eaf7c;
}

html.dark {
  --next-search-input-text-color: xxx;
}
```
