const fs = require("fs");
const path = require("path");

/**
 * 确认某个文件夹存在，如果不存在则创建它
 *
 * @param {string} dirPath 确认存在的文件夹路径
 */
const markDirExistSync = (dirPath) => {
  try {
    fs.readdirSync(dirPath);
  } catch (err) {
    fs.mkdirSync(dirPath);
  }
};

/**
 * 复制文件
 *
 * @param {string} srcFile 源文件
 * @param {string} targetFile 目标文件
 * @return
 */
const copyFile = (srcFile, targetFile) => {
  const targetDir = path.dirname(targetFile);

  markDirExistSync(targetDir);

  const rs = fs.createReadStream(srcFile); // 创建读取流
  const ws = fs.createWriteStream(targetFile); // 创建写入流

  rs.pipe(ws);
};

/**
 * 复制目录
 *
 * @param {string} srcDir 源目录
 * @param {string} targetDir 目标目录
 */
const copyDir = (srcDir, targetDir) => {
  // 读取目录
  markDirExistSync(targetDir);

  const files = fs.readdirSync(srcDir, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile())
      copyFile(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
    else if (file.isDirectory())
      copyDir(`${srcDir}/${file.name}`, `${targetDir}/${file.name}`);
  });
};

/**
 * 复制内容
 *
 * @param {string} src 源
 * @param {string} target 目标
 */
const copy = (src, target) => {
  if (fs.statSync(src).isDirectory()) copyDir(src, target);
  else if (fs.statSync(src).isFile()) copyFile(src, target);
};

module.exports = copy;
