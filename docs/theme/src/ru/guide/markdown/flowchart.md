---
title: Flowchart
icon: tree
  - Markdown
tag:
  - Flowchart
  - Markdown
---

Пусть файл Markdown поддерживает блок-схему на вашем сайте VuePress.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        flowchart: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        flowchart: true,
      },
    },
  }),
};
```

:::

## Синтаксис

````md
<!-- ↓ :preset is optional -->

```flow:preset

<!-- Your flowchart code here. -->

```
````

Доступные пресеты на данный момент:

- `vue` (по умолчанию)
- `ant`
- `pie`

## Демо

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

````md
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
````

## Введение в блок-схему

### Типы узлов

Определяет форму, которую примет узел.

### Начало и Конец

Используется как первый узел, с которого начинаются потоки.
Текст по умолчанию `Start`.

- `[Variable]->start: [Text]`

Используется как последний узел, где заканчивается поток.
Текст по умолчанию `End`.

- `[Variable]->end: [Text]`

````md
```flow
st=>start: Start
e=>end: End

st->e
```
````

```flow
st=>start: Start
e=>end: End

st->e
```

### Операция

Указывает, что в потоке должна быть выполнена операция.

- `[Variable]->operation: [Text]`

````md
```flow
process=>operation: Operation
e=>end: End

process->e
```
````

```flow
process=>operation: Operation
e=>end: End

process->e
```

### Ввод / Вывод

Указывает, что ввод-вывод происходит в потоке.

- `[Variable]->inputoutput: [Text]`

````md
```flow
process=>inputoutput: Inputoutput
e=>end: End

process->e
```
````

```flow
process=>inputoutput: Inputoutput
e=>end: End

process->e
```

### Подпрограмма

Указывает, что в потоке происходит подпрограмма и что должна быть другая блок-схема, документирующая эту подпрограмму.

- `[Variable]->subroutine: [Text]`

````md
```flow
process=>subroutine: Subroutine
e=>end: End

process->e
```
````

```flow
process=>subroutine: Subroutine
e=>end: End

process->e
```

### Условие

Позволяет условному или логическому оператору направить поток по одному из двух или более путей.

- `[Variable]->condition: [Text]`

- `[Variable]([yesText])->[Position]`
- `[Variable]([noText])->[Position]`

````md
```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```
````

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

### Параллельно

Позволяет одновременно выполнять несколько потоков.

- `[Variable]->parallel: [Text]`
- `[Variable](path1, direction)->[Position]`
- `[Variable](path1, direction)->[Position]`

````md
```flow
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
```
````

```flow
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
```

## Соединения

Соединения определяются в отдельном разделе под определениями узлов.

Оператор `->` указывает соединение от одного узла к другому, например `nodeVar1->nodeVar2->nodeVar3`.

Не все узлы должны быть указаны в одной строке и могут быть разделены таким образом

```md
nodeVar1->nodeVar2
nodeVar2->nodeVar3
```

Синтаксис подключения следующий:

`<node variable name>[(<specification1>[, <specification2])]-><node variable name>[[(<specification1>[, <specification2])]-><node variable name>]`

Элементы в `[]` являются необязательными.

### Направления

Доступны следующие направления, которые определяют направление, из которого соединение выйдет из узла. Если имеется более одного спецификатора, он всегда будет последним. Все узлы имеют направление по умолчанию, поэтому это необязательная спецификация. Будет использоваться. `<direction>`, и вместо него следует использовать один из приведенных ниже списков.

- `left`
- `right`
- `top`
- `bottom`

### Специфичные для узла спецификаторы по типу

Каждая переменная узла имеет необязательные спецификаторы, такие как направление, а некоторые имеют специальные спецификаторы в зависимости от типа узла, которые определены ниже. Спецификаторы добавляются после имени переменной в `()` и разделяются символом `,`, например, `nodeVar(spec1, spec2)`.

- **start**
  **operation**
  **inputoutput**
  **subroutine**

  Дополнительное направление

  `startVar(<direction>)->nextNode`

  `operationVar(<direction>)->nextNode`

  `inputoutputVar(<direction>)->nextNode`

  `subroutineVar(<direction>)->nextNode`

- **condition**

  Требуемая логическая спецификация `yes` или `no`

  Дополнительное направление

  ```md
  conditionalVar(yes, <direction>)->nextNode1
  conditionalVar(no, <direction>)->nextNode2
  ```

- **parallel**

  Требуемая спецификация пути `path1`, `path2`, или `path3`

  Дополнительное направление

  ```md
  parallelVar(path1, <direction>)->nextNode1
  parallelVar(path2, <direction>)->nextNode2
  parallelVar(path3, <direction>)->nextNode3
  ```

### Ссылки

Внешняя ссылка может быть добавлена к узлу с помощью оператора `:>`.

Узел `st` связан с `http://www.google.com` и откроет новую вкладку, потому что `[blank]` находится в конце URL-адреса.

Узел `e` связан с `http://www.yahoo.com` и заставит страницу перейти на эту страницу вместо открытия новой вкладки.

```md
st=>start: Start:>http://www.google.com[blank]
e=>end: End:>http://www.yahoo.com
```

## Совет

Символы, которые, возможно, не следует использовать в тексте: `=>` и `->` и `:>` и `|` и `@>` и `:$`

Чтобы выделить конкретный путь в блок-схеме, вы можете определить его следующим образом:

```md
st@>op1({"stroke":"Red"})@>cond({"stroke":"Red","stroke-width":6,"arrow-end":"classic-wide-long"})@>c2({"stroke":"Red"})@>op2({"stroke":"Red"})@>e({"stroke":"Red"})
```
