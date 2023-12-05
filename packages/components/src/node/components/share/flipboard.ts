import type { ShareServiceConfig } from "../../../shared/index.js";

export const flipboard: ShareServiceConfig = {
  link: "https://share.flipboard.com/bookmarklet/popout?v=2&url=[url]&title=[title]",
  color: "#e12828",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M90.125 90.125h270.703v843.75H90.125V90.125zm298.828 298.828h274.219v274.219H388.953V388.953zm0-298.828h544.922v270.703H388.953V90.125z"/></svg>',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#e12828"/><path fill="#fff" d="M263.487 261.893H445.92V809.17H263.487V261.893z"/><path fill="#fce9e9" d="M445.92 261.893h364.842v182.435H445.92V261.893z"/><path fill="#f6bebe" d="M445.92 444.328h182.435v182.435H445.92V444.328z"/></svg>',
};
