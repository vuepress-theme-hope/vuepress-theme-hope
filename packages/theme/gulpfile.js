import { dest, src } from "gulp";
import through from "through2";

const generateSass = () =>
  src("src/client/**/*.scss")
    .pipe(
      through.obj((file, _encoding, callback) => {
        let content = file.contents.toString();
        let changed = false;

        if (
          content.includes("hope-config") &&
          !content.includes('@use "@sass-palette/hope-config";')
        ) {
          changed = true;
          content = `@use "@sass-palette/hope-config";\n${content}`;
        }
        if (
          content.includes("hope-palette") &&
          !content.includes('@use "@sass-palette/hope-palette";')
        ) {
          changed = true;
          content = `@use "@sass-palette/hope-palette";\n${content}`;
        }

        if (changed) file.contents = Buffer.from(content);

        callback(null, file);
      }),
    )
    .pipe(dest("lib/bundle"));

export default generateSass;
