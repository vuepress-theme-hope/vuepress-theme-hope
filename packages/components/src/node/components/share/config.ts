import { keys } from "@vuepress/helper";

import { buffer } from "./buffer.js";
import { douban } from "./douban.js";
import { email } from "./email.js";
import { evernote } from "./evernote.js";
import { facebook } from "./facebook.js";
import { flipboard } from "./flipboard.js";
import { line } from "./line.js";
import { linkedin } from "./linkedin.js";
import { messenger } from "./messenger.js";
import { pinterest } from "./pinterest.js";
import { qq } from "./qq.js";
import { qrcode } from "./qrcode.js";
import { qzone } from "./qzone.js";
import { reddit } from "./reddit.js";
import { skype } from "./skype.js";
import { sms } from "./sms.js";
import { snapchat } from "./snapchat.js";
import { telegram } from "./telegram.js";
import { tumblr } from "./tumblr.js";
import { twitter } from "./twitter.js";
import { vk } from "./vk.js";
import { weibo } from "./weibo.js";
import { whatsapp } from "./whatsapp.js";
import { wordpress } from "./wordpress.js";
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
  linkedin,
  messenger,
  pinterest,
  qq,
  qrcode,
  qzone,
  reddit,
  skype,
  sms,
  snapchat,
  telegram,
  tumblr,
  twitter,
  vk,
  weibo,
  whatsapp,
  wordpress,

  // hackernews: "https://news.ycombinator.com/submitlink?u=[url]&t=[title]",
  // instapaper:
  //   "http://www.instapaper.com/edit?url=[url]&title=[title]&description=[description]",
  // odnoklassniki:
  //   "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=[url]&st.comments=[title]",
  // pocket: "https://getpocket.com/save?url=[url]&title=[title]",
  // quora: "https://www.quora.com/share?url=[url]&title=[title]",
  // stumbleupon: "https://www.stumbleupon.com/submit?url=[url]&title=[title]",
  // viber: "viber://forward?text=[title]%0D%0A[url]%0D%0A[description]",
  // xing: "https://www.xing.com/social/share/spi?op=share&url=[url]&title=[title]",
  // yammer:
  //   "https://www.yammer.com/messages/new?login=true&status=[title]%0D%0A[url]%0D%0A[description]",
};

export const AVAILABLE_SERVICES = keys(SHARE_CONFIG) as BuiltInShareService[];
