---
title: Исправление проблем
icon: check
category:
  - FAQ
---

## Убедитесь, что используете последнюю версию

Пожалуйста, убедитесь, что вы используете последнюю версию 2 `vuepress` и `vuepress-theme-hope`, потому что некоторые ошибки, с которыми вы столкнулись, могли быть исправлены в новых версиях.

Вы можете обновиться до последней версии, выполнив следующие команды.

::: code-tabs#shell

@tab pnpm

```bash
pnpm add vuepress@next vuepress-theme-hope@next
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@next
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@next
```

:::

::: warning

Any official plugins starting with `@vuepress/plugin-` should be the same version as VuePress.

If you're using another third-party plugin, make sure it's compatible with the version of VuePress you're upgrading to.

:::

## Убедитесь в версии Node

`vuepress-theme-hope` поддерживает только LTS-версию Node.js, то есть в настоящее время поддерживаются только последние версии v14, v16, v18.

Вы можете проверить его версию с помощью `node -v`. Если первая цифра номера версии не соответствует требованиям, [загрузите и установите LTS-версию Node.js](../cookbook/tutorial/env.md#nodejs).

## Убедитесь, что у вас есть правильное дерево зависимостей

В некоторых случаях вы можете сгенерировать неправильное дерево зависимостей после обновления некоторых зависимостей, потому что и `vuepress` и `vue` состоят из множества пакетов с именами `@vuepress/xxx` и `@vue/xxx`.

Для правильной работы VuePress во всем проекте должна быть только одна версия `@vuepress/xxx`, `@vue/xxx`, `vue` и `vue-router`. Наличие нескольких версий пакета может привести к тому, что разные части приложения будут использовать разные экземпляры Vue и соответствующий пакет, что приведет к таким ошибкам, как `useXXX() is called without provider`.

Выполните следующую команду, чтобы убедиться, что ваше дерево зависимостей правильное.

::: code-tabs#shell

@tab pnpm

```bash
pnpm i && pnpm up
```

@tab yarn

```bash
yarn && yarn upgrade
```

@tab npm

```bash
npm i && npm update
```

:::

::: tip версия npm

Если вы используете npm, убедитесь, что вы используете npm v8. Вы можете получить номер версии npm, выполнив команду `npm -v`.

Если основной номер версии меньше 8 (т. е. номер версии не `8.x.x`), запустите команду `npm i -g npm`, чтобы обновить npm до v8, и повторите приведенную выше команду.

:::

## Убедитесь, что у вас правильная конфигурация

Убедитесь, что в вашем файле конфигурации нет ошибок (например, красных волнистых линий), если это так, измените файл конфигурации в соответствии с подсказками, пока вы не настроите VuePress и темы правильно.
