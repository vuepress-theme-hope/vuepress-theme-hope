---
title: Flowchart
icon: route
---

<!-- #region before -->

Let the Markdown file support flow chart in your VuePress site.

<!-- more -->

## Settings

Install [flowchart.ts](http://flowchart.js.org/) in your project:

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

Then enabling via:

<!-- #endregion before -->

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable flowchart
      flowchart: true,
    }),
  ],
};
```

<!-- #region after -->

## Syntax

````md
<!-- ↓ :preset is optional -->

```flow:preset

<!-- Your flowchart code here. -->

```
````

Available presets for now:

- `vue` (default)
- `ant`
- `pie`

## Playground

<FlowChartPlayground />

## Demo

::: md-demo Vue theme

```flow
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
```

:::

::: md-demo Ant theme

```flow:ant
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
```

:::

::: md-demo Pie theme

```flow:pie
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
```

:::

## Flowchart Intro

### Node Types

Defines the shape that the node will take.

::: md-demo Start & End

- `[Variable]->start: [Text]`

  Used as the first node where flows start from.
  Default text is `Start`.

- `[Variable]->end: [Text]`

  Used as the last node where a flow ends.
  Default text is `End`.

```flow
st=>start: Start
e=>end: End

st->e
```

:::

::: md-demo Operation

Indicates that an operation needs to happen in the flow.

- `[Variable]->operation: [Text]`

```flow
process=>operation: Operation
e=>end: End

process->e
```

:::

::: md-demo Input / Output

Indicates that IO happens in a flow.

- `[Variable]->inputoutput: [Text]`

```flow
process=>inputoutput: Inputoutput
e=>end: End

process->e
```

:::

::: md-demo Subroutine

Indicates that a subroutine happens in the flow and that there should be another flowchart that documents this subroutine.

- `[Variable]->subroutine: [Text]`

```flow
process=>subroutine: Subroutine
e=>end: End

process->e
```

:::

::: md-demo Condition

Allows for a conditional or logical statement to direct the flow into one of two or more paths.

- `[Variable]->condition: [Text]`

- `[Variable]([yesText])->[Position]`
- `[Variable]([noText])->[Position]`

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

:::

::: md-demo Parallel

Allows for multiple flows to happen simultaneously.

- `[Variable]->parallel: [Text]`
- `[Variable](path1, direction)->[Position]`
- `[Variable](path1, direction)->[Position]`

```flow
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
```

:::

## Connections

Connections are defined in their own section below the node definitions.

The `->` operator specifies a connection from one node to another like `nodeVar1->nodeVar2->nodeVar3`.

Not all nodes need to be specified in one string and can be separated like so

```md
nodeVar1->nodeVar2
nodeVar2->nodeVar3
```

Connection syntax is as follows:

`<node variable name>[(<specification1>[, <specification2])]-><node variable name>[[(<specification1>[, <specification2])]-><node variable name>]`

Items in `[]` are optional.

### Directions

The following directions are available and define the direction the connection will leave the node from. If there are more than one specifier, it is always the last. All nodes have a default direction making this an optional specification. `<direction>` will be used and one of the below list should be used in its place.

- `left`
- `right`
- `top`
- `bottom`

### Node Specific Specifiers by Type

Each node variable has optional specifiers, like direction, and some have special specifiers depending on the node type that are defined below. Specifiers are added after the variable name in `()` and separated with `,` like `nodeVar(spec1, spec2)`.

- **start**
  **operation**
  **inputoutput**
  **subroutine**

  Optional direction

  `startVar(<direction>)->nextNode`

  `operationVar(<direction>)->nextNode`

  `inputoutputVar(<direction>)->nextNode`

  `subroutineVar(<direction>)->nextNode`

- **condition**

  Required logical specification of `yes` or `no`

  Optional direction

  ```md
  conditionalVar(yes, <direction>)->nextNode1
  conditionalVar(no, <direction>)->nextNode2
  ```

- **parallel**

  Required path specification of `path1`, `path2`, or `path3`

  Optional direction

  ```md
  parallelVar(path1, <direction>)->nextNode1
  parallelVar(path2, <direction>)->nextNode2
  parallelVar(path3, <direction>)->nextNode3
  ```

### Links

An external link can be added to a node with the `:>` operator.

The `st` node is linked with `http://www.google.com` and will open a new tab because `[blank]` is at the end of the URL.

The `e` node is linked with `http://www.yahoo.com` and will cause the page to navigate to that page instead of opening a new tab.

```md
st=>start: Start:>http://www.google.com[blank]
e=>end: End:>http://www.yahoo.com
```

## Advice

Symbols that should possibly not be used in the text: `=>` and `->` and `:>` and `|` and `@>` and `:$`

To emphasize a specific path in your flowchart, you can define it like this:

```md
st@>op1({"stroke":"Red"})@>cond({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})@>c2({"stroke":"Red"})@>op2({"stroke":"Red"})@>e({"stroke":"Red"})
```

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const FlowChartPlayground = defineAsyncComponent(()=> import('@FlowChartPlayground'));
</script>

<!-- #endregion after -->
