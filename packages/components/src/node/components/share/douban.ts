import type { ShareServiceConfig } from "../../../shared/index.js";

export const douban: ShareServiceConfig = {
  link: "https://shuo.douban.com/!service/share?href=[url]&name=[title]&text=[description|summary]&image=[cover|image]&starid=0&aid=0&style=11",
  color: "#00b51d",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M943.4 65.7H81.6c-8.8 0-16 7.1-16 16v63.8c0 8.8 7.1 16 16 16h861.7c8.8 0 16-7.1 16-16V81.6c0-8.8-7.1-15.9-15.9-15.9zm0 797.9h-233l83-207.5h70.2c8.8 0 16-7.1 16-16v-367c0-8.8-7.1-16-16-16H161.4c-8.8 0-16 7.1-16 16v367c0 8.8 7.1 16 16 16h504.3l-83 207.5H426.3L368.9 720c0-8.8-7.1-16-16-16h-95.7c-8.8 0-16 7.1-16 16l57.4 143.6h-217c-8.8 0-16 7.1-16 16v63.8c0 8.8 7.1 16 16 16h861.7c8.8 0 16-7.1 16-16v-63.8c0-8.9-7.1-16-15.9-16zM289.1 560.4V352.9h446.8v207.5H289.1z"/></svg>',
};
