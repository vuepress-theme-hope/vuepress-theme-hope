declare module "dashjs/dist/dash.all.min.js" {
  import dashjs from "dashjs";
  export = dashjs;
}
declare module "hls.js/dist/hls.min.js" {
  import HLS from "hls.js";

  export * from "hls.js";
  export default HLS;
}

declare module "mpegts.js/dist/mpegts.js" {
  import mpegts from "mpegts.js";
  export * from "mpegts.js";
  export default mpegts;
}
