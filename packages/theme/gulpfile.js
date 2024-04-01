import { dest, src } from "gulp";
import through from "through2";

const generateSass = () =>
  src("src/client/**/*.scss")
    .pipe(
      through.obj((file, _encoding, callback) => {
        const content = file.contents.toString();

        if (!content.includes('@use "@sass-palette/hope-config";')) {
          file.contents = Buffer.from(
            `@use "@sass-palette/hope-config";\n${content}`,
          );
        }
        callback(null, file);
      }),
    )
    .pipe(dest("lib/bundle"));

export default generateSass;
