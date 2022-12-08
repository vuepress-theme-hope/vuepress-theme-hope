---
title: Замена компонентов темы
icon: customize
category:
  - Продвинутый
tag:
  - Продвинутый
  - Кастомизация
---

Тема импортирует компоненты через псевдоним `alias`, поэтому вы можете использовать его для замены любого компонента темы.

<!-- more -->

## Замена компонентов

Вам необходимо заменить псевдоним компонента, используемый в теме, на опцию `alias` в вашем собственном файле конфигурации VuePress.

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    // конфиг вашей темы здесь
  }),

  alias: {
    // Здесь вы можете перенаправить псевдонимы на свои собственные компоненты
    // Например, здесь мы меняем компонент домашней страницы темы на HomePage.vue под пользователем .vuepress/components
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
});
```

@tab JS

```js
// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme({
    // конфиг вашей темы здесь
  }),

  alias: {
    // Здесь вы можете перенаправить псевдонимы на свои собственные компоненты
    // Например, здесь мы меняем компонент домашней страницы темы на HomePage.vue под пользователем .vuepress/components
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
};
```

:::

::: tip

Если вы хотите использовать файлы `vue`, вы можете создать простую оболочку js, написав:

```js
// wrapper.js
import YouComponent from "./YouComponent.vue";
export default YouComponent;
```

:::

Вот список псевдонимов.

::: details Псевдоним компонентов темы

Компоненты:

- `@theme-hope/components/AutoLink.js`: основная ссылка
- `@theme-hope/components/BreadCrumb.js`: хлебная крошка
- `@theme-hope/components/CommonWrapper.js`: базовая интеграция макета
- `@theme-hope/components/HomeFeatures.js`: функции главной страницы
- `@theme-hope/components/HomeHero.js`: логотип главной страницы и введение
- `@theme-hope/components/HomePage.js`: главная страница
- `@theme-hope/components/Icon.js`: иконка
- `@theme-hope/components/MarkdownContent.js`: контент разметки
- `@theme-hope/components/NormalPage.js`: обычная страница
- `@theme-hope/components/PageFooter.js`: футер страницы
- `@theme-hope/components/PageNav.js`: навигация страницы
- `@theme-hope/components/PageTitle.js`: заголовок страницы
- `@theme-hope/components/SkipLink.js`: перейти к основному содержанию
- `@theme-hope/components/transitions/DropTransition.js`: drop служебные функции темы
- `@theme-hope/components/transitions/FadeSlideY.js`: fade slide y служебные функции темы
- `@theme-hope/components/transitions/DropTransition.js`: компонент перехода drop
- `@theme-hope/components/transitions/FadeSlideY.js`: компонент перехода fade slide y

Разное:

- `@theme-hope/components/icons/index.js`: иконки темы
- `@theme-hope/composables/index.js`: Composition API темы
- `@theme-hope/utils/index.js`: служебные функции темы

:::

::: details Псевдоним компонента панели навигации

Компоненты:

- `@theme-hope/modules/navbar/components/DropdownLink.js`: выпадающий список
- `@theme-hope/modules/navbar/components/LanguageDropdown.js`: выпадающий список языков
- `@theme-hope/modules/navbar/components/NavActions.js`: функции панели навигации
- `@theme-hope/modules/navbar/components/Navbar.js`: панель навигации
- `@theme-hope/modules/navbar/components/NavbarBrand.js`: информация о бренде навигационной панели
- `@theme-hope/modules/navbar/components/NavbarLinks.js`: ссылки на панели навигации
- `@theme-hope/modules/navbar/components/NavScreen.js`: экран навигации в мобильном представлении
- `@theme-hope/modules/navbar/components/NavScreenDropdown.js`: выпадающее меню мобильной панели навигации
- `@theme-hope/modules/navbar/components/NavScreenLinks.js`: ссылки для мобильного просмотра на панели навигации
- `@theme-hope/modules/navbar/components/RepoLink.js`: ссылка на репозиторий
- `@theme-hope/modules/navbar/components/ToggleNavbarButton.js`: кнопка переключения панели навигации
- `@theme-hope/modules/navbar/components/ToggleSidebarButton.js`: кнопка переключения боковой панели

Разное:

- `@theme-hope/modules/navbar/components/icons/index.js`: иконки панели навигации
- `@theme-hope/modules/navbar/composables/index.js`: Composition API панели навигации

:::

::: details Псевдоним компонента боковой панели

Компоненты:

- `@theme-hope/modules/sidebar/components/Sidebar.js`: боковая панель
- `@theme-hope/modules/sidebar/components/SidebarChild.js`: элемент ссылки на боковой панели
- `@theme-hope/modules/sidebar/components/SidebarGroup.js`: группировка ссылок на боковой панели
- `@theme-hope/modules/sidebar/components/SidebarLinks.js`: ссылки на боковой панели

Разное:

- `@theme-hope/modules/sidebar/composables/index.js`: Composition API боковой панели
- `@theme-hope/modules/sidebar/utils/index.js`: утилитарные функции боковой панели

:::

::: details Псевдоним компонента информационного модуля

Компоненты:

- `@theme-hope/modules/info/components/AuthorInfo.js`: информация об авторе
- `@theme-hope/modules/info/components/CategoryInfo.js`: информация о категории
- `@theme-hope/modules/info/components/DateInfo.js`: информация о дате
- `@theme-hope/modules/info/components/OriginalMark.js`: оригинальное выделение
- `@theme-hope/modules/info/components/PageInfo.js`: информация о странице
- `@theme-hope/modules/info/components/PageMeta.js`: метаинформация страницы
- `@theme-hope/modules/info/components/PageViewInfo.js`: информация о просмотрах страниц
- `@theme-hope/modules/info/components/ReadingTimeInfo.js`: информация о времени чтения
- `@theme-hope/modules/info/components/TagInfo.js`: информация тега
- `@theme-hope/modules/info/components/TOC.js`: оглавление
- `@theme-hope/modules/info/components/WordInfo.js`: информация о слове

Разное:

- `@theme-hope/modules/blog/components/icons.js`: информация об иконках
- `@theme-hope/modules/blog/composables/index.js`: Composables API информации
- `@theme-hope/modules/blog/utils/index.js`: информационные служебные функции

:::

::: details Псевдоним компонента модуля блога

Компоненты:

- `@theme-hope/modules/blog/components/ArticleItem.js`: элемент статьи
- `@theme-hope/modules/blog/components/ArticleList.js`: список статей
- `@theme-hope/modules/blog/components/ArticleType.js`: тип статьи
- `@theme-hope/modules/blog/components/BloggerInfo.js`: информация о блогере
- `@theme-hope/modules/blog/components/BlogHero.js`: логотип главной страницы блога и введение
- `@theme-hope/modules/blog/components/BlogHome.js`: домашняя страница блога
- `@theme-hope/modules/blog/components/BlogPage.js`: обычная страница блога
- `@theme-hope/modules/blog/components/CategoryList.js`: список категорий
- `@theme-hope/modules/blog/components/InfoList.js`: список информации о блоге
- `@theme-hope/modules/blog/components/InfoPanel.js`: информационная панель блога
- `@theme-hope/modules/blog/components/Pagination.js`: нумерация страниц
- `@theme-hope/modules/blog/components/ProjectPanel.js`: панель проекта на главной странице блога
- `@theme-hope/modules/blog/components/SocialMedia.js`: ссылки на социальные сети
- `@theme-hope/modules/blog/components/TagList.js`: список тегов
- `@theme-hope/modules/blog/components/TimelineItems.js`: элементы временной шкалы
- `@theme-hope/modules/blog/components/TimelineList.js`: список временной шкалы

Разное:

- `@theme-hope/modules/blog/components/icons/index.js`: иконки блогов
- `@theme-hope/modules/blog/composables/index.js`: Composables API блога

:::

::: details Псевдоним компонента модуля шифрования

Компоненты:

- `@theme-hope/modules/encrypt/components/GlobalEncrypt.js`: глобальная оболочка шифрования
- `@theme-hope/modules/encrypt/components/LocalEncrypt.js`: локальная оболочка шифрования
- `@theme-hope/modules/encrypt/components/PasswordModal.js`: поле ввода пароля

Разное:

- `@theme-hope/modules/encrypt/composables/index.js`: Composition API шифрования
- `@theme-hope/modules/encrypt/utils/index.js`: функции утилиты шифрования

:::

::: details Псевдоним компонента модуля внешнего вида

- `@theme-hope/modules/outlook/components/AppearanceMode.js`: режим темы
- `@theme-hope/modules/outlook/components/AppearanceSwitch.js`: переключатель внешнего вида темы
- `@theme-hope/modules/outlook/components/OutlookButton.js`: кнопка появления
- `@theme-hope/modules/outlook/components/OutlookSettings.js`: настройки внешнего вида
- `@theme-hope/modules/outlook/components/ThemeColor.js`: цвет темы
- `@theme-hope/modules/outlook/components/ThemeColorPicker.js`: выбор цвета темы
- `@theme-hope/modules/outlook/components/ToggleFullScreenButton.js`: кнопка переключения в полноэкранный режим

Разное:

- `@theme-hope/modules/outlook/components/icons/index.js`: иконки внешнего вида
- `@theme-hope/modules/outlook/composables/index.js`: Composition API внешнего вида

:::

## Использование слотов

Некоторые компоненты предоставляют слоты, в этом случае вы можете напрямую импортировать исходный компонент при переопределении компонента и передавать нужный вам контент через слот.

Например, если ваш сайт имеет сильные социальные атрибуты и вы хотите отобразить поле для комментариев на главной странице, вы можете отобразить его следующим образом:

::: code-tabs

@tab config.ts

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    // конфиг вашей темы здесь
  }),

  alias: {
    // Здесь вы можете указать псевдонимы для ваших собственных компонентов
    // Например, здесь мы меняем компонент домашней страницы темы на HomePage.vue под пользователем .vuepress/components
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
});
```

