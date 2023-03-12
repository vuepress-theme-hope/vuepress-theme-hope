---
title: Презентация
icon: person-chalkboard
category:
  - Markdown
tag:
  - Markdown
  - Слайды
---

Пусть файл Markdown на вашем сайте VuePress поддерживает презентацию.

<!-- more -->

## Конфиг

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        presentation: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        presentation: true,
      },
    },
  }),
};
```

:::

`vuepress-plugin-md-enhance` использует [reveal.js](https://revealjs.com/) для поддержки этой функции.

Вы также можете передать объект для настройки.

`presentation.plugins` получает массив строк, что позволяет вам свободно настраивать, включать ли некоторые предустановленные плагины.

::: tip

Приемлемые плагины:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

:::

Вы также можете использовать параметры конфигурации `presentation.revealConfig`, передаваемые в Reveal.js глобально.

Reveal.js также предоставляет [больше плагинов](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware). Если вам нужен конкретный плагин, отправьте [Запрос функции](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new?assignees=Mister-Hope&labels=enhancement&template=feature_request.md&title=%5BFeature+Request%5D) на GitHub.

## Синтаксис

- Используйте `---` для разделения слайдов
- Используйте `--`, чтобы разделить слайды во второй раз (вертикальное отображение)

```md
@slidestart [theme]

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

Доступная тема (замените `[theme]` на них):

- `auto` (По умолчанию)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

Для получения дополнительной информации смотрите <ProjectLink name="md-enhance" path="/guide/presentation/themes.html">Демо темы</ProjectLink>.

## Демо

@slidestart

## Слайд 1

Абзац с текстом и [ссылка](https://mrhope.site)

---

## Слайд 2

- Элемент 1
- Элемент 2

---

## Слайд 3.1

```js
const a = 1;
```

--

## Слайд 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

````md
@slidestart

## Слайд 1

A paragraph with some text and a [link](https://mrhope.site)

---

## Слайд 2

- Элемент 1
- Элемент 2

---

## Слайд 3.1

```js
const a = 1;
```

--

## Слайд 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend
````

::: info

Подробную демонстрацию смотрите в разделе <ProjectLink name="md-enhance" path="/guide/presentation/demo.html">Демонстрационная презентация</ProjectLink>.

:::

## Опции

Вы можете установить `reveal` для передачи параметров в reveal.js для каждой страницы во фронтмейтере, вы также можете установить `presentation` в параметрах плагина, чтобы установить reveal.js глобально.

Дополнительные параметры смотрите в [конфигурации reveal.js](https://revealjs.com/config/). Дополнительные сведения об использовании смотрите в [документации reveal.js](https://revealjs.com/)
