import { prompt } from "inquirer";

type Lang = "zh-CN" | "en-US";

interface CreateI18n {
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
}

export const i18n: Record<Lang, CreateI18n> = {
  "zh-CN": {
    getVersion: "获取依赖的最新版本...",
    createPackage: "生成 package.json...",
    updatePackage: "更新 package.json...",
    template: "生成模板...",
    wait:
      "这可能需要数分钟，请耐心等待.\n如果你的终端不支持 'cursorTo', 'clearLine' 方法，安装过程可能看起来卡住了，这是因为进度条无法正确显示。",
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
  },
  "en-US": {
    getVersion: "Getting lastest version of deps...",
    createPackage: "Generating package.json...",
    updatePackage: "Updating package.json...",
    template: "Generating Template...",
    wait:
      "This may take a few minutes, please be patient.\nIf your shell does not support command like 'cursorTo', 'clearLine', the process may look stuck.",
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
  },
};

interface LanguageResult {
  lang: Lang;
  message: CreateI18n;
}

export const getLanguage = async (): Promise<LanguageResult> => {
  const { language } = await prompt<{ language: Lang }>([
    {
      name: "language",
      type: "list",
      message: "Select a language to display",
      choices: ["zh-CN", "en-US"],
    },
  ]);

  return {
    lang: language,
    message: i18n[language],
  };
};
