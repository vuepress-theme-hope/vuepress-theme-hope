import type { WalineLocaleConfig } from "../shared";

/**
 * Default locale config for Waline
 */
export const walineLocales: WalineLocaleConfig = {
  "/zh/": {
    placeholder: "请留言。(填写邮箱可在被回复时收到邮件提醒)",
  },

  "/tw/": {
    placeholder: "請留言。(填寫信箱可在被回覆時收到郵件提醒)",
  },

  "/en/": {
    placeholder:
      "Write a comment here (Fill in the email address to receive an email notification when being replied)",
  },
  "/de/": {
    placeholder:
      "Schreibe ein Kommentar (Geben Sie die E-Mail-Adresse ein, um eine E-Mail-Benachrichtigung zu erhalten, wenn Sie geantwortet werden)",
  },
  "/vi/": {
    placeholder:
      "Để lại bình luận (Điền địa chỉ email để nhận email thông báo khi được trả lời)",
  },
  "/uk/": {
    placeholder:
      "Напишіть тут коментар (введіть адресу електронної пошти, щоб отримувати сповіщення електронною поштою, коли буде відповідь)",
  },
  "/ru/": {
    placeholder:
      "Напишите здесь комментарий (введите адрес электронной почты, чтобы получать уведомление по электронной почте при ответе)",
  },
  "/br/": {
    placeholder:
      "Escreva um comentário aqui (preencha com o endereço de email para receber notificações quando tiver alguma resposta)",
  },
};
