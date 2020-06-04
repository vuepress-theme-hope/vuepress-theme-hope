import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { PWAOptions } from "../types";
import { resolve } from "path";
import chalk = require("chalk");
import fs = require("fs-extra");
import workboxBuild = require("workbox-build");

export = (options: PWAOptions, context: Context): PluginOptionAPI => {
  const config: PluginOptionAPI = {
    name: "pwa",

    // eslint-disable-next-line @typescript-eslint/naming-convention
    define: { SW_BASE_URL: context.base || "/" },

    globalUIComponents: options.popupComponent || "SWUpdatePopup",

    enhanceAppFiles: resolve(__dirname, "./enhanceAppFile.ts"),

    plugins: [
      /** typescript support */
      ["typescript"],
    ],
  };

  config.generated = async (): Promise<void> => {
    console.log(chalk.cyan("wait"), "Generating service worker...");

    const swFilePath = resolve(context.outDir, "./service-worker.js");

    await workboxBuild.generateSW({
      swDest: swFilePath,
      globDirectory: context.outDir,
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}",
      ],
      ...(options.generateSWConfig || {}),
    });
    await fs.writeFile(
      swFilePath,
      await fs.readFile(resolve(__dirname, "./skip-waiting.js"), "utf8"),
      { flag: "a" }
    );
  };

  return config;
};
