---
title: Safari FAQ
icon: safari
category:
  - FAQ
---

## Плавная прокрутка не удалась

Мы используем свойство CSS `scroll-behavior: smooth`, чтобы обеспечить плавную прокрутку. Его глобальный рейтинг одобрения составляет 87.66% [^scroll-behavior-percent]

[^scroll-behavior-percent]: Данные из [canIUse](https://caniuse.com/?search=scroll-behavior).

В настоящее время это свойство поддерживается только в iOS / iPadOS 15.4+ и macOS 12.3+[^scroll-behavior-support].

[^scroll-behavior-support]: Смотрите [Safari 15.4 Release Notes](https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes#New-Features)

Если вам нужно использовать эту функцию в более старых версиях Safari, обратитесь к [Связанному вопросу на Stack Overflow](https://stackoverflow.com/questions/56011205/is-there-a-safari-equivalent-for-scroll-behavior-smooth), чтобы понять причину и импортировать пакет [smooth-scroll](https://github.com/iamdustan/smoothscroll), чтобы сделать polyfill самостоятельно.
