import inquirer from "inquirer";

import type { PackageManager } from "../utils";

export type Lang = "english (US)" | "简体中文";

export interface CreateI18n {
  getVersion: string;
  createPackage: string;
  updatePackage: string;
  template: string;
  install: string;
  wait: string;
  success: string;
  devServerAsk: string;
  devServer: string;
  nameMessage: string;
  nameError: string;
  versionMessage: string;
  versionError: string;
  descriptionMessage: string;
  licenseMessage: string;
  i18nMessage: string;
  gitMessage: string;
  workflowMessage: string;
  packageManager: string;

  hint: (packageManager: PackageManager) => string;
  dirError: (packageManager: PackageManager) => string;
}

export const i18n: Record<Lang, CreateI18n> = {
  简体中文: {
    getVersion: "获取依赖的最新版本...",
    createPackage: "生成 package.json...",
    updatePackage: "更新 package.json...",
    template: "生成模板...",
    wait: "这可能需要数分钟，请耐心等待.\n我们无法正确输出子进程的进度条，所以进程可能会看似未响应",
    install: "安装依赖...",
    success: "模板已成功生成!",
    devServerAsk: "是否想要现在启动 Demo 查看?",
    devServer:
      "启动开发服务器...\n启动成功后，请在浏览器输入给出的开发服务器地址(默认为 'localhost:8080')",

    nameMessage: "设置应用名称",
    nameError: "应用名称应只包含小写字母、数字和连接线 (-)",
    versionMessage: "设置应用版本号",
    versionError: "此版本无效，版本号应为 'x.x.x'",
    descriptionMessage: "设置应用描述",
    licenseMessage: "设置协议",
    i18nMessage: "项目需要用到多语言么?",
    gitMessage: "是否初始化 Git 仓库?",
    workflowMessage: "是否需要一个自动部署文档到 GitHub Pages 的工作流？",
    packageManager: "选择包管理器",
    hint: (packageManager: PackageManager): string =>
      `提示: 请使用 "${packageManager} run docs:dev" 命令启动开发服务器`,
    dirError: (packageManager: PackageManager): string =>
      `"[dir]" 的方括号表示此处为一个参数，你应该替换为自己想使用的文件夹名称，如 "src", "docs" 等!\n例如: "${packageManager} init vuepress-theme-hope@next docs"`,
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "english (US)": {
    getVersion: "Getting lastest version of deps...",
    createPackage: "Generating package.json...",
    updatePackage: "Updating package.json...",
    template: "Generating Template...",
    wait: "This may take a few minutes, please be patient.\nWe can not correctly output progress bar from child process, so the process may look stuck.",
    install: "Installing Deps...",
    success: "Successful Generated!",
    devServerAsk: "Would you like to preview template now?",
    devServer:
      "Staring dev server...\nAfter the dev server starts running, please visit the given server link ('localhost:8080' by default)",
    nameMessage: "Your project name",
    nameError:
      "package name should only contain lowercase characters, numbers and dash",
    versionMessage: "Your project version",
    versionError:
      "This version is not a valid one. Version should be like 'x.x.x'",

    descriptionMessage: "Your project description",
    licenseMessage: "Your project lincense",
    i18nMessage: "Does the project need multiple languages?",
    gitMessage: "Initialize a git repository?",
    workflowMessage:
      "Do you need a GitHub workflow to deploy docs on GitHub pages?",
    packageManager: "Choose package manager",
    hint: (packageManager: PackageManager): string =>
      `Hint: You should execute "${packageManager} run docs:dev" to start dev server.`,
    dirError: (packageManager: PackageManager): string =>
      `The brackets in "[dir]" means it is an argument, you should replace it with folder name you want to use! E.g.: "src", "docs"\nFor example: "${packageManager} init vuepress-theme-hope@next docs"`,
  },
};

interface LanguageResult {
  lang: Lang;
  message: CreateI18n;
}

export const getLanguage = async (): Promise<LanguageResult> => {
  const { language } = await inquirer.prompt<{ language: Lang }>([
    {
      name: "language",
      type: "list",
      message: "Select a language to display / 选择显示语言",
      choices: ["english (US)", "简体中文"],
    },
  ]);

  return {
    lang: language,
    message: i18n[language],
  };
};
