import { get } from "https";

import { bin } from "./bin";

export const checkForNextVersion = async (
  packageName: string
): Promise<string> => {
  const getVersionInfo = (): Promise<string> =>
    new Promise((resolve, reject) => {
      get(
        `${
          bin === "npm"
            ? "https://registry.npmjs.org"
            : "https://registry.yarnpkg.com"
        }/-/package/${packageName}/dist-tags`,
        (res) => {
          if (res.statusCode === 200) {
            let body = "";

            res.on("data", (data) => (body += data));
            res.on("end", () => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              resolve(JSON.parse(body).next as string);
            });
          } else {
            reject();
          }
        }
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
