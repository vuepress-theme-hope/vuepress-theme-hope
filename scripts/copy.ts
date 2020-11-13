import * as fs from "fs";
import * as path from "path";

const ensureDirExistSync = (dirPath: string): void => {
  try {
    fs.readdirSync(dirPath);
  } catch (err) {
    fs.mkdirSync(dirPath);
  }
};

const copyFile = (srcFile: string, targetFile: string): void => {
  const targetDir = path.dirname(targetFile);

  ensureDirExistSync(targetDir);

  const rs = fs.createReadStream(srcFile); // create read stream
  const ws = fs.createWriteStream(targetFile); // create write stream

  rs.pipe(ws);
};

const copyDir = (srcDir: string, targetDir: string): void => {
  ensureDirExistSync(targetDir);

  const files = fs.readdirSync(srcDir, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile())
      copyFile(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
    else if (file.isDirectory())
      copyDir(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
  });
};

const copy = (src: string, target: string): void => {
  if (fs.statSync(src).isDirectory()) copyDir(src, target);
  else if (fs.statSync(src).isFile()) copyFile(src, target);
};

export = copy;
