import { get } from "node:https";

import type { PackageManager } from "./packageManager.js";

export const getVersion = async (
  packageManager: PackageManager,
  packageName: string,
  tag = "latest",
): Promise<string> => {
  const getVersionInfo = (): Promise<string> =>
    new Promise((resolve, reject) => {
      get(
        `${
          packageManager === "npm"
            ? "https://registry.npmjs.org"
            : "https://registry.yarnpkg.com"
        }/-/package/${packageName}/dist-tags`,
        (res) => {
          if (res.statusCode === 200) {
            let body = "";

            res.on("data", (data) => (body += data));
            res.on("end", () => {
              resolve((<Record<string, string>>JSON.parse(body))[tag]);
            });
          } else {
            reject();
          }
        },
      ).on("error", () => {
        reject();
      });
    });

  for (let times = 1; times <= 3; times++) {
    const version = await getVersionInfo().catch(() => {
      console.log(`Get ${packageName} version failed, [${times}/3]`);
    });

    if (version) return version;
  }

  throw new Error(`Get ${packageName} version failed!`);
};
