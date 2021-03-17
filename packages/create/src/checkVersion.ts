import { get } from "https";

export const checkForLatestVersion = (packageName: string): Promise<string> =>
  new Promise((resolve, reject) => {
    get(
      `https://registry.npmjs.org/-/package/${packageName}/dist-tags`,
      (res) => {
        if (res.statusCode === 200) {
          let body = "";

          res.on("data", (data) => (body += data));
          res.on("end", () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            resolve(JSON.parse(body).latest as string);
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
