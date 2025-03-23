import type { ThemeLocaleData } from "../../shared/index.js";

export const trLocale: ThemeLocaleData = {
  lang: "tr-TR",

  navbarLocales: {
    langName: "Türkçe",
    selectLangAriaLabel: "Dil seçin",
  },

  metaLocales: {
    author: "Yazar",
    date: "Yazım Tarihi",
    origin: "Özgün",
    views: "Sayfa Görünümü",
    category: "Kategori",
    tag: "Etiket",
    readingTime: "Okuma Süresi",
    words: "Kelime",
    toc: "Bu sayfada",
    prev: "Önceki",
    next: "Sonraki",
    contributors: "Katkıda Bulunanlar",
    editLink: "Bu sayfayı düzenle",
    print: "Yazdır",
  },

  blogLocales: {
    article: "Makaleler",
    articleList: "Makale Listesi",
    category: "Kategori",
    tag: "Etiket",
    timeline: "Zaman Çizelgesi",
    timelineTitle: "Yesterday Once More!",
    all: "Hepsi",
    intro: "Kişisel Tanıtım",
    star: "Yıldız",
    empty: "$text boş",
  },

  paginationLocales: {
    prev: "Önceki",
    next: "Sonraki",
    navigate: "Atla",
    action: "Git",
    errorText: "Lütfen 1 ile $page arasında bir sayfa numarası girin !",
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
    skipToContent: "Ana içeriğe atla",
    notFoundTitle: "Sayfa bulunamadı",
    notFoundMsg: [
      "Burada hiçbir şey yok.",
      "Bu sayfaya nasıl geldik?",
      "Bir hata var - Dört-Sıfır-Dört.",
      "Bazı çalışmayan bağlantılar var.",
    ],
    back: "Geri dön",
    home: "Ana sayfaya git",
  },
};
