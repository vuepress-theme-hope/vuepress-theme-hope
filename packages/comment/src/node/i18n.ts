import type { HopeLangPath } from "@mr-hope/vuepress-shared";
import type { PageInfoI18nConfig } from "../types";

/** Muti language config for Page Info */
export const pageInfoI18n: Record<HopeLangPath, PageInfoI18nConfig> = {
  "/zh/": {
    author: "作者🖊",
    time: "写作日期📅",
    origin: "原创💡",
    views: "访问量🔢",
    category: "分类🌈",
    tag: "标签🏷",
    readingTime: "阅读时间⌛",
    words: "字数🔠",
  },
  "/en/": {
    author: "Author🖊",
    time: "Writing Date📅",
    origin: "Original💡",
    views: "Page views🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Reading Time⌛",
    words: "Words🔠",
  },
  "/de/": {
    author: "Autor🖊",
    time: "Datum📅",
    origin: "Original💡",
    views: "Besucher🔢",
    category: "Kategorie🌈",
    tag: "Tags🏷",
    readingTime: "Lesezeit⌛",
    words: "Wörter🔠",
  },
  "/vi/": {
    author: "Người viết🖊",
    time: "Ngày viết📅",
    origin: "Nguồn💡",
    views: "Views của trang🔢",
    category: "Category🌈",
    tag: "Tags🏷",
    readingTime: "Thời gian đọc⌛",
    words: "Words🔠",
  },
};

export const valineI18n: Record<HopeLangPath, string> = {
  "/zh/": "请留言。(填写邮箱可在被回复时收到邮件提醒)",
  "/en/":
    "Write a comment here (Fill in the email address to receive an email notification when being replied)",
  "/de/":
    "Schreibe ein Kommentar (Geben Sie die E-Mail-Adresse ein, um eine E-Mail-Benachrichtigung zu erhalten, wenn Sie geantwortet werden)",
  "/vi/":
    "Để lại bình luận (Điền địa chỉ email để nhận email thông báo khi được trả lời)",
  "/uk/":
    "Напишіть тут коментар (введіть адресу електронної пошти, щоб отримувати сповіщення електронною поштою, коли буде відповідь)",
  "/ru/":
    "Напишите здесь комментарий (введите адрес электронной почты, чтобы получать уведомление по электронной почте при ответе)",
};
