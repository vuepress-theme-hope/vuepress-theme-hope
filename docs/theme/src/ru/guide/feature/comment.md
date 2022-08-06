---
title: Сервис комментариев
icon: comment
category:
  - Функция
tag:
  - Комментарий
  - Функция
---

`vuepress-theme-hope` реализует функцию комментариев со встроенным [`vuepress-plugin-comment2`][comment2].

::: info

`vuepress-theme-hope` передает `plugins.comment` в параметрах темы в качестве параметров плагина `vuepress-plugin-comment2`.

:::

<!-- more -->

## Включить <Badge text="Конфигурация страницы поддержки" />

::: code-tabs#language

@tab TS

```ts {8,13}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      comment: {
        type: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  }),
});
```

@tab JS

```js {7,12}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      comment: {
        type: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  }),
};
```

:::

Функция комментариев включена глобально по умолчанию и контролируется параметрами `plugins.comment.comment`.

::: tip

Полный элемент конфигурации плагина смотрите в [документации по плагину][comment2].

:::

## Поставщик комментариев

В настоящее время вы можете выбирать из Giscus, Waline и Twikoo.

::: tip Выбор службы комментариев

- Giscus рекомендуется, если ваш блог или документация в первую очередь ориентированы на программистов.
- Если ваш блог или документация предназначены для широкой публики, рекомендуется Waline.

:::

## Giscus

Giscus — это система комментариев на основе GitHub Discussion, которую легко запустить.

### Подготовка

1. Вам необходимо создать общедоступный репозиторий и открыть обсуждение как место для хранения комментариев.
1. Вам необходимо установить [приложение Giscus](https://github.com/apps/giscus), чтобы иметь доступ к соответствующему репозиторию.

После выполнения вышеуказанных шагов перейдите на [страницу Giscus](https://giscus.app), чтобы получить настройки. Вам просто нужно заполнить категории репозитория и обсуждения, затем прокрутить до раздела "Enable giscus" внизу страницы и скопировать `data-repo`, `data-repo-id`, `data-category` и `data-category-id` четыре элемента по мере необходимости.

### Конфиг

Пожалуйста, передайте `data-repo`, `data-repo-id`, `data-category` и `data-category-id` в качестве параметров плагина как `repo`, `repoId`, `category` `categoryId`.

::: info Темный режим

Чтобы позволить Giscus использовать правильную тему, вам нужно передать логическое значение в `<CommentService />` через свойство `darkmode`, указывающее, включен ли темный режим в данный момент.

:::

Другие параметры смотрите в [Конфиге Giscus][comment2-giscus-config].

## Waline

### Получить APP_ID и APP_Key

[Войти](https://console.leancloud.app/login) или [зарегистрироваться](https://console.leancloud.app/register) leancloud. Затем создайте новое приложение в Leancloud, и вы получите APP ID / APP Key / APP Master Key.

После этого создайте приложение Vercel с помощью кнопки ниже.

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

Затем введите имя нового репозитория GitHub и установите переменные среды `LEAN_ID`, `LEAN_KEY` и `LEAN_MASTER_KEY` в столбце "Environment Variables". `APP ID` — это значение `LEAN_ID`, а `APP Key` - это `LEAN_KEY`, `Master Key` - это `LEAN_MASTER_KEY`.

Нажмите кнопку `Deploy`, для деплоя. Это покажет, что вы успешно развернули через несколько минут. Затем настройте ссылку Vercel в настройках темы:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      comment: {
        type: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      comment: {
        type: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
};
```

:::

::: tip

Конфигурация будет указана в [Конфигурация плагина][comment2-waline-config].

Для получения более подробной информации смотрите [Документацию Waline Docs](https://waline.js.org/en/)。

:::

## Twikoo

### Развертывание Vercel

1. Подать заявку на учетную запись [MongoDB](https://www.mongodb.com/cloud/atlas/register)
1. Создайте бесплатную базу данных MongoDB, рекомендуемый регион `AWS / N. Virginia (us-east-1)`
1. Нажмите ПОДКЛЮЧИТЬ на странице Кластеры, следуйте инструкциям, чтобы разрешить подключения со всех IP-адресов ([Почему?](https://vercel.com/support/articles/how-to-allowlist-deployment-ip-address)), создайте пользователя базы данных и запишите строку подключения к базе данных, измените `<password>` в строке подключения на пароль базы данных
1. Зарегистрируйте учетную запись [Vercel](https://vercel.com/signup)
1. Нажмите кнопку ниже, чтобы развернуть Twikoo на Vercel одним щелчком мыши

   [![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/dev/src/vercel-min)

1. Перейдите в Settings - Environment Variables, добавьте переменную среды `MONGODB_URI`, значением является строка подключения к базе данных на шаге 3.
1. Перейдите в Overview, щелкните ссылку в разделе Domains, если конфигурация среды верна, вы увидите сообщение "Twikoo cloud function is running normally"
1. Домены Vercel (с префиксом `https://`, например, `https://xxx.vercel.app`) – это идентификатор вашей среды

[comment2]: https://vuepress-theme-hope.github.io/v2/comment/
[comment2-giscus-config]: https://vuepress-theme-hope.github.io/v2/comment/config/giscus.html
[comment2-waline-config]: https://vuepress-theme-hope.github.io/v2/comment/config/waline.html
