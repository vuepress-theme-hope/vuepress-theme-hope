import type { PackageManager } from "../config/index.js";

export type SupportedLang = "en" | "zh";

export interface CreateLocale {
  flow: {
    getVersion: string;
    createPackage: string;
    updatePackage: string;
    createTsConfig: string;
    updateTsConfig: string;
    generateTemplate: string;
    install: string;
    devServer: string;
  };

  question: {
    i18n: string;
    git: string;
    workflow: string;
    packageManager: string;
    bundler: string;
    preset: string;
    devServer: string;

    // Package.json
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

  workflow: {
    name: string;
    checkout: string;
    submodule: string;
    setupPnpm: string;
    setupNode: string;
    install: string;
    build: string;
    deploy: string;
    deployBranch: string;
  };

  error: {
    name: string;
    version: string;
    bundler: string;
    preset: string;
    outputDirHint: (packageManager: PackageManager) => string;
    addDirHint: (packageManager: PackageManager) => string;
    dirNotEmpty: (targetDir: string) => string;
  };
}
