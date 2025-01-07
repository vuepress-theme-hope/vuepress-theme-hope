import type { CreateLocale } from "./typings.js";
import type { PackageManager } from "../config/index.js";

export const zh: CreateLocale = {
  flow: {
    getVersion: "获取依赖的最新版本...",
    createPackage: "生成 package.json...",
    updatePackage: "更新 package.json...",
    createTsConfig: "生成 tsconfig.json...",
    updateTsConfig: "更新 tsconfig.json...",
    generateTemplate: "生成模板...",
    install: "安装依赖...",
    devServer:
      "启动开发服务器...\n启动成功后，请在浏览器输入给出的开发服务器地址(默认为 'localhost:8080')",
  },

  question: {
    packageManager: "选择包管理器",
    i18n: "项目需要用到多语言么?",
    git: "是否初始化 Git 仓库?",
    workflow: "是否需要一个自动部署文档到 GitHub Pages 的工作流？",
    bundler: "你想要使用哪个打包器？",
    preset: "你想要创建什么类型的项目？",
    devServer: "是否想要现在启动 Demo 查看?",
    name: "设置应用名称",
    version: "设置应用版本号",
    description: "设置应用描述",
    license: "设置协议",
  },

  hint: {
    install:
      "这可能需要数分钟，请耐心等待.\n我们无法正确输出子进程的进度条，所以进程可能会看似未响应",
    finish: "模板已成功生成!",
    devServer: (packageManager: PackageManager): string =>
      `提示: 请使用 "${packageManager} run docs:dev" 命令启动开发服务器`,
  },

  workflow: {
    name: "部署文档",
    checkout: "检出代码",
    submodule: "如果你文档需要 Git 子模块，取消注释下一行",
    setupPnpm: "设置 pnpm",
    setupNode: "设置 Node.js",
    install: "安装依赖",
    build: "构建文档",
    deploy: "部署文档",
    deployBranch: "这是文档部署到的分支名称",
  },

  error: {
    name: "应用名称应只包含小写字母、数字和连接线 (-)",
    version: "此版本无效，版本号应为 'x.x.x'",
    bundler: "打包器 (--bundler) 仅支持 vite 或 webpack",
    preset: "预设 (--preset) 仅支持 docs 或 blog",
    outputDirHint: (packageManager: PackageManager): string =>
      `"<dir>" 的尖括号表示此处为一个必填参数，你应该替换为自己想使用的文件夹名称，如 "my-blog", "project-docs" 等!\n例如: "${packageManager} init vuepress-theme-hope project-docs"`,
    addDirHint: (packageManager: PackageManager): string =>
      `"<dir>" 的尖括号表示此处为一个必填参数，你应该替换为自己想使用的文件夹名称，如 "src", "docs" 等!\n例如: "${packageManager} init vuepress-theme-hope add docs"`,
    dirNotEmpty: (dir: string) =>
      `目标文件夹 "${dir}" 不为空，请选择一个空文件夹或者手动删除文件夹中的文件`,
  },
};
