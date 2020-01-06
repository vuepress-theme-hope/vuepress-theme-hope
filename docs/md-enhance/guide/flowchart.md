---
icon: flowchart
---

# 流程图支持

让你的 VuePress 站点中的 Markdown 文件支持流程图。

本插件利用了 [flowchart.js](https://github.com/adrai/flowchart.js) 来支持这一功能。

## 配置

```js
module.exports = {
  plugin: ['@mr-hope/md-enhance', {
    // 启用流程图
    flowchart: true
  }]
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

### 节点类型

定义了结点形状

#### 开始 & 结束

被用于流程开始的第一个节点。
默认文字为 `Start`.

- `[Variable]->start: [Text]`

被用于流程结束的最后一个节点。
默认文字为 `End`.

- `[Variable]->end: [Text]`

```markdown
@flowstart
st=>start: Start
e=>end: End

st->e
@flowend
```

@flowstart
st=>start: Start
e=>end: End

st->e
@flowend

#### 操作

- `[Variable]->operation: [Text]`

```markdown
@flowstart
process=>operation: Operation
e=>end: End

process->e
@flowend
```

@flowstart
process=>operation: Operation
e=>end: End

process->e
@flowend

#### 输入输出

- `[Variable]->inputoutput: [Text]`

```markdown
@flowstart
process=>inputoutput: Inputoutput
e=>end: End

process->e
@flowend
```

@flowstart
process=>inputoutput: Inputoutput
e=>end: End

process->e
@flowend

#### 子程序

- `[Variable]->subroutine: [Text]`

```markdown
@flowstart
process=>subroutine: Subroutine
e=>end: End

process->e
@flowend
```

@flowstart
process=>subroutine: Subroutine
e=>end: End

process->e
@flowend

#### 条件

- `[Variable]->condition: [Text]`

- `[Variable]([yesText])->[Position]`
- `[Variable]([noText])->[Position]`

```markdown
@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend
```

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend

#### 平行

定义同时开始的多个程序。

- `[Variable]->parallel: [Text]`
- `[Variable](path1, direction)->[Position]`
- `[Variable](path1, direction)->[Position]`

```markdown
@flowstart
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
@flowend
```

@flowstart
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
@flowend

### 链接

连接方式在流程图中节点定义后描述，使用 `->` 指定一个节点之间的链接，例如 `nodeVar1->nodeVar2->nodeVar3`

流程可以被分开：

```md
nodeVar1->nodeVar2
nodeVar2->nodeVar3
```

连接格式定义如下：

`<node variable name>[(<specificaion1>[, <specification2])]-><node variable name>[[(<specificaion1>[, <specification2])]-><node variable name>]`

在 `[]` 中的项是可选的。

### 方向

以下方向可用，并定义了连接将从节点离开的方向。如果指定符不止一个，则总是最后一个。所有节点都有默认方向，这使其成为可选规范。`<direction>` 的可选值为：

- left
- right
- top
- bottom

### 节点特定说明符

每个节点变量都有可选的说明符，例如方向，有些变量有特殊的说明符，具体取决于下面定义的节点类型。在 `()` 中的变量名后添加说明符，并用`,` 分隔，例如 `nodeVar（spec1，spec2）`。

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
  conditionalVar(no,  <direction>)->nextNode2
  ```

- **parallel**

  Required path specification of `path1`, `path2`, or `path3`

  Optional direction

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

文本中可能不应该使用的符号：`=>`、`->`、 `:>`、`|`、`@>` 和 `:$`

如果要在流程图中强调特定路径，则可以另外定义它，如下所示：

    st@>op1({"stroke":"Red"})@>cond({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})@>c2({"stroke":"Red"})@>op2({"stroke":"Red"})@>e({"stroke":"Red"})
