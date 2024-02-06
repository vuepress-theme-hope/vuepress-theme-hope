import type { ShareServiceConfig } from "../../../shared/index.js";

export const flipboard: ShareServiceConfig = {
  link: "https://share.flipboard.com/bookmarklet/popout?v=2&url=[url]&title=[title]",
  color: "#e12828",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M122 122h257v800H122zm284 284h259v259H406zm0-284h516v257H406z"/></svg>',
};
