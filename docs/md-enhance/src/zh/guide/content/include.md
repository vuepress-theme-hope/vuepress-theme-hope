---
title: 导入文件
icon: fab fa-markdown
---

让你的 VuePress 站点中的 Markdown 文件支持导入其他文件。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用导入支持
      include: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用导入支持
      include: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## 语法

使用 `<!-- @include: filename -->` 导入文件。

如果要部分导入文件，你可以指定导入的行数

- `<!-- @include: filename{start-end} -->`
- `<!-- @include: filename{start-} -->`
- `<!-- @include: filename{-end} -->`

同时你也可以导入文件区域:

- `<!-- @include: filename#region -->`

:::: info 文件区域

文件区域是 vscode 中的一个概念，区域内容被 `#region` 和 `#endregion` 注释包围。

这里有些例子：

::: code-tabs#language

@tab HTML

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- region snippet -->
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi,
      repellendus. Voluptatibus alias cupiditate at, fuga tenetur error officiis
      provident quisquam autem, porro facere! Neque quibusdam animi quaerat
      eligendi recusandae eaque.
    </p>
    <!-- endregion snippet -->
    <p>
      Veniam harum illum natus omnis necessitatibus numquam architecto eum
      dignissimos, quos a adipisci et non quam maxime repellendus alias ipsum,
      vero praesentium laborum commodi perferendis velit repellat? Vero,
      cupiditate sequi.
    </p>
  </body>
</html>
```

@tab Markdown

```md
## Hello world

<!-- #region snippet -->

Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
inventore iure quo aut doloremque, ipsum ab voluptatem ipsa, velit laborum
illo quae omnis reiciendis hic, ut dolorem non debitis in!

<!-- #endregion snippet -->

Veniam harum illum natus omnis necessitatibus numquam architecto eum
dignissimos, quos a adipisci et non quam maxime repellendus alias ipsum,
vero praesentium laborum commodi perferendis velit repellat? Vero,
cupiditate sequi.
```

@tab TS

```ts
import MarkdownIt from "markdown-it";
import { include } from "@mdit/plugin-include";

// #region snippet
const mdIt = MarkdownIt().use(include, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});
// #endregion snippet

mdIt.render("<!-- @include: ./path/to/include/file.md -->", {
  filePath: "path/to/current/file.md",
});
```

@tab JS

```js
const MarkdownIt = require("markdown-it");
const { include } = require("@mdit/plugin-include");

// #region snippet
const mdIt = MarkdownIt().use(include, {
  // your options, currentPath is required
  currentPath: (env) => env.filePath,
});
// #endregion snippet

mdIt.render("<!-- @include: ./path/to/include/file.md -->", {
  filePath: "path/to/current/file.md",
});
```

@tab css

```css
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

@tab Less

```less
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

@tab Sass

```scss
html,
body {
  margin: 0;
  padding: 0;
}

/* #region snippet */
h1 {
  font-size: 1.5rem;
}
/* #endregion snippet */

h2 {
  font-size: 1.2rem;
}
```

@tab Java

```java
public class HelloWorld {
  // #region snippet
  public static void main(String args[]){
    System.out.println("Hello World");
  }
  // #endregion snippet
}
```

@tab Python

```py
class MyClass:
    msg = "world"

    #region snippet
    def sayHello(self):
        print("Hello " + self.msg + "!")
    #region snippet

    def sayBye(self):
        print("Bye " + self.msg + "!")
```

@tab Visual Basic

```vb
Imports System

Module Module1
   # Region snippet
   Sub Main()
     Console.WriteLine("Hello World!")
     Console.WriteLine("Press Enter Key to Exit.")
     Console.ReadLine()
   End Sub
   # EndRegion
End Module
```

@tab Bat

```bat
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
echo Requesting administrative privileges...
goto UACPrompt
) else ( goto gotAdmin )

::#region snippet
:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
exit /B
::#endregion snippet

:gotAdmin
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
pushd "%CD%"
CD /D "%~dp0"
```

@tab C\#

```cs
using System;

namespace HelloWorldApp {

    class Geeks {

        // #region snippet
        static void Main(string[] args) {

            // statement
            // printing Hello World!
            Console.WriteLine("Hello World!");

            // To prevents the screen from
            // running and closing quickly
            Console.ReadKey();
        }
        // #endregion snippet
    }
}
```

@tab C/C++

```cpp
#include <iostream>
#include <vector>

std::vector<int> v;

#pragma region snippet
int f() {
  for (int item : v) std::cout << item << std::endl;
  return v.size();
}
#pragma endregion snippet

int main() {
  int n, u;
  std::cin >> n;
  for (int i = 1; i <= n; ++i) {
    std::cin >> u;
    v.push_back(u);
  }
  std::cout << f();
  return 0;
}
```

:::

::::

## 演示

`<!-- @include: ./demo.snippet.md -->`:

<!-- @include: ./demo.snippet.md -->

`<!-- @include: ./demo.snippet.md{9-13} -->`:

<!-- @include: ./demo.snippet.md{9-13} -->

`<!-- @include: ./demo.snippet.md#snippet -->`:

<!-- @include: ./demo.snippet.md#snippet -->

## 高级用法

你还可以设置一个对象来自定义包含文件路径和包含行为。

```ts
interface IncludeOptions {
  /**
   * 处理 include 文件路径
   *
   * @default (path) => path
   */
  resolvePath?: (path: string, cwd: string | null) => string;
  /**
   * 是否深度导入包含的 Markdown 文件
   *
   * @default false
   */
  deep?: boolean;
  /**
   * 是否使用 `<!-- @include: xxx -->` 代替 `@include: xxx` 导入文件
   *
   * @default true
   */
  useComment?: boolean;
  /**
   * 是否解析包含的 Markdown 文件的里的相对图像路径
   *
   * @default true
   */
  resolveImagePath?: boolean;
  /**
   * 是否解析包含的 Markdown 文件的里的文件相对路径
   *
   * @default true
   */
  resolveLinkPath?: boolean;
}
```

例如: 你可以使用 `@src` 作为源文件夹的别名。

<!-- #endregion after -->

::: code-tabs#language

@tab TS

```ts {10}
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const __dirname = getDirname(import.meta.url);

export default {
  plugins: [
    mdEnhancePlugin({
      // 添加 `@src` 别名支持
      include: {
        resolvePath: (file) => {
          if (file.startsWith("@src"))
            return file.replace("@src", path.resolve(__dirname, ".."));

          return file;
        },
      },
    }),
  ],
};
```

@tab JS

```js {10}
// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

const __dirname = getDirname(import.meta.url);

export default {
  plugins: [
    mdEnhancePlugin({
      // 添加 `@src` 别名支持
      include: {
        resolvePath: (file) => {
          if (file.startsWith("@src"))
            return file.replace("@src", path.resolve(__dirname, ".."));

          return file;
        },
      },
    }),
  ],
};
```

:::

此外，如果你想将 Markdown 文件直接放在实际文件旁边，但不希望它们呈现为页面，你可以在 VuePress 配置中设置 `pagePatterns` 选项。有关详细信息，请参阅 [pagePatterns](https://vuejs.press/zh/reference/config.html#pagepatterns)。

::: code-tabs#language

@tab TS

```ts {6-7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  // 现在任何带有 `.snippet.md` 扩展名的文件都不会呈现为页面
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    mdEnhancePlugin({
      include: true,
    }),
  ],
});
```

@tab JS

```js {5-6}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  // 现在任何带有 `.snippet.md` 扩展名的文件都不会呈现为页面
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    mdEnhancePlugin({
      include: true,
    }),
  ],
};
```

:::
