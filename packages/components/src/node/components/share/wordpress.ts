import type { ShareServiceConfig } from "../../../shared/index.js";

export const wordpress: ShareServiceConfig = {
  link: "https://wordpress.com/press-this.php?u=[url]&t=[title]&s=[description|summary]&i=[cover|image]",
  color: "#23282d",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M512 112a400 400 0 1 0 0 800 400 400 0 0 0 0-800M172 512c0-49 10-96 30-138l162 444a340 340 0 0 1-192-306m340 340c-33 0-65-5-96-14l102-296 104 286 3 5c-36 13-75 19-113 19m47-500c20 0 39-3 39-3 18-2 16-29-2-28 0 0-56 5-91 5-33 0-89-4-89-4-19-2-21 26-3 28l36 2 53 146-74 223-124-368c20-1 39-4 39-4 18-2 16-29-3-28 0 0-55 5-90 5h-22a340 340 0 0 1 514-65h-5c-33 0-57 29-57 60 0 28 16 52 34 80 12 23 28 52 28 94 0 29-12 63-26 110l-34 113-123-365zm124 454 104-300c21-50 29-104 23-157a338 338 0 0 1-127 457"/></svg>',
};
