import type { CreateLocale } from "./typings.js";
import type { PackageManager } from "../config/index.js";

export const en: CreateLocale = {
  flow: {
    getVersion: "Getting latest version of deps...",
    createPackage: "Generating package.json...",
    updatePackage: "Updating package.json...",
    createTsConfig: "Generating tsconfig.json...",
    updateTsConfig: "Updating tsconfig.json...",
    generateTemplate: "Generating Template...",
    install: "Installing Deps...",
    devServer:
      "Staring dev server...\nAfter the dev server starts running, please visit the given server link ('localhost:8080' by default)",
  },

  question: {
    i18n: "Does the project need multiple languages?",
    git: "Initialize a git repository?",
    workflow: "Do you need a GitHub workflow to deploy docs on GitHub pages?",
    bundler: "Which bundler do you want to use?",
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

  workflow: {
    name: "Deploy Docs",
    checkout: "Checkout code",
    submodule: "if your docs needs submodules, uncomment the following line",
    setupPnpm: "Setup pnpm",
    setupNode: "Setup Node.js",
    install: "Install Deps",
    build: "Build Docs",
    deploy: "Deploy Docs",
    deployBranch: "This is the branch where the docs are deployed to",
  },

  error: {
    name: "package name should only contain lowercase characters, numbers and dash",
    version: "This version is not a valid one. Version should be like 'x.x.x'",
    bundler: 'bundler (--bundler) only support "vite" or "webpack"',
    preset: 'preset (--preset) only support "docs" or "blog"',
    outputDirHint: (packageManager: PackageManager): string =>
      `The angle brackets in "<dir>" means it is a required argument, you should replace it with folder name you want to use! E.g.: "my-blog", "project-docs"\nFor example: "${packageManager} init vuepress-theme-hope project-docs"`,
    addDirHint: (packageManager: PackageManager): string =>
      `The brackets in "<dir>" means it is a required argument, you should replace it with folder name you want to use! E.g.: "src", "docs"\nFor example: "${packageManager} init vuepress-theme-hope add docs"`,
    dirNotEmpty: (dir: string) =>
      `Target folder "${dir}" is not empty, please choose an empty folder or delete files in it.`,
  },
};
