import { readdirSync } from "fs";
import { get } from "https";
import { resolve } from "path";

const packages = readdirSync(resolve(__dirname, "../../packages"));

export const sync = (): Promise<void[]> => {
  const promises = packages.map((packageName) => {
    return import(`../../packages/${packageName}/package.json`).then(
      (content: Record<string, unknown>) =>
        new Promise<void>((resolve) => {
          get(`https://npmmirror.com/sync/${content.name as string}`).on(
            "finish",
            () => resolve()
          );
        })
    );
  });

  return Promise.all(promises);
};
