import {
  encodeCDATA,
  encodeXMLContent,
  entries,
  fromEntries,
  isArray,
  isPlainObject,
} from "vuepress-shared/node";
import type { ElementCompact } from "xml-js";

export const encodeXML = (content: ElementCompact): ElementCompact =>
  fromEntries(
    entries(content).map(([key, value]) => {
      if (key === "_attributes" && value)
        return [
          key,
          fromEntries(
            entries(value as Record<string, string | number | undefined>).map(
              ([key, value]) => [
                key,
                value ? encodeXMLContent(value.toString()) : undefined,
              ],
            ),
          ),
        ];

      if (key === "_text")
        return [key, encodeXMLContent((value as string | number).toString())];
      if (key === "_cdata") return [key, encodeCDATA(value as string)];
      if (key === "_comment" || key === "_instruction") return [key, value];

      if (isArray(value))
        return [key, value.map((item) => encodeXML(item as ElementCompact))];

      if (isPlainObject(value))
        return [key, encodeXML(value as ElementCompact)];

      return [key, encodeXMLContent(String(value))];
    }),
  ) satisfies ElementCompact;
