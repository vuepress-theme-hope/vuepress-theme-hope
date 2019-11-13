---
icon: flowchart
---

# 流程图支持 <MyBadge text="V0.0.10+" />

让你的 VuePress 站点中的 Markdown 文件支持流程图。

## 配置

```js
module.exports = {
  themeConfig: {
    markdown: {
      // 启用流程图功能
      flowchart: true
    }
  }
};
```

## 语法

```md
@flowstart [preset]

<!-- 放置你的流程图代码 -->

@flowend
```

目前可用的预设：

- `vue`（默认）
- `ant`

## 演示

@flowstart
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
@flowend

```md
@flowstart
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
@flowend
```

## 流程图介绍

详见 [流程图介绍](https://vuepress-md-enhance.mrhope.site/guide/flowchart.html#%E6%B5%81%E7%A8%8B%E5%9B%BE%E4%BB%8B%E7%BB%8D)。
