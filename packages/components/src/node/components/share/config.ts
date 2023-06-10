import { keys } from "vuepress-shared/node";

import { buffer } from "./buffer.js";
import { douban } from "./douban.js";
import { email } from "./email.js";
import { evernote } from "./evernote.js";
import { facebook } from "./facebook.js";
import { flipboard } from "./flipboard.js";
import { line } from "./line.js";
import { qq } from "./qq.js";
import { qrcode } from "./qrcode.js";
import { reddit } from "./reddit.js";
import { skype } from "./skype.js";
import { telegram } from "./telegram.js";
import { twitter } from "./twitter.js";
import { weibo } from "./weibo.js";
import { whatsapp } from "./whatsapp.js";
import type {
  BuiltInShareService,
  ShareServiceConfig,
} from "../../../shared/index.js";

export const SHARE_CONFIG: Record<BuiltInShareService, ShareServiceConfig> = {
  buffer,
  douban,
  email,
  evernote,
  facebook,
  flipboard,
  line,
  qq,
  qrcode,
  reddit,
  skype,
  telegram,
  twitter,
  weibo,
  whatsapp,

  // hackernews: "https://news.ycombinator.com/submitlink?u=[url]&t=[title]",
  // instapaper:
  //   "http://www.instapaper.com/edit?url=[url]&title=[title]&description=[description]",
  // linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=[url]",
  // messenger: "fb-messenger://share/?link=[url]",
  // odnoklassniki:
  //   "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=[url]&st.comments=[title]",
  // pinterest:
  //   "https://pinterest.com/pin/create/button/?url=[url]&media=[cover|image]&description=[title]",
  // pocket: "https://getpocket.com/save?url=[url]&title=[title]",
  // quora: "https://www.quora.com/share?url=[url]&title=[title]",
  // sms: "sms:?body=[title]%0D%0A[url]%0D%0A[description]",
  // stumbleupon: "https://www.stumbleupon.com/submit?url=[url]&title=[title]",
  // tumblr:
  //   "https://www.tumblr.com/share/link?url=[url]&name=[title]&description=[description]",

  // viber: "viber://forward?text=[title]%0D%0A[url]%0D%0A[description]",
  // vk: "https://vk.com/share.php?url=[url]&title=[title]&description=[description]&image=[cover|image]&noparse=true",

  // wordpress:
  //   "https://wordpress.com/press-this.php?u=[url]&t=[title]&s=[description]&i=[cover|image]",
  // xing: "https://www.xing.com/social/share/spi?op=share&url=[url]&title=[title]",
  // yammer:
  //   "https://www.yammer.com/messages/new?login=true&status=[title]%0D%0A[url]%0D%0A[description]",
};

export const AVAILABLE_SERVICES = keys(SHARE_CONFIG) as BuiltInShareService[];
