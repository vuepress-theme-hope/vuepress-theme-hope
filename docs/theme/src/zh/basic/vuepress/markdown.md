---
title: 内置 Markdown 拓展
icon: markdown
category: basic
tags:
  - markdown
---

以下是 VuePress 在 Markdown 基础语法上对 Markdown 功能进行的扩展。

## 标题 Anchor

所有的标题将会自动地应用 anchor 链接。

## 链接

### 内部链接

网站内部的链接，将会被转换成 `<router-link>` 用于 SPA 导航。同时，站内的每一个文件夹下的 `README.md` 或者 `index.md` 文件都会被自动编译为 `index.html`，对应的链接将被视为 `/`。

以如下的文件结构为例:

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   └─ three.md
```

假设你现在在 `foo/one.md` 中:

```md
[Home](../) <!-- 跳转到根部的 README.md -->
[foo](./) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾 (推荐)  -->
```

::: warning

我们始终建议你在文档中使用相对链接连接到文档的其他部分。

:::

### 外部链接

外部的链接将会被自动地设置为 `target="_blank" rel="noopener noreferrer"`，并添加外部链接图标:

- [vuejs.org](https://vuejs.org)
- [VuePress on GitHub](https://github.com/vuejs/vuepress)

## Frontmatter

VuePress 提供了对 [YAML frontmatter](https://jekyllrb.com/docs/frontmatter/) 开箱即用的支持。

Frontmatter 必须是 Markdown 文件中的第一部分，并且必须采用在三点划线之间书写的有效的 YAML。 这是一个基本的例子:

```md
---
title: Blogging Like a Hacker
lang: en-US
---
```

在这些三条虚线之间，你可以设置变量。然后，你可以使用 `$frontmatter` 访问这些变量。这些数据可以在当前 Markdown 的正文，或者是任意的自定义或主题组件中使用。

::: tip

在 VuePress 中，Frontmatter 是 **可选的**。

:::

### 其他格式的 Frontmatter

除了 YAML 之外，VuePress 也支持 JSON 或者 [TOML](https://github.com/toml-lang/toml) 格式的 front matter。

JSON front matter 需要以花括号开头和结尾:

```
---
{
  "title": "Blogging Like a Hacker",
  "lang": "en-US"
}
---
```

TOML front matter 需要显式地标注为 TOML:

```
---toml
title = "Blogging Like a Hacker"
lang = "en-US"
---
```

## 目录

输入:

```md
[[toc]]
```

输出:

<!--lint disable no-shortcut-reference-link no-undefined-references-->

[[toc]]

<!--lint enable no-shortcut-reference-link no-undefined-references-->

## 自定义容器 <Badge text="默认主题"/>

输入:

```md
::: tip

这是一个提示

:::

::: warning

这是一个警告

:::

::: danger

这是一个危险警告

:::

::: details

这是一个详情块，在 Internet Explorer / Edge 中不生效

:::
```

输出:

::: tip

这是一个提示

:::

::: warning

这是一个警告

:::

::: danger

这是一个危险警告

:::

::: details

这是一个详情块，在 Internet Explorer / Edge 中不生效

:::

你也可以自定义块中的标题:

````md
::: danger STOP

危险区域，禁止通行

:::

::: details 点击查看代码

```js
console.log("你好，VuePress！");
```

:::
````

::: danger STOP

危险区域，禁止通行

:::

::: details 点击查看代码

```js
console.log("你好，VuePress！");
```

:::

## 代码块中的语法高亮

VuePress 使用了 [Prism](https://prismjs.com/) 来为 Markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名:

::: details 例子

输入:

````
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

输出:

```js
export default {
  name: "MyComponent",
  // ...
};
```

输入:

````
```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
````

输出:

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

:::

你可以在 Prism 的网站上查看 [合法的语言列表](https://prismjs.com/#languages-list)。

## 代码块中的行高亮

你可以在语言后添加 `{行}` 来高亮特定的行。

::: details 例子

````
``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

:::

除了单行以外，你也可指定多行，行数区间，或是两者都指定。

- 行数区间: 例如 `{5-8}`, `{3-10}`, `{10-17}`
- 多个单行: 例如 `{4,7,9}`
- 行数区间与多个单行: 例如 `{4,7-13,16,23-27,40}`

::: details 例子

````
``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn’t highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
````

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn’t highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

:::

## 行号

默认情况下，每个代码块显示行号，但你可以通过设置 `markdown.lineNumbers` 为 `false` 禁用它:

## 导入代码段 <Badge text="beta" type="warning"/>

你可以通过下述的语法导入已经存在的文件中的代码段:

```md
<<< @/filepath
```

它也支持 [行高亮](#代码块中的行高亮):

```md
<<< @/filepath{highlightLines}
```

::: details 例子

输入:

```md
<<< @/../../packages/theme/node/eject.ts{6-14}
```

输出

<<< @/../../packages/theme/node/eject.ts{6-14}

:::

::: tip 注意

由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，此处的 `@` 默认值是 `process.cwd()`。

:::

为了只导入对应部分的代码，你也可运用 [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding)。你可以在文件路径后方的 `#` 紧接着提供一个自定义的区域名称 (预设为 `snippet` )

::: details 例子

输入:

```md
<<< @/../../packages/theme/node/eject.ts#exclude-files{2-8}
```

代码文件:

<<< @/../../packages/theme/node/eject.ts

输出:

<<< @/../../packages/theme/node/eject.ts#exclude-files{2-8}

:::
