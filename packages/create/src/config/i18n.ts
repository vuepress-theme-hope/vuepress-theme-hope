import inquirer from "inquirer";

import type { PackageManager } from "../utils/index.js";

export type Lang = "english (US)" | "简体中文";

export interface CreateI18n {
  flow: {
    getVersion: string;
    createPackage: string;
    updatePackage: string;
    generateTemplate: string;
    install: string;
    devServer: string;
  };

  question: {
    i18n: string;
    git: string;
    workflow: string;
    packageManager: string;
    preset: string;
    devServer: string;

    // package.json
    name: string;
    version: string;
    description: string;
    license: string;
  };

  hint: {
    install: string;
    finish: string;
    devServer: (packageManager: PackageManager) => string;
  };

  error: {
    name: string;
    version: string;
    preset: string;
    outputDirMissing: (packageManager: PackageManager) => string;
    updateDirMissing: (packageManager: PackageManager) => string;
    dirNotEmpty: (targetDir: string) => string;
  };
}

export const i18n: Record<Lang, CreateI18n> = {
  简体中文: {
    flow: {
      getVersion: "获取依赖的最新版本...",
      createPackage: "生成 package.json...",
      updatePackage: "更新 package.json...",
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

    error: {
      name: "应用名称应只包含小写字母、数字和连接线 (-)",
      version: "此版本无效，版本号应为 'x.x.x'",
      preset: "预设 (--preset) 仅支持 doc 或 blog",
      outputDirMissing: (packageManager: PackageManager): string =>
        `"[dir]" 的方括号表示此处为一个参数，你应该替换为自己想使用的文件夹名称，如 "my-blog", "project-docs" 等!\n例如: "${packageManager} init vuepress-theme-hope@next project-docs"`,
      updateDirMissing: (packageManager: PackageManager): string =>
        `"[dir]" 的方括号表示此处为一个参数，你应该替换为自己想使用的文件夹名称，如 "src", "docs" 等!\n例如: "${packageManager} init vuepress-theme-hope@next docs"`,
      dirNotEmpty: (dir: string) =>
        `目标文件夹 "${dir}" 不为空，请选择一个空文件夹或者手动删除文件夹中的文件`,
    },
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "english (US)": {
    flow: {
      getVersion: "Getting latest version of deps...",
      createPackage: "Generating package.json...",
      updatePackage: "Updating package.json...",
      generateTemplate: "Generating Template...",
      install: "Installing Deps...",
      devServer:
        "Staring dev server...\nAfter the dev server starts running, please visit the given server link ('localhost:8080' by default)",
    },

    question: {
      i18n: "Does the project need multiple languages?",
      git: "Initialize a git repository?",
      workflow: "Do you need a GitHub workflow to deploy docs on GitHub pages?",
      preset: "What type of project do you want to create?",
      packageManager: "Choose package manager",
      devServer: "Would you like to preview template now?",
      name: "Your project name",
      version: "Your project version",
      description: "Your project description",
      license: "Your project license",
    },

    hint: {
      install:
        "This may take a few minutes, please be patient.\nWe can not correctly output progress bar from child process, so the process may look stuck.",
      finish: "Successful Generated!",
      devServer: (packageManager: PackageManager): string =>
        `Hint: You should execute "${packageManager} run docs:dev" to start dev server.`,
    },

    error: {
      name: "package name should only contain lowercase characters, numbers and dash",
      version:
        "This version is not a valid one. Version should be like 'x.x.x'",
      preset: 'preset (--preset) only support "doc" or "blog"',
      outputDirMissing: (packageManager: PackageManager): string =>
        `The brackets in "[dir]" means it is an argument, you should replace it with folder name you want to use! E.g.: "my-blog", "project-docs"\nFor example: "${packageManager} init vuepress-theme-hope@next project-docs"`,
      updateDirMissing: (packageManager: PackageManager): string =>
        `The brackets in "[dir]" means it is an argument, you should replace it with folder name you want to use! E.g.: "src", "docs"\nFor example: "${packageManager} init vuepress-theme-hope@next docs"`,
      dirNotEmpty: (dir: string) =>
        `Target folder "${dir}" is not empty, please choose an empty folder or delete files in it.`,
    },
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
