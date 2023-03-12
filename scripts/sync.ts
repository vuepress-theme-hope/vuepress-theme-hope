import { readdirSync } from "node:fs";
import { request } from "node:https";
import { resolve } from "node:path";

import ora from "ora";

const packagesDir = resolve(process.cwd(), "packages");
const packages = readdirSync(packagesDir);

export const sync = (): Promise<void[]> =>
  Promise.all(
    packages.map((packageName) =>
      // eslint-disable-next-line import/dynamic-import-chunkname
      import(`../packages/${packageName}/package.json`, {
        assert: { type: "json" },
      }).then(
        ({
          default: content,
        }: {
          default: Record<string, unknown> & { name: string };
        }) =>
          new Promise<void>((resolve) => {
            const req = request(
              new URL(
                `https://registry-direct.npmmirror.com/${content["name"]}/sync?sync_upstream=true`
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

            req.end();
          })
      )
    )
  );

const npmmirrorSpinner = ora("Syncing npmmirror.com").start();

void sync().then(() => {
  npmmirrorSpinner.succeed();

  ora("Release complete").succeed();
});
