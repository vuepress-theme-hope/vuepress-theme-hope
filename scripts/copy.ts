import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { dirname } from "path";

const ensureDirExistSync = (dirPath: string): void => {
  try {
    readdirSync(dirPath);
  } catch (err) {
    mkdirSync(dirPath);
  }
};

const copyFile = (srcFile: string, targetFile: string): void => {
  const targetDir = dirname(targetFile);

  ensureDirExistSync(targetDir);

  copyFileSync(srcFile, targetFile);
};

const copyDir = (srcDir: string, targetDir: string): void => {
  ensureDirExistSync(targetDir);

  const files = readdirSync(srcDir, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile())
      copyFile(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
    else if (file.isDirectory())
      copyDir(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
  });
};

export const copy = (src: string, target: string): void => {
  if (statSync(src).isDirectory()) copyDir(src, target);
  else if (statSync(src).isFile()) copyFile(src, target);
};
