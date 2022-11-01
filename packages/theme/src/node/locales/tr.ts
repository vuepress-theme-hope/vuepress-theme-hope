import type { HopeThemeLocaleData } from "../../shared/index.js";

export const trLocale: HopeThemeLocaleData = {
  lang: "tr-TR",

  navbarLocales: {
    langName: "Türkçe",
    selectLangAriaLabel: "Dil seçin",
  },

  metaLocales: {
    author: "Yazar",
    date: "Yazım Tarihi",
    origin: "Özgün",
    views: "Sayfa görüntüleme",
    category: "Kategori",
    tag: "Etiket",
    readingTime: "Okuma Süresi",
    words: "Kelime",
    toc: "Bu sayfada",
    prev: "Önce",
    next: "Sonra",
    lastUpdated: "Son güncelleme",
    contributors: "Katkıda bulunanlar",
    editLink: "Bu sayfayı düzenle",
  },

  blogLocales: {
    article: "Makaleler",
    articleList: "Makale Listesi",
    category: "Kategori",
    tag: "Etiket",
    timeline: "Zaman çizelgesi",
    timelineTitle: "Yesterday Once More!",
    all: "Tümü",
    intro: "Kişisel Giriş",
    star: "Yıldız",
    slides: "Slaytlar",
    encrypt: "Şifreli",
  },

  paginationLocales: {
    prev: "Önceki",
    next: "Sonraki",
    navigate: "Atla",
    action: "Git",
    errorText: "Lütfen 1 ile $page arasında bir sayı girin!",
  },

  outlookLocales: {
    themeColor: "Tema Rengi",
    darkmode: "Tema Modu",
    fullscreen: "Tam Ekran",
  },

  encryptLocales: {
    iconLabel: "Sayfa şifreli",
    placeholder: "Şifrenizi girin",
    remember: "Şifreyi hatırla",
    errorHint: "Lütfen doğru şifreyi girin!",
  },

  routeLocales: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    notFoundMsg: [
      "Burada bir şey yok.",
      "Buraya nasıl geldik?",
      "Bu bir Dört-Sıfır-Dört.",
      "Görünüşe göre bazı çalışmayan bağlantılarımız var.",
    ],
    back: "Geri git",
    home: "Ana sayfaya dön,",
    openInNewWindow: "Yeni pencerede aç",
  },
};
