import type { ShareServiceConfig } from "../../../shared/index.js";

export const douban: ShareServiceConfig = {
  link: "https://shuo.douban.com/!service/share?href=[url]&name=[title]&text=[description|summary]&image=[cover|image]&starid=0&aid=0&style=11",
  color: "#30c171",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M897 113H126c-8 0-14 7-14 13v58c0 7 6 13 14 13h771c6 0 13-6 13-13v-58a13 13 0 0 0-14-14zm0 715H689l74-186h63c7 0 13-7 13-15V299c0-8-5-15-13-15H197c-7 0-14 6-14 13v329c0 7 7 15 14 15h452l-75 186H434l-51-129c0-7-8-13-14-13h-85c-8 0-14 6-14 13l51 129H127c-6 0-13 6-13 14v58c0 7 7 13 13 13h771c8 0 14-6 14-13v-58c0-8-6-14-14-14zM311 556V370h400v186z"/></svg>',
};
