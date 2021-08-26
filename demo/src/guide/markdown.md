---
icon: markdown
title: Markdown Enhance
category: Guide
tag:
  - markdown
---

`vuepress-theme-hope` enables more syntax in Markdown via the built-in [md-enhance](https://vuepress-theme-hope.github.io/md-enhance) plugin.

<!-- more -->

## Enable all

You can set `themeconfig.mdEnhance.enableAll` to enable all features of the [md-enhance](https://vuepress-theme-hope.github.io/md-enhance) plugin.

```js {3-5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      enableAll: true,
    },
  },
};
```

## New Feature

### Superscript and Subscript

19^th^ H~2~O

::: details Code

```md
19^th^ H~2~O
```

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/sup-sub/)

### Align

::: center

I am center

:::

::: right

I am right align

:::

:::: details Code

```md
::: center

I am center

:::

::: right

I am right align

:::
```

::::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/align/)

### Footnote

This text has footnote[^first].

[^first]: This is footnote content

::: details Code

```md
This text has footnote[^first].

[^first]: This is footnote content
```

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/footnote/)

### Mark

You can mark ==important words== .

::: details Code

```md
You can mark ==important words== .
```

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/mark/)

### Tasklist

- [x] Plan A
- [ ] Plan B

::: details Code

```md
- [x] Plan A
- [ ] Plan B
```

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/tasklist/)

### Flowchart

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

::: details Code

````md
```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```
````

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/flowchart/)

## Mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

::: details Code

````md
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/mermaid/)

### Tex

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

::: details Code

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/tex/)

### Demo

::: demo A normal demo

```html
<h1>Mr.Hope</h1>
<p>Is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome!");
});
```

```css
span {
  color: red;
}
```

:::

:::: details Code

````md
::: demo A normal demo

```html
<h1>Mr.Hope</h1>
<p>Is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome!");
});
```

```css
span {
  color: red;
}
```

:::
````

::::

::: demo [react] A react demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope is <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::

:::: details Code

````md
::: demo [react] A react demo

```js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope is <span>{this.state.message}</span>
      </div>
    );
  }
}
```

```css
.box-react span {
  color: red;
}
```

:::
````

::::

::: demo [vue] A vue demo

```vue
<template>
  <div class="box">
    Mr.Hope is <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "very handsome" }),
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

:::: details Code

````md
::: demo [vue] A vue demo

```vue
<template>
  <div class="box">
    Mr.Hope is <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "very handsome" }),
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````

::::

::: demo A normal demo

```md
# Title

is very handsome.
```

```ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::

:::: details Code

````md
::: demo A normal demo

```md
# Title

is very handsome.
```

```ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::
````

::::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/demo/)

### Presentation

@slidestart

## Slide 1

A paragraph with some text and a [link](https://mrhope.site)

---

## Slide 2

- Item 1
- Item 2

---

## Slide 3.1

```js
const a = 1;
```

--

## Slide 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

::: details Code

````md
@slidestart

## Slide 1

A paragraph with some text and a [link](https://mrhope.site)

---

## Slide 2

- Item 1
- Item 2

---

## Slide 3.1

```js
const a = 1;
```

--

## Slide 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend
````

:::

- [View Detail](https://vuepress-theme-hope.github.io/guide/markdown/presentation/)

## Other Syntax

::: info custom title

A custom information container

:::

::: tip custom title

A custom tip container

:::

::: warning custom title

A custom warning container

:::

::: danger custom Title

A custom danger container

:::

::: details custom title

A custom details container

:::

:::: details Code

```md
::: info custom title

A custom information container

:::

::: tip custom title

A custom tip container

:::

::: warning custom title

A custom warning container

:::

::: danger custom Title

A custom danger container

:::

::: details custom title

A custom details container

:::
```

::::
