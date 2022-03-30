import { get } from "https";

export const checkForNextVersion = (
  packageName: string,
  bin: "npm" | "yarn"
): Promise<string> =>
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
          reject(
            new Error(
              `Get ${packageName} version failed, please check your network!`
            )
          );
        }
      }
    ).on("error", () => {
      reject(
        new Error(
          `Get ${packageName} version failed, please check your network!`
        )
      );
    });
  });
