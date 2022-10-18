## vuepress-plugin-next-search

## 本插件最高支持到vuepress v2.0.0-beta.49

后续将由[Mr.Hope](https://github.com/Mister-Hope)进行维护
> 这位是vuepress-theme-hope作者，大家尽可放心！十分感谢大佬接盘！

[VuePress v2] plugin that adds search box.\
[VuePress v2] 搜索插件.

[vuepress v2]: https://v2.vuepress.vuejs.org/

![Version](https://img.shields.io/npm/v/vuepress-plugin-next-search.svg?style=flat-square&logo=npm)
![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-next-search.svg?style=flat-square&logo=npm)
![Total downloads](https://img.shields.io/npm/dt/vuepress-plugin-next-search?style=flat-square&logo=npm)

**三个源码都看了，没错，咱就是……缝合怪，感谢以下三位作者**\
[leo-buneev/vuepress-plugin-fulltext-search](https://github.com/leo-buneev/vuepress-plugin-fulltext-search)\
[z3by/vuepress-plugin-flexsearch](https://github.com/z3by/vuepress-plugin-flexsearch)\
[ota-meshi/vuepress2-plugin-full-text-search](https://github.com/ota-meshi/vuepress2-plugin-full-text-search)

> 理论上支持所有语言的搜索，只是理论奥！\
> In theory, it supports search in all languages, but in theory!

<h2><a href="http://vuepress-plugin-next-search.holajacky.com" target="_blank">在线文档 / Online Docs</a></h2>

**推荐使用在线文档查看如何使用**\
**Recommend using online documentation to see how to use**

**文档只有中文，来个英语牛B的大佬帮忙更新下英文文档，万分感谢**\
**But the document is only in Chinese,I hope someone kind can help me update the English document**

## 为什么造轮子？

企业内部局域网有一个大型文档，不对外开放，又想全文搜索，所以就有了这个\
同时上面前两位的作品，中文搜索有问题，第三位的作品，样式有问题，所以，就有了咱出手来个回首掏，借花献给全世界的小可爱们（褒义词，蟹蟹）\
There is no need to translate the above sentence

## 安装/Install

```shell
npm i -D vuepress-plugin-next-search
```

## 用法/Usage

* 非常重要：如果你使用的插件版本>1.0.0，需要确保在docs下有`.vuepress\styles\index.scss`这个文件，即使是个空的也可以，这个问题后期会解决掉

如果没有夜间模式和多语言，建议使用0.0.5

如果想自动跟随主题色，建议使用0.0.14

如果想自动跟随主题色并可以自行设置颜色，建议使用1.X.X（X代表最新版本）

```js
const { nextSearchPlugin } = require('vuepress-plugin-next-search')
```

```js
import { nextSearchPlugin } from 'vuepress-plugin-next-search'
```

例如 / e.g.  `.vuepress/config.ts`

```js
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

或者这样

```js
  plugins: [
    nextSearchPlugin({}),
  ]
```

## 2022.8.15 更新了多语言，除了上述写法以外，也支持如下写法

```js
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
