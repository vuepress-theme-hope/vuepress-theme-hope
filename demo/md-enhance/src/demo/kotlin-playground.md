---
title: Kotlin Playground
---

## Demo

::: kotlin-playground Simple Playground

@file main.kt

```kotlin
class Contact(val id: Int, var email: String)

fun main(args: Array<String>) {
    val contact = Contact(1, "mary@gmail.com")
    println(contact.id)
}
```

:::

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

::: kotlin-playground JS compiler

@file main.kt

```kotlin
fun main(args: Array<String>) {
    println("Hello World!")
}
```

@settings

```json
{
  "data-target-platform": "js"
}
```

:::

::: kotlin-playground JS IR compiler

@file main.kt

```kotlin
fun mul(a: Int, b: Int): Int {
    return a * b
}

fun main(args: Array<String>) {
    print(mul(-2, 4))
}
```

@settings

```json
{
  "data-target-platform": "js-ir"
}
```

:::

::: kotlin-playground WASM compiler

@file main.kt

```kotlin
fun mul(a: Int, b: Int): Int {
    return a * b
}

fun main(args: Array<String>) {
    print(mul(-2, 4))
}
```

@settings

```json
{
  "data-target-platform": "wasm"
}
```

:::

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

@settings

```json
{
  "data-target-platform": "js",
  "data-js-libs": "https://unpkg.com/moment@2"
}
```

:::
