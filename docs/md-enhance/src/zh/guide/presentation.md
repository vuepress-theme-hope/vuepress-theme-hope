---
icon: presentation
---

# 幻灯片支持

<!--lint disable no-duplicate-headings-->

让你的 VuePress 站点中的 Markdown 文件支持幻灯片。

本插件利用了 [reveal.js](https://revealjs.com/) 来支持这一功能。

## 配置

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // 启用幻灯片
        presentation: true,
      },
    ],
  ],
};
```

你也可以传入一个对象以进行更详细的配置。

`presentation.plugins` 接收一个字符串数组，让您可以自由配置是否启用一些预设的插件。

::: tip

可接受的插件有:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

:::

你还可以使用 `presentation.revealConfig` 来配置全局传递给 Reveal.js 的配置选项。

Reveal.js 还提供了[更多的插件](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)。如果你需要某个特定的插件，请在 GitHub 上提出 [Feature Request](https://github.com/Mister-Hope/vuepress-theme-hope/issues/new?assignees=Mister-Hope&labels=enhancement&template=feature_request.md&title=%5BFeature+Request%5D)

## 语法

- 使用 `---` 分割幻灯片
- 使用 `--` 对幻灯片进行二次分割(垂直显示)

```md
@slidestart [theme]

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

目前可用的主题:

- `auto` (默认)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

## 演示

@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

````md
@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend
````

## 选项

您可以在 Frontmatter 设置 `reveal` 以设置特定页面的 reveal.js 选项，也可以在插件选项中设置 `presentation` 以全局设置 reveal.js。

更多选项，请参见[reveal.js config](https://revealjs.com/config/)，更多用法，请参阅 [reveal.js 文档](https://revealjs.com/)。

## 主题

<!-- markdownlint-disable -->

### Auto

@slidestart

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Black

@slidestart black

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### White

@slidestart white

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### League

@slidestart league

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Beige

@slidestart beige

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Sky

@slidestart sky

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Night

@slidestart night

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Serif

@slidestart serif

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Simple

@slidestart simple

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Solarized

@slidestart solarized

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Blood

@slidestart blood

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Moon

@slidestart moon

## 幻灯片标题

一个拥有文字和 [链接](https://mrhope.site) 的段落

---

## 代码着色

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

<!-- markdownlint-restore -->
