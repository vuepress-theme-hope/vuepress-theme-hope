---
title: 图表
icon: chart-simple
dir:
  collapsible: false
  order: 4
index: false
---

<!-- #region intro -->

此插件提供了 6 种方法让你将图表插入到 Markdown 文件中。

- Chart.js：一个轻量级、易于使用、高度可定制的图表库。

  与 ECharts 相比，Chart.js 更轻量。

- ECharts：一个强大的、交互式的浏览器图表和可视化库。

  与 Chart.js 相比，ECharts 更强大。

- flowchart: Markdown 扩展，用于生成流程图和序列图。

  轻量级，只关注流程图。

- Markmap: 从 Markdown 生成思维导图

  运行环境非常重，不推荐使用。

- Mermaid：从 Markdown 生成图表和流程图。

  常用图表的强大集合。

- Plantuml: 基于 Java 的 UML 图表

  没有任何运行时，极其轻量。

<!-- #endregion intro -->

<!-- more -->

## 案例

<!-- #region demo -->

### Chart.js

::: chartjs 一个散点图案例

```json
{
  "type": "scatter",
  "data": {
    "datasets": [
      {
        "label": "散点数据集",
        "data": [
          { "x": -10, "y": 0 },
          { "x": 0, "y": 10 },
          { "x": 10, "y": 5 },
          { "x": 0.5, "y": 5.5 }
        ],
        "backgroundColor": "rgb(255, 99, 132)"
      }
    ]
  },
  "options": {
    "scales": {
      "x": {
        "type": "linear",
        "position": "bottom"
      }
    }
  }
}
```

:::

- [查看详情](./chartjs.md)

### ECharts

::: echarts 一个折线图案例

```json
{
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "data": [150, 230, 224, 218, 135, 147, 260],
      "type": "line"
    }
  ]
}
```

:::

- [查看详情](./echarts.md)

### 流程图

```flow
cond=>condition: 是否执行操作?
process=>operation: 操作
e=>end: 结束

cond(yes)->process->e
cond(no)->e
```

- [查看详情](./flowchart.md)

### Markmap

````markmap
---
markmap:
  colorFreezeLevel: 2
---

# markmap

## 链接

- <https://markmap.js.org/>
- [GitHub](https://github.com/markmap/markmap)

## 功能

- 链接
- **强调** ~~删除线~~ *斜体* ==高亮==
- 多行
  文字
- `行内代码`
-
    ```js
    console.log('code block');
    ```
- Katex
  - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
- 现在我们可以通过 `maxWidth` 选项自动换行非常非常非常非常非常非常非常非常非常非常长的内容
````

- [查看详情](./markmap.md)

### Mermaid 图表

```mermaid
---
title: Flowchart
---
flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2
```

- [查看详情](./mermaid.md)

### Plantuml

@startuml
scale 5 as 150 pixels

clock clk with period 1
binary "启用" as en
binary "读/写" as rw
binary "数据有效" as dv
concise "数据总线" as db
concise "地址总线" as addr

@6 as :write_beg
@10 as :write_end

@15 as :read_beg
@19 as :read_end

@0
en is low
db is "0x0"
addr is "0x03f"
rw is low
dv is 0

@:write_beg-3
en is high
@:write_beg-2
db is "0xDEADBEEF"
@:write_beg-1
dv is 1
@:write_beg
rw is high

@:write_end
rw is low
dv is low
@:write_end+1
rw is low
db is "0x0"
addr is "0x23"

@12
dv is high
@13
db is "0xFFFF"

@20
en is low
dv is low
@21
db is "0x0"

highlight :write_beg to :write_end #Gold:写
highlight :read_beg to :read_end #lightBlue:读

db@:write_beg-1 <-> @:write_end : 设置时间
db@:write_beg-1 -> addr@:write_end+1 : 保持
@enduml

- [查看详情](./plantuml.md)

<!-- #endregion demo -->
