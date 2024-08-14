import { get } from "node:https";

import type { PackageManager } from "../config/index.js";

export const getVersion = async (
  packageManager: PackageManager,
  packageName: string,
  tag = "latest",
): Promise<string> => {
  const getVersionInfo = (): Promise<string> =>
    new Promise((resolve, reject) => {
      get(
        `${
          packageManager === "yarn"
            ? "https://registry.yarnpkg.com"
            : "https://registry.npmjs.org"
        }/-/package/${packageName}/dist-tags`,
        (res) => {
          if (res.statusCode === 200) {
            let body = "";

            res.on("data", (data) => (body += data));
            res.on("end", () => {
              resolve((JSON.parse(body) as Record<string, string>)[tag]);
            });
          } else {
            reject(new Error("fetch failed"));
          }
        },
      ).on("error", () => {
        reject(new Error("fetch failed"));
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
