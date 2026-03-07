import { getDirname, fs, path } from "vuepress/utils";
import { glob } from "node:fs/promises";
import { watch } from "chokidar";

const themeRoot = path.resolve(getDirname(import.meta.url), "..");
const isWatch = process.argv.includes("-w") || process.argv.includes("--watch");

const ENTIRES_MARKER = /^\/\*\s*bundle entries(?: dir:(.+?))?\s*\*\/$/m;
const CONFIG_IMPORT = '@use "@sass-palette/hope-config";';
const PALETTE_IMPORT = '@use "@sass-palette/hope-palette";';

const generateDirUses = async (dir: string, subDirs: string[] = []): Promise<string> =>
  `\
${(await fs.readdir(dir, { withFileTypes: true }))
  .filter(
    (file) =>
      file.isFile() &&
      file.name.endsWith(".scss") &&
      !file.name.endsWith(".module.scss") &&
      file.name !== "index.scss",
  )
  .map((file) => `@use "${file.name.replace(/^_/, "").slice(0, -5)}";`)
  .join("\n")}
${subDirs.map((subDir) => `@use "${subDir}/index" as ${subDir};`).join("\n")}\
`;

const getFileContent = async (filePath: string, content: string): Promise<string> => {
  let result = content;

  if (content.includes("hope-config") && !content.includes(CONFIG_IMPORT))
    result = `${CONFIG_IMPORT}\n${content}`;

  if (content.includes("hope-palette") && !content.includes(PALETTE_IMPORT))
    result = `${PALETTE_IMPORT}\n${content}`;

  if (filePath.endsWith("index.scss")) {
    const match = ENTIRES_MARKER.exec(content);

    if (match) {
      result = content.replace(
        ENTIRES_MARKER,
        await generateDirUses(
          path.dirname(filePath),
          match[1]?.split(",").map((dir) => dir.trim()),
        ),
      );
    }
  }

  return result;
};

const generateBundleStyle = async (entry: string) => {
  const filePath = path.join(themeRoot, "src/client", entry);
  const outputPath = path.join(themeRoot, "dist/bundle", entry);

  if (await fs.pathExists(filePath)) {
    const content = await fs.readFile(filePath, "utf-8");
    const result = entry.endsWith(".css") ? content : await getFileContent(filePath, content);

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, result, {
      encoding: "utf-8",
      flag: "w",
    });
  } else {
    await fs.remove(outputPath);
  }
};

const bundleStyles = async () => {
  const cwd = path.join(themeRoot, "src/client");

  for await (const entry of glob("styles/**/*.{css,scss}", {
    cwd,
  }))
    await generateBundleStyle(entry);

  if (isWatch) {
    console.info("Watching styles for changes...");

    watch("styles/**/*.{css,scss}", {
      cwd,
      ignoreInitial: true,
    }).on("all", (event, entry) => {
      console.info(`[${event}] ${entry}`);
      generateBundleStyle(entry);
    });
  }
};

await bundleStyles();
