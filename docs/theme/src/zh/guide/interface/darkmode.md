---
title: 深色模式
icon: contrast
category:
  - 界面
tag:
  - 界面
  - 深色模式
---

在深色模式下，页面会使用深色背景与浅色文字，以让你更加舒适。

<!-- more -->

## 尝试

切换下面的按钮以查看效果。

<!-- markdownlint-disable-->

<AppearanceSwitch />

<!-- markdownlint-restore -->

## 选项

你可以通过 `themeConfig.darkmode` 来配置深色模式

可选的值:

- `"auto-switch"`: "关闭 | 自动 | 打开" 的三段式开关 (默认)
- `"switch"`: "关闭 | 打开" 的切换式开关
- `"auto"`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `"disable"`: 禁用深色模式

<script setup lang="ts">
import AppearanceSwitch from '@theme-hope/module/outlook/components/AppearanceSwitch'
</script>
