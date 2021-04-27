---
title: Builtin Markdown features
icon: markdown
category: basic
tags:
  - markdown
---

Here are some enhance VuePress makes on Markdown syntax.

## Header Anchors

Headers automatically get anchor links applied.

## Links

### Internal Links

Internal links are converted to `<router-link>` for SPA navigation. Also, every `README.md` or `index.md` contained in each sub-directory will automatically be converted to `index.html`, with corresponding URL `/`.

For example, given the following directory structure:

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

And providing you are in `foo/one.md`:

```md
[Home](../) <!-- Sends the user to the root README.md -->
[foo](./) <!-- Sends the user to index.html of directory foo -->
[foo heading](./#heading) <!-- Anchors user to a heading in the foo README file -->
[bar - three](../bar/three.md) <!-- You can append .md (recommended) -->
```

::: warning

We always recommend that you use relative links in the document to connect to other parts of the document.

:::

### External Links

Outbound links automatically get `target="_blank" rel="noopener noreferrer"`, and add an external icon:

- [vuejs.org](https://vuejs.org)
- [VuePress on GitHub](https://github.com/vuejs/vuepress)

## Frontmatter

[YAML frontmatter](https://jekyllrb.com/docs/frontmatter/) is supported out of the box:

The frontmatter must be at the top of the Markdown file, and must take the form of valid YAML set between triple-dashed lines. Example:

```md
---
title: Blogging with VuePress
lang: en-US
---
```

Between the triple-dashed lines, you can set variables. These variables can be used via the `$frontmatter` variable. This data will be available to the rest of the page, along with all custom and theming components.

### Alternative frontmatter Formats

VuePress also supports JSON and [TOML](https://github.com/toml-lang/toml) frontmatter syntax.

JSON frontmatter needs to start and end in curly braces:

```md
---
{ "title": "Blogging Like a Hacker", "lang": "en-US" }
---
```

TOML frontmatter needs to be explicitly marked as TOML:

```md
---toml
title = "Blogging Like a Hacker"
lang = "en-US"
---
```

```md
---
title: Blogging Like a Hacker
lang: en-US
---
```

## Table of Contents

Input:

```

[[toc]]

```

Output:

<!--lint disable no-shortcut-reference-link no-undefined-references-->

[[toc]]

<!--lint enable no-shortcut-reference-link no-undefined-references-->

## Custom Containers <Badge text="default theme"/>

Custom containers can be defined by their types, titles, and contents.

### Default Title

Input:

```md
::: tip

This is a tip

:::

::: warning

This is a warning

:::

::: danger

This is a dangerous warning

:::

::: details

This is a details block, which does not work in Internet Explorer / Edge

:::
```

Output:

::: tip

This is a tip

:::

::: warning

This is a warning

:::

::: danger

This is a dangerous warning

:::

::: details

This is a details block, which does not work in Internet Explorer / Edge

:::

### Custom Title

Input:

````md
::: danger STOP

Danger zone, do not proceed

:::

::: details Click me to view the code

```js
console.log("Hello, VuePress!");
```

:::
````

Output:

::: danger STOP

Danger zone, do not proceed

:::

::: details Click me to view the code

```js
console.log("Hello, VuePress!");
```

:::

## Syntax Highlighting in Code Blocks

VuePress uses [Prism](https://prismjs.com/) to highlight language syntax in Markdown code blocks, using coloured text. Prism supports a wide variety of programming languages. All you need to do is append a valid language alias to the beginning backticks for the code block:

::: details Demo

Input:

````
``` js
export default {
  name: 'MyComponent',
  // ...
}
```
````

Output:

```js
export default {
  name: "MyComponent",
  // ...
};
```

Input:

````
``` html
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

Output:

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

:::

A [list of valid languages](https://prismjs.com/#languages-list) is available on Prism’s site.

## Line Highlighting in Code Blocks

You can add `{line}` to highlight specific line.

::: details Demo

Input:

````
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

Output:

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

Beides a single line, you can also specify multiple single lines, ranges, or both:

- Line ranges: for example `{5-8}`, `{3-10}`, `{10-17}`
- Multiple single lines: for example `{4,7,9}`
- Line ranges and single lines: for example `{4,7-13,16,23-27,40}`

::: details Demo

Input:

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

Output:

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

## Line Numbers

By default, line numbers for each code blocks are enabled, you can set `markdown.lineNumbers` to `false` to disable it.

## Import Code Snippets <Badge text="beta" type="warning"/>

You can import code snippets from existing files via following syntax:

```md
<<< @/filepath
```

It also supports [line highlighting](#line-highlighting-in-code-blocks):

```md
<<< @/filepath{highlightLines}
```

::: details Demo

Input:

```md
<<< @/../../packages/theme/node/eject.ts{6-14}
```

Output:

<<< @/../../packages/theme/node/eject.ts{6-14}

:::

::: tip

Since the import of the code snippets will be executed before webpack compilation, you can’t use the path alias in webpack. The default value of `@` is `process.cwd()`.

:::

You can also use a [VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding) to only include the corresponding part of the code file. You can provide a custom region name after a `#` following the filepath (`snippet` by default):

::: details 例子

Input:

```md
<<< @/../../packages/theme/node/eject.ts#exclude-files{2-8}
```

Code file:

<<< @/../../packages/theme/node/eject.ts

Output:

<<< @/../../packages/theme/node/eject.ts#exclude-files{2-8}

:::
