import { h } from "vue";

import type { FunctionalComponent } from "vue";

export interface PDFProps {
  url: string;
  height?: string | number;
  /**
   * @default 1
   */
  page?: number;
  /**
   * @default true
   */
  toolbar?: boolean;
  /**
   * @default 100
   */
  zoom?: number;
}

const PDF: FunctionalComponent<PDFProps> = ({
  url,
  height = "80vh",
  page = 1,
  toolbar = true,
  zoom = 100,
}) =>
  h("iframe", {
    class: "pdf-iframe",
    src: `${url}#page=${page}&toolbar=${toolbar ? 1 : 0}&zoom=${zoom}`,
    style: {
      width: "100%",
      "border-radius": "8px",
      height: typeof height === "string" ? height : `${height}px`,
    },
  });

PDF.displayName = "PDF";

export default PDF;