@tab HomePage.vue

```vue
<template>
  <HopeHomePage>
    <!-- Введите компонент комментария, используя нижний слот -->
    <template #bottom>
      <CommentService />
    </template>
  </HopeHomePage>
</template>
<script setup lang="ts">
import HopeHomePage from "vuepress-theme-hope/components/HomePage.js";
</script>
```

:::

Компоненты, предоставляющие слоты, следующие:

**тема**:

- `AutoLink`: `default`, `before`, `after`
- `CommonWrapper`: `default`, `navbarLeftStart`, `navbarLeftEnd`, `navbarCenterStart`, `navbarCenterEnd`, `navbarRightStart`, `navbarRightEnd`, `navScreenTop`, `navScreenBottom`, `sidebar`, `sidebarTop`, `sidebarBottom`
- `HomeHero`: `heroImage`, `heroInfo`
- `HomePage`: `top`, `center`, `bottom`
- `NormalPage`: `top`, `contentBefore`, `contentAfter`, `bottom`

**Панель навигации**:

- `DropdownLink`: `title`
- `NavActions`: `before`, `after`
- `Navbar`: `leftStart`, `leftEnd`, `centerStart`, `centerEnd`, `rightStart`, `rightEnd`
- `NavbarBrand`: `default`
- `NavScreen`: `before`, `after`
- `NavScreenDropdown`: `before`, `after`

**Боковая панель**:

- `Sidebar`: `top`, `default`, `bottom`

::: tip

Соответствующее расположение и функции каждого слота смотрите в [исходном коде темы](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/).

:::
