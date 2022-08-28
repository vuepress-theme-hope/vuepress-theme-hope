---
title: Шифрование
icon: lock
category:
  - Функция
tag:
  - Шифровать
  - Функция
---

Тема поддерживает шифрование определенных папок или определенных путей, а также глобальное шифрование.

::: danger

Обратите внимание, что из-за ограничения vuepress содержимое статьи скрывается только до расшифровки, и посетители все равно могут получить содержимое статьи из исходного кода (из js).

Пожалуйста, **НЕ ИСПОЛЬЗУЙТЕ** эту функцию шифрования для любых секретных и конфиденциальных статей и файлов, пожалуйста, примите на себя последствия этого.

:::

<!-- more -->

## Локальное шифрование

Вы можете настроить параметры шифрования с помощью параметров `encrypt.config` в параметрах темы.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    encrypt: {
      config: {
        // This will encrypt the entire guide directory, and both passwords are available
        "/guide/": ["1234", "5678"],
        // This will only encrypt config/page.html
        "/config/page.html": "1234",
      },
    },
  }),
};
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    encrypt: {
      config: {
        // This will encrypt the entire guide directory, and both passwords are available
        "/guide/": ["1234", "5678"],
        // This will only encrypt config/page.html
        "/config/page.html": "1234",
      },
    },
  }),
};
```

:::

::: warning

Обратите внимание, что вы можете использовать пароли только в строковом формате.

Соленое хэш-значение числа `1234` и строки `"1234"` отличается! В то время как пользователь может вводить содержимое только в строковом формате через поле ввода.

:::

## Глобальное шифрование

В некоторых случаях вы можете захотеть зашифровать весь сайт, для этого вы можете установить `encrypt.global: true` в настройках темы.

Для глобального шифрования вы можете установить один или несколько паролей в формате строки или массива строк в `encrypt.admin`.

::: tip

Рассмотрение нескольких паролей — это разделение разрешений. Это позволяет вам отменить или обновить некоторые глобальные пароли в будущих развертываниях, чтобы некоторые пользователи с определенным паролем потеряли доступ.

:::
