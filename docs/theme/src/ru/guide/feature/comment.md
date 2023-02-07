---
title: Сервис комментариев
icon: comment-dots
category:
  - Функция
tag:
  - Комментарий
  - Функция
---

`vuepress-theme-hope` реализует функцию комментариев со встроенным <ProjectLink name="comment2">`vuepress-plugin-comment2`</ProjectLink>.

::: info

`vuepress-theme-hope` передает `plugins.comment` в параметрах темы в качестве параметров плагина `vuepress-plugin-comment2`.

:::

<!-- more -->

## Включить <Badge text="Конфигурация страницы поддержки" />

::: code-tabs#language

@tab TS

```ts {9,12}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "Waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  }),
});
```

@tab JS

```js {8,11}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "Waline",

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

Полный элемент конфигурации плагина смотрите в <ProjectLink name="comment2">документации по плагину</ProjectLink>.

:::

## Поставщик комментариев

В настоящее время вы можете выбирать из Giscus, Waline, Twikoo и Artalk.

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

Другие параметры смотрите в <ProjectLink name="comment2" path="/config/giscus.html">Конфиге Giscus</ProjectLink>.

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
        provider: "Waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "Waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
};
```

:::

::: tip

Конфигурация будет указана в <ProjectLink name="comment2" path="/config/waline.html">Конфигурация плагина</ProjectLink>.

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

## Artalk

### Deploy Artalk Server

See the [Artalk documentation](https://artalk.js.org/guide/deploy.html) for deploying artalk server.

### Artalk Configuration

Please set `provider: "Artalk"` and pass your server link to `server` in the plugin options.

For other configuration items, see [Artalk Configuration](https://artalk.js.org/guide/frontend/config.html).

::: note

The plugin retains the `el` option and inserts Artalk itself on the page. At the same time, the plugin will automatically set the `pageTitle`, `pageKey` and `site` options for you according to the VuePress information.

Before VuePress2 provides client configuration, the two function options `imgUploader` and `avatarURLBuilder` are not supported.

:::
