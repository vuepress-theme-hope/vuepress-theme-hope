---
title: Kotlin Playground
icon: fab fa-kickstarter
---

The plugin provides you kotlin playground support.

<!-- more -->

<!-- #region settings -->

## Settings

Install `kotlin-playground` in your project:

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

Then enabling via:

<!-- #endregion settings -->

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // enable kotlin playground
      kotlinPlayground: true,
    }),
  ],
};
```

@tab JS

```js {8} title=".vuepress/config.js"
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // enable kotlin playground
      kotlinPlayground: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## Usage

To use kotlin playground, you should use a container named `kotlin-playground`.

In it, you can use 2 directives:

- `@file Filename` then a code block to add files

  The first file will be the main file, and others will be considered as hidden dependency.

- `@setting` then a json block to customize settings.

  Supported options:

  - `data-version`: Target Kotlin compiler version
  - `data-min-compiler-version`: Minimum target Kotlin compiler version
  - `data-target-platform`: target platform, can be `junit`, `canvas`, `js` or `java` (default).
  - `data-highlight-only`: Read-only mode, with only highlighting. `data-highlight-only: "nocursor"` means no focus on editor.

    Or, you can make only a part of code read-only by placing it between `//sampleStart` and `//sampleEnd` markers. If you don't need this just set `none-markers`.

  - `data-js-libs`: By default component loads jQuery and makes it available to the code running in the editor. If you need any additional JS libraries, specify them as comma-separated list in this attribute.
  - `data-output-height`: Set the iframe height in px in output. Use for target platform canvas, default is `200`.
  - `data-crosslink`: Show link for open in playground, can be `enabled` or `disabled`, defaults to `undefined` – only supported in playground.
  - `data-shorter-height`: show expander if height more than value of attribute, defaults to `100`.
  - `data-scrollbar-style`: Chooses a scrollbar implementation, Defaults to `overlay`.

  - `args`: Command line arguments.

  - `folded-button`: set to false to hide code snippet

  - `auto-indent`: Whether to use the context-sensitive indentation, can be `true` or `false` (default).

  - `theme`: Editor IntelliJ IDEA themes, can be `idea`, `darcula` `default`.

  - `mode`: Different languages styles. Runnable snippets only with kotlin, can be `kotlin` (default) ,`js`, `java`, `groovy`, `xml`, `c`, `shell`, `swift`, `obj-c`.

  - `autocomplete` Get completion on every key press, can be `true` or `false` (default). If false => Press `ctrl` + `space` to activate autocompletion.

  - `highlight-on-fly`: Errors and warnings check for each change in the editor, can be `true` or `false` (default).

  - `indent`: How many spaces a block should be indented. Defaults to `4`.

  - `lines`: Whether to show line numbers to the left of the editor, can be `true` or `false` (default).

  - `from` and `to`: Create a part of code. Example from line 5 to line 10.

  - `match-brackets`: Determines whether brackets are matched whenever the cursor is moved next to a bracket, can be `true` or `false` (default).

  You can see the below demos to see more details.

You can import and call `defineKotlinPlaygroundConfig` in [client config file][client-config] to customize `kotlin-playground`:

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
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

## Demo

:::: md-demo Basic Playground

::: kotlin-playground Playground title

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

:::: md-demo Readonly Playground

::: kotlin-playground Readonly Playground

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

:::: md-demo Playground with tests

::: kotlin-playground Test Playground

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

:::: md-demo Playground with external js libraries

::: kotlin-playground External JS Libraries

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

:::: md-demo Playground with multiple files

::: kotlin-playground Multiple files

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

[client-config]: https://vuejs.press/guide/configuration.html#client-config-file

<!-- #endregion after -->
