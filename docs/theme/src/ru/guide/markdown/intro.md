---
title: Включить улучшение
icon: toggle-on
order: 1
category:
  - Markdown
tag:
  - Вступление
  - Markdown
---

Помимо синтаксисов Markdown, добавленных самим VuePress, `vuepress-theme-hope` включает дополнительный синтаксис в Markdown с помощью плагина <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>.

<!-- more -->

## Встроенные улучшения

VuePress поставляется с таблицами в стиле GitHub, Emoji, TOC, номерами строк кода, выделением конкретных строк и т. д., которые доступны из коробки.

Подробный синтаксис смотрите во [Встроенное улучшение Markdown](../../cookbook/vuepress/markdown.md).

## Включить улучшение разметки

`plugin.mdEnhance` в параметрах темы будет передан плагину как опция плагина. Посетите <ProjectLink name="md-enhance">документацию плагина</ProjectLink>, чтобы узнать об использовании.

::: tip

Не беспокойтесь о размере вашего сайта. Если вы не включите связанные функции, окончательный код не будет включать код для этих функций.

:::
