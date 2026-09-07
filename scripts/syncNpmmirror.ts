import { readdir } from "node:fs/promises";
import { request } from "node:https";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../");

const syncNpmMirror = (pkg: string): Promise<void> =>
  new Promise<void>((resolve) => {
    const req = request(`https://registry-direct.npmmirror.com/-/package/${pkg}/syncs`, {
      method: "PUT",
      headers: {
        "Content-Length": 0,
      },
    });

    req.write("");

    req.on("close", () => {
      resolve();
    });

    req.end();
  });

const getPackageName = (importPath: string): Promise<string> =>
  import(importPath, { with: { type: "json" } }).then(
    ({ default: { name } }: { default: { name: string } }) => name,
  );

const syncPackage = (importPath: string): Promise<void> =>
  getPackageName(importPath).then(syncNpmMirror);

const syncDir = (dir: string): Promise<void[]> =>
  readdir(path.resolve(root, dir)).then((names) =>
    Promise.all(
      names
        .filter((name) => !name.startsWith("."))
        .map((name) => syncPackage(`${root}/${dir}/${name}/package.json`)),
    ),
  );

await syncDir("packages");
