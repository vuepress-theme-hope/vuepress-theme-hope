import MagicString from "magic-string";

const hashbangRegex = /^\s*(#!.*)/;

export default function shebangPlugin() {
  const shebangMap = new Map();

  return {
    name: "hashbang",

    transform(code, id) {
      let match = hashbangRegex.exec(code);

      if (match) {
        const str = new MagicString(code);

        str.remove(match.index, match[1].length);
        shebangMap.set(id, match[1]);

        return { code: str.toString(), map: str.generateMap({ hires: true }) };
      }

      return null;
    },

    renderChunk(code, chunk) {
      if (chunk.isEntry) {
        const key = Array.from(shebangMap.keys()).find((id) =>
          chunk.facadeModuleId.includes(id)
        );

        if (key) {
          const str = new MagicString(code);

          str.prepend(shebangMap.get(key) + "\n");

          return {
            code: str.toString(),
            map: str.generateMap({ hires: true }),
          };
        }
      }
    },
  };
}
