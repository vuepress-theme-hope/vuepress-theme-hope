---
title: Kotlin 交互演示
icon: fab fa-kickstarter
---

此插件提供了 Kotlin 交互演示支持。

<!-- more -->

<!-- #region settings -->

## 设置

在你的项目中安装 `kotlin-playground`:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D kotlin-playground
```

@tab yarn

```bash
yarn add -D kotlin-playground
```

@tab npm

```bash
npm i -D kotlin-playground
```

:::

之后启用它:

<!-- #endregion settings -->

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用 kotlin 交互演示
      kotlinPlayground: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用 kotlin 交互演示
      kotlinPlayground: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## 使用

为了使用 kotlin 交互演示，你应该使用一个名为 `kotlin-playground` 的容器。

在其中，你可以使用 2 个指令:

- `@file 文件名` 紧跟文件的代码块

  第一个文件将是主文件，其他文件将被视为隐藏的依赖项。

- `@setting` 紧跟一个自定义设置的 json 块

  支持的选项:

  - `data-version`: 目标 Kotlin 编译器版本
  - `data-min-compiler-version`: 最低目标 Kotlin 编译器版本
  - `data-target-platform`: 目标平台，可以是 `junit`，`canvas`，`js` 或 `java`（默认）。
  - `data-highlight-only`: 只读模式，仅高亮。`data-highlight-only: "nocursor"` 表示不在编辑器上聚焦。

    或者，您可以通过将其放置在 `//sampleStart` 和 `//sampleEnd` 标记之间来使代码的一部分只读。如果您不需要此功能，请设置 `none-markers`。

  - `data-js-libs`: 默认情况下，组件会加载 jQuery 并使其可用于在编辑器中运行的代码。如果您需要任何其他 JS 库，请将它们指定为此属性中的逗号分隔列表。
  - `data-output-height`: 在输出中以 px 设置 iframe 高度。用于目标平台画布，默认值为 `200`。
  - `data-crosslink`: 显示在 playground 中打开的链接，可以是 `enabled` 或 `disabled`，默认为 `undefined` - 仅在 playground 中支持。
  - `data-shorter-height`: 如果高度大于属性值，则显示展开器，默认值为 `100`。
  - `data-scrollbar-style`: 选择滚动条实现，默认为 `overlay`。
  - `args`: 命令行参数。
  - `folded-button`: 设置为 false 以隐藏代码片段
  - `auto-indent`: 是否使用上下文敏感缩进，可以是 `true` 或 `false`（默认）。
  - `theme`: 编辑器 IntelliJ IDEA 主题，可以是 `idea`，`darcula` `default`。
  - `mode`: 不同的语言风格。只有 kotlin 可以运行片段，可以是 `kotlin`（默认），`js`，`java`，`groovy`，`xml`，`c`，`shell`，`swift`，`obj-c`。
  - `autocomplete` 每次按键都会自动完成，可以是 `true` 或 `false`（默认）。如果为 false => 按 `ctrl` + `space` 激活自动完成。
  - `highlight-on-fly`: 每次更改编辑器时都会检查错误和警告，可以是 `true` 或 `false`（默认）。
  - `indent`: 一个块应缩进多少个空格。默认为 `4`。
  - `lines`: 是否在编辑器左侧显示行号，可以是 `true` 或 `false`（默认）。
  - `from` 和 `to`: 创建代码的一部分。例如从第 5 行到第 10 行。
  - `match-brackets`: 确定每当光标移动到括号旁边时是否匹配括号，可以是 `true` 或 `false`（默认）。

  您可以查看下面的演示以了解更多细节。

你可以在客户端配置文件中导入并调用 `defineKotlinPlaygroundConfig` 来自定义 `kotlin-playground`:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineKotlinPlaygroundConfig } from "vuepress-plugin-md-enhance/client";

defineKotlinPlaygroundConfig({
  // `kotlin-playground` options here
});

export default defineClientConfig({
  // ...
});
```

```ts
interface KotlinPlaygroundOptions {
  server?: string;
  version?: string;

  onChange?: (code: string) => void;
  onRun?: () => void;
  onError?: () => void;
  getJsCode?: (code: string) => void;
  onTestPassed?: () => void;
  onTestFailed?: () => void;
  onOpenConsole?: () => void;
  onCloseConsole?: () => void;
  callback?: (targetNode: HTMLElement, mountNode: HTMLElement) => void;
  getInstance?: (instance: KotlinPlaygroundInstance) => void;
}
```

## 案例

:::: md-demo 基础交互演示

::: kotlin-playground 交互演示标题

@file main.kt

```kotlin
class Contact(val id: Int, var email: String)

fun main(args: Array<String>) {
    val contact = Contact(1, "mary@gmail.com")
    println(contact.id)
}
```

:::

::::

:::: md-demo 只读交互演示

::: kotlin-playground 只读演示

@file main.kt

```kotlin
fun main(args: Array<String>) {
    println("Hello World!")
}
```

@settings

```json
{
  "data-highlight-only": ""
}
```

:::

::::

:::: md-demo 带有测试的交互演示

::: kotlin-playground 测试演示

@file main.kt

```kotlin
import org.junit.Test
import org.junit.Assert

class TestExtensionFunctions() {
    @Test fun testIntExtension() {
        Assert.assertEquals("Rational number creation error: ", RationalNumber(4, 1), 4.r())
    }

    @Test fun testPairExtension() {
        Assert.assertEquals("Rational number creation error: ", RationalNumber(2, 3), Pair(2, 3).r())
    }
}
//sampleStart
/*
Then implement extension functions Int.r() and Pair.r() and make them convert Int and Pair to RationalNumber.
*/
fun Int.r(): RationalNumber = RationalNumber(this, 2)
fun Pair<Int, Int>.r(): RationalNumber = RationalNumber(first, second)

data class RationalNumber(val numerator: Int, val denominator: Int)
//sampleEnd
```

@settings

```json
{
  "data-target-platform": "junit"
}
```

:::

::::

:::: md-demo 使用外部 JS 库的交互演示

::: kotlin-playground 外部 JS 库

@file main.kt

```kotlin
external fun moment(): dynamic

fun main() {
    val startOfDay = moment().startOf("day").fromNow()
    println("The start of the day was $startOfDay")
}
```

@settings

```json
{
  "data-target-platform": "js",
  "data-js-libs": "https://unpkg.com/moment@2"
}
```

:::

::::

:::: md-demo 多个文件的交互演示

::: kotlin-playground 多个文件

@file main.kt

```kotlin
import cat.Cat

fun main(args: Array<String>) {
//sampleStart
    val cat = Cat("Kitty")
    println(cat.name)
//sampleEnd
}
```

@file cat.kt

```kotlin
package cat
class Cat(val name: String)
```

:::

::::

<!-- #endregion after -->
