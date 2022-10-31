---
title: Превью изображения
icon: preview
category:
  - Функция
tag:
  - Функция
  - Превью изображения
---

Включив [vuepress-plugin-photo-swipe][photo-swipe], vuepress-theme-hope заставит изображения в теле страницы переходить в режим предварительного просмотра при нажатии.

Если вам не нужна эта функция, вы можете установить `plugins.photoSwipe: false` в настройках темы, чтобы отключить ее.

::: info

`vuepress-theme-hope` передает `plugins.photoSwipe` в параметрах темы в качестве параметров плагина для `vuepress-plugin-photo-swipe`.

:::

<!-- more -->

## Режим просмотра

В режиме предварительного просмотра вы можете:

- Проведите пальцем влево и вправо, чтобы просмотреть другие изображения на странице по порядку.
- Посмотреть описание картинки
- Увеличение и уменьшение изображения
- Просмотр изображений в полноэкранном режиме
- Скачать картинки
- Делитесь фотографиями

::: tip

- Помимо нажатия "×" в правом верхнем углу для выхода из режима предварительного просмотра, прокрутка вверх и вниз более чем на определенное расстояние также приведет к выходу из режима предварительного просмотра
- На мобильных устройствах или с помощью трекпада ПК вы можете использовать жесты панорамирования и масштабирования для панорамирования и масштабирования в режиме предварительного просмотра

:::

## Настроить конфигурацию

Вы можете проверить [документацию плагина][photo-swipe] ля расширенной настройки.

## Демо

<!-- markdownlint-disable -->

<div class="image-preview">
  <img src="/assets/image/1.jpg" />
  <img src="/assets/image/2.jpg" />
  <img src="/assets/image/3.jpg" />
</div>

<style>
  .image-preview {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }

  .image-preview > img {
     box-sizing: border-box;
     width: 33.3% !important;
     padding: 9px;
     border-radius: 16px;
  }

  @media (max-width: 719px){
    .image-preview > img {
      width: 50% !important;
    }
  }

  @media (max-width: 419px){
    .image-preview > img {
      width: 100% !important;
    }
  }
</style>

<!-- markdownlint-restore -->

[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/
