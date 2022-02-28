<!-- markdownlint-disable -->
<p align="center">
  <img width="240" src="https://vuepress-theme-hope.github.io/v2/logo.svg" style="text-align: center;"/>
</p>
<h1 align="center">vuepress-plugin-sass-palette</h1>
<h4 align="center">VuePress style config plugin 📡 / VuePress 样式配置插件 📡</h4>

[![Version](https://img.shields.io/npm/v/vuepress-plugin-sass-palette/next.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-sass-palette.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/vuepress-plugin-sass-palette?style=flat-square&logo=npm)](https://www.npmjs.com/package/vuepress-plugin-sass-palette)

<!-- markdownlint-restore -->

VuePress palette plugin 📡 / VuePress 样式配置插件 📡

## [Official Docs](https://vuepress-theme-hope.github.io/v2/sass-palette/) | [官方文档](https://vuepress-theme-hope.gitee.io/v2/sass-palette/zh/)

## Install

```bash
npm i -D vuepress-plugin-sass-palette
```

or

```bash
yarn add -D vuepress-plugin-sass-palette
```

## Usage

Options:

```ts
export interface PaletteOptions {
  /** identifier for palette */
  id: string;

  /**
   * user config file path, relative to source dir
   *
   * @default ".vuepress/styles/config.scss"
   */
  config?: string;

  /**
   * default config file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/config.scss"
   */
  defaultConfig?: string;

  /**
   * user palette file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  palette?: string;

  /**
   * default palette file path, should be absolute path
   *
   * This is the file you should use to provide default values with `!default`
   *
   * @default "vuepress-plugin-sass-palette/styles/default/palette.scss"
   */

  defaultPalette?: string;

  /**
   * user style file path, relative to source dir
   *
   * @default ".vuepress/styles/palette.scss"
   */
  style?: string;
}
```

---

## 安装

```bash
npm i -D vuepress-plugin-sass-palette
```

或

```bash
yarn add -D vuepress-plugin-sass-palette
```

## 选项

```ts
export interface PaletteOptions {
  /**
   * 调色板的唯一 ID，用于避免重复注册
   */
  id: string;

  /**
   * 用户配置文件路径，相对于源文件夹
   *
   * @default ".vuepress/styles/config.scss"
   */
  config?: string;

  /**
   * 默认的配置文件路径，应为绝对路径
   *
   * 这是你应该通过 `!default` 来提供默认变量的文件
   *
   * @default "vuepress-plugin-sass-palette/styles/default/config.scss"
   */
  defaultConfig?: string;

  /**
   * 用户的调色板文件路径，相对于源文件夹
   *
   * @default ".vuepress/styles/palette.scss"
   */
  palette?: string;

  /**
   * 默认的调色板文件路径，应为绝对路径
   *
   * 这是你应该通过 `!default` 来提供默认调色板值的文件
   *
   * @default "vuepress-plugin-sass-palette/styles/default/palette.scss"
   */

  defaultPalette?: string;

  /**
   * 用户的样式文件路径，相对于源文件夹
   *
   * @default ".vuepress/styles/palette.scss"
   */
  style?: string;
}
```
