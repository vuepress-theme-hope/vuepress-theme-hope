# 幻灯片支持

<!--lint disable no-duplicate-headings-->

让你的 VuePress 站点中的 Markdown 文件支持幻灯片。

本插件利用了 [reveal.js](https://revealjs.com/) 来支持这一功能。

## 配置

```js
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
