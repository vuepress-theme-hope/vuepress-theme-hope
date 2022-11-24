---
title: Создание проекта
icon: creative
category:
  - Учебник с примерами
  - Руководство
  - Начало работы
tag:
  - Шаблон
---

Это руководство поможет вам создать проект VuePress Theme Hope.

## Выберите подходящее место для проекта

Чтобы случайно не вызвать некоторые странные проблемы, которые вы не можете решить самостоятельно, старайтесь не использовать пути к файлам, содержащие символы CJK, смайлики или пробелы (например: `C:\Users\毛泽东\Desktop\VuePress Project\Hope theme ❤️\`).

Рекомендуется использовать простые английские пути (например: `D:\projects\vuepress-theme-hope\`).

::: tip

Если вы новичок, мы не рекомендуем вам использовать VuePress Theme Hope в существующем проекте, чтобы избежать проблем, которые вы не можете решить. Выберите пустую папку для инициализации VuePress Theme Hope.

:::

## Инициализировать проект

Откройте терминал в папке в местоположении проекта.

::: tip Открытие терминала в Windows

Пожалуйста, используйте проводник, чтобы открыть эту папку, затем введите `cmd` в адресной строке выше и нажмите Enter.

:::

Выполните следующую команду в терминале:

```sh
pnpm create vuepress-theme-hope@next my-docs

# Or

npm create vuepress-theme-hope@next my-docs
```

::: tip Folder Argument

Here `my-docs` is a argument representing the folder name of the VuePress Theme Hope project. In this tutorial, we will generate the project to the `my-docs` folder in the current directory.

You can change this parameter to use a new folder if you want.

:::

::: tip Сервер разработки

Если вы решите запустить сервер разработки после инициализации шаблона, вы можете ввести `localhost:8080/` в адресной строке браузера, чтобы получить доступ к серверу разработки после запуска сервера разработки.

:::
