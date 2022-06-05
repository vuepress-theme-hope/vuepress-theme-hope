import { readdirSync } from "fs";
import { request } from "https";
import { resolve } from "path";

const packagesDir = resolve(process.cwd(), "packages");
const packages = readdirSync(packagesDir);

export const sync = (): Promise<void[]> => {
  const promises = packages.map((packageName) => {
    return import(`../../packages/${packageName}/package.json`).then(
      (content: Record<string, unknown>) =>
        new Promise<void>(() => {
          const req = request(
            new URL(
              `https://registry-direct.npmmirror.com/${
                content["name"] as string
              }/sync?sync_upstream=true`
            ),
            {
              method: "PUT",
              headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Length": 0,
              },
            }
          );

          req.write("");

          req.on("close", () => {
            resolve();
          });
        })
    );
  });

  return Promise.all(promises);
};
