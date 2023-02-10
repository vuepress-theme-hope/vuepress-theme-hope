---
title: Распространенные ошибки
icon: triangle-exclamation
category:
  - FAQ
---

## `TypeError: Invalid value used as weak map key`

Если вы столкнулись с такой ошибкой, вероятно, вы используете нестандартные теги в своем проекте.

Существуют такие теги, как `<center>` или `<font>`, которые есть в спецификации HTML1.0, но помечены как нерекомендуемые с тех пор, как HTML4.0 был выпущен в 1999 году, а затем удален в выпуске HTML5 в 2008 году. Так что Vue не позволяет вам использовать их по умолчанию. Вероятно, вам следует удалить их и использовать стандартный тег HTML5.

Чтобы удалить их, запустите тему с флагом `--debug`, и вы получите журналы предупреждений, сообщающие вам о тегах, которые, вероятно, не распознаются.

Чтобы использовать их в любом случае, проверьте [здесь](https://v2.vuepress.vuejs.org/guide/markdown.html#non-standard-html-tags), чтобы найти обходной путь.

## `Hydration completed but contains mismatches.`

Эта ошибка указывает на несоответствие SSR, и это не должно быть проблемой с темой.

Сначала проверьте, используете ли вы сервисы, связанные с CloudFlare, и если да, обязательно отключите статическое сжатие ресурсов. Посетите [dash.cloudflare.com](https://dash.cloudflare.com), перейдите в раздел Веб-сайты → `YOUR_DOMAIN` → Скорость → Оптимизация, отключите `JavaScript` и `HTML` в параметрах `Auto Minify`.

::: warning

Auto Minify в CloudFlare неправильно обрабатывает пробелы HTML и разрывы строк, что может привести к тому, что Vue вызовет несоответствие SSR во время инициализации.

:::

Также вы можете проверить это:

- Если вы столкнулись с этой проблемой только на определенных страницах, проверьте, есть ли на странице дополнительные компоненты, которые вы добавили.

  Если это так, эти компоненты, вероятно, будут иметь разные результаты рендеринга между SSR[^ssr] и CSR[^csr]. Вы можете попытаться сделать их поведение согласованным или обернуть свои компоненты компонентом `<ClientOnly />`, предоставляемым `@vuepress/client`.

[^ssr]: **SSR**: **S**erver **S**ide **R**endering
[^csr]: **CSR**: **C**lient **S**ide **R**endering

- Если у вас есть эта проблема на всех страницах, выполните предыдущий шаг, чтобы проверить компоненты, которые вы добавили в макет, или глобальные компоненты.

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

Если вы видите, что `xxx isn’t assign with a lang, and will return 'en-US' instead.` во время запуска процесса разработки проверьте, установили ли вы язык для каждого языка.

Даже если у вас только один язык, вам все равно нужно [установить язык](../config/i18n.md#настроика-языка).

## `xxx is missing sidebar config.`

Using object format sidebar config means you want to set different sidebar based on routes.

- If you want to avoid this warning, you need to add sidebar config for rootLocale path, since all pages will fallback to that.
- If you want to disable sidebar in current route, set `sidebar: false` in frontmatter.
- If you want to disable sidebar in current folder, add `[currentFolderRoute]: false` in sidebar config.
- If you want to tell theme that you only want sidebar in routes you set, add `[rootLocalePath]: false` in sidebar config to tell theme sidebar config is disabled by default.

## `useXXX() is called without provider`

Такие ошибки обычно возникают из-за неправильного включения в проект нескольких версий `@vue/xxx`, `@vuepress/xxx`, `vue` или `vue-router`.

Убедитесь, что вы используете последние версии `vuepress` и `vuepress-theme-hope`:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add @vuepress/client@next vuepress@next vuepress-theme-hope vue@latest -E
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@latest -E
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@latest -E
```

:::

Кроме того, обновите зависимости, чтобы ваш проект содержал только одну версию соответствующего пакета:

::: code-tabs#shell

@tab pnpm

```bash
pnpm dlx vp-update
```

@tab yarn

```bash
yarn dlx vp-update
```

@tab npm

```bash
npx vp-update
```

:::

::: warning

Any official packages starting with `@vuepress/` should be upgrade to the same version as VuePress.

I.E.: if you are using `@vuepress/plugin-search` and `@vuepress/utils` , you should ensure they have the same version number as `vuepress`.

Also, if you're using another third-party plugin, make sure it's compatible with the version of VuePress you're upgrading to.

:::

## HotReload not working in DevServer

Some configuration has high performance impact on dev server, so their hot reload are disabled by default. You can enable it manually via `hotReload: true` in theme options.

These include categories and tags for blog, structured sidebar and git-based information.

## Некоторые настройки страницы недействительны

Вы можете сначала просмотреть документацию, чтобы узнать, **не поддерживает ли параметр конфигурацию страницы**.

**Поддержка конфигурации страницы** означает, что тема позволяет конфигурации страницы переопределять глобальную конфигурацию с тем же именем (та же функция), но не все функции соответствуют этому параметру.

::: tip

Вы должны знать, что некоторые функции не будут загружены на этапе подготовки, когда глобальная настройка отключена, поэтому их нельзя включить локально.

:::
