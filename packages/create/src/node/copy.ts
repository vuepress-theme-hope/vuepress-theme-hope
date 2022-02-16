import { fs, path } from "@vuepress/utils";

const copyFile = (srcFile: string, targetFile: string): void => {
  const targetDir = path.dirname(targetFile);

  fs.ensureDirSync(targetDir);

  const rs = fs.createReadStream(srcFile); // create read stream
  const ws = fs.createWriteStream(targetFile); // create write stream

  rs.pipe(ws);
};

const copyDir = (srcDir: string, targetDir: string): void => {
  fs.ensureDirSync(targetDir);

  const files = fs.readdirSync(srcDir, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile())
      copyFile(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
    else if (file.isDirectory())
      copyDir(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
  });
};

export const copy = (src: string, target: string): void => {
  if (fs.statSync(src).isDirectory()) copyDir(src, target);
  else if (fs.statSync(src).isFile()) copyFile(src, target);
};
