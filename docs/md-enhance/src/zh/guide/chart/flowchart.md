---
title: 流程图
icon: route
---

<!-- #region before -->

让你的 VuePress 站点中的 Markdown 文件支持流程图。

<!-- more -->

## 配置

在你的项目中安装 [flowchart.ts](http://flowchart.js.org/):

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D flowchart.ts
```

@tab yarn

```bash
yarn add -D flowchart.ts
```

@tab npm

```bash
npm i -D flowchart.ts
```

:::

之后启用它:

<!-- #endregion before -->

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用流程图
      flowchart: true,
    }),
  ],
};
```

<!-- #region after -->

## 语法

````md
<!-- ↓ :preset 是可选的 -->

```flow:preset

<!-- 放置你的流程图代码 -->

```
````

目前可用的预设:

- `vue` (默认)
- `ant`
- `pie`

## 在此尝试

<FlowChartPlayground />

## 演示

::: md-demo Vue 主题

```flow
st=>start: 开始|past:>http://www.google.com[blank]
e=>end: 结束|future:>http://www.google.com
op1=>operation: 操作1|past
op2=>operation: 操作2|current
sub1=>subroutine: 子程序|invalid
cond=>condition: 是/否?|approved:>http://www.google.com
c2=>condition: 判断2|rejected
io=>inputoutput: 进行反思...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```

:::

::: md-demo Ant 主题

```flow:ant
st=>start: 开始|past:>http://www.google.com[blank]
e=>end: 结束|future:>http://www.google.com
op1=>operation: 操作1|past
op2=>operation: 操作2|current
sub1=>subroutine: 子程序|invalid
cond=>condition: 是/否?|approved:>http://www.google.com
c2=>condition: 判断2|rejected
io=>inputoutput: 进行反思...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```

:::

::: md-demo Pie 主题

```flow:pie
st=>start: 开始|past:>http://www.google.com[blank]
e=>end: 结束|future:>http://www.google.com
op1=>operation: 操作1|past
op2=>operation: 操作2|current
sub1=>subroutine: 子程序|invalid
cond=>condition: 是/否?|approved:>http://www.google.com
c2=>condition: 判断2|rejected
io=>inputoutput: 进行反思...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```

:::

## 流程图介绍

### 节点类型

定义了结点形状

::: md-demo 开始 & 结束

- `[Variable]->start: [Text]`

  被用于流程开始的第一个节点。
  默认文字为 `Start`.

- `[Variable]->end: [Text]`

  被用于流程结束的最后一个节点。
  默认文字为 `End`.

```flow
st=>start: 开始
e=>end: 结束

st->e
```

:::

::: md-demo 操作

- `[Variable]->operation: [Text]`

```flow
process=>operation: 操作
e=>end: 结束

process->e
```

:::

::: md-demo 输入输出

- `[Variable]->inputoutput: [Text]`

```flow
process=>inputoutput: 输入输出
e=>end: 结束

process->e
```

:::

::: md-demo 子程序

- `[Variable]->subroutine: [Text]`

```flow
process=>subroutine: 子程序
e=>end: 结束

process->e
```

:::

::: md-demo 条件

- `[Variable]->condition: [Text]`

- `[Variable]([yesText])->[Position]`
- `[Variable]([noText])->[Position]`

```flow
cond=>condition: 是否执行操作?
process=>operation: 操作
e=>end: 结束

cond(yes)->process->e
cond(no)->e
```

:::

::: md-demo 平行

定义同时开始的多个程序。

- `[Variable]->parallel: [Text]`
- `[Variable](path1, direction)->[Position]`
- `[Variable](path1, direction)->[Position]`

```flow
para=>parallel: 平行任务
process=>operation: 操作
e=>end: 结束

para(path1, bottom)->process->e
para(path2)->e
```

:::

### 链接

连接方式在流程图中节点定义后描述，使用 `->` 指定一个节点之间的链接，例如 `nodeVar1->nodeVar2->nodeVar3`

流程可以被分开:

```md
nodeVar1->nodeVar2
nodeVar2->nodeVar3
```

连接格式定义如下:

`<node variable name>[(<specification1>[, <specification2])]-><node variable name>[[(<specification1>[, <specification2])]-><node variable name>]`

在 `[]` 中的项是可选的。

### 方向

以下方向可用，并定义了连接将从节点离开的方向。如果指定符不止一个，则总是最后一个。所有节点都有默认方向，这使其成为可选规范。`<direction>` 的可选值为:

- `left`
- `right`
- `top`
- `bottom`

### 节点特定说明符

每个节点变量都有可选的说明符，例如方向，有些变量有特殊的说明符，具体取决于下面定义的节点类型。在 `()` 中的变量名后添加说明符，并用`,` 分隔，例如 `nodeVar (spec1，spec2)`。

- **start**
  **operation**
  **inputoutput**
  **subroutine**

  可选方向

  `startVar(<direction>)->nextNode`

  `operationVar(<direction>)->nextNode`

  `inputoutputVar(<direction>)->nextNode`

  `subroutineVar(<direction>)->nextNode`

- **condition**

  必需指定 `yes` or `no`

  可选方向

  ```md
  conditionalVar(yes, <direction>)->nextNode1
  conditionalVar(no, <direction>)->nextNode2
  ```

- **parallel**

  必需指定路径方向 `path1`, `path2`, 或 `path3`

  可选方向

  ```md
  parallelVar(path1, <direction>)->nextNode1
  parallelVar(path2, <direction>)->nextNode2
  parallelVar(path3, <direction>)->nextNode3
  ```

### 网址

可以使用 `:>` 运算符将外部链接添加到节点。

`[blank]` 指定打开新的页面

```md
st=>start: Start:>http://www.google.com[blank]
e=>end: End:>http://www.yahoo.com
```

### 建议

文本中可能不应该使用的符号: `=>`、`->`、 `:>`、`|`、`@>` 和 `:$`

如果要在流程图中强调特定路径，则可以另外定义它，如下所示:

```
st@>op1({"stroke":"Red"})@>cond({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})@>c2({"stroke":"Red"})@>op2({"stroke":"Red"})@>e({"stroke":"Red"})
```

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const FlowChartPlayground = defineAsyncComponent(()=> import('@FlowChartPlayground'));
</script>

<!-- #endregion after -->
