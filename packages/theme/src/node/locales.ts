import type { HopeThemeLocaleData } from "../shared";

export const themeLocalesData: Record<string, HopeThemeLocaleData> = {
  "/en/": {
    lang: "en-US",

    navbarLocales: {
      langName: "English",
      selectLangText: "Language",
      selectLangAriaLabel: "Select language",
    },

    metaLocales: {
      prev: "Prev",
      next: "Next",
      lastUpdated: "Last update",
      contributors: "Contributors",
      editLink: "Edit this page",
    },

    blogLocales: {
      article: "Articles",
      articleList: "Article List",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineTitle: "Yesterday Once More!",
      all: "All",
      intro: "Personal Intro",
      star: "Star",
      slides: "Slides",
      encrypt: "Encrypted",
    },

    outlookLocales: {
      themeColor: "Theme Color",
      darkmode: "Theme Mode",
      fullscreen: "Full Screen",
    },

    encryptLocales: {
      title: "Please enter password",
      errorHint: "Please enter the correct password!",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "There’s nothing here.",
        "How did we get here?",
        "That’s a Four-Oh-Four.",
        "Looks like we've got some broken links.",
      ],
      back: "Go back",
      home: "Take me home",
    },
  },

  "/zh/": {
    lang: "zh-CN",

    navbarLocales: {
      langName: "简体中文",
      selectLangText: "选择语言",
      selectLangAriaLabel: "选择语言",
    },

    metaLocales: {
      prev: "上一页",
      next: "下一页",
      lastUpdated: "上次编辑于",
      contributors: "贡献者",
      editLink: "编辑此页",
    },

    blogLocales: {
      article: "文章",
      articleList: "文章列表",
      category: "分类",
      tag: "标签",
      timeline: "时间轴",
      timelineTitle: "昨日不在",
      all: "全部",
      intro: "个人介绍",
      star: "收藏",
      slides: "幻灯片",
      encrypt: "加密",
    },

    outlookLocales: {
      themeColor: "主题色",
      darkmode: "外观",
      fullscreen: "全屏",
    },

    encryptLocales: {
      title: "请输入密码",
      errorHint: "请输入正确密码",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "这里什么也没有",
        "我们是怎么来到这儿的？",
        "这 是 四 零 四 !",
        "看起来你访问了一个失效的链接",
      ],
      back: "返回上一页",
      home: "带我回家",
    },
  },

  "/zh-tw/": {
    lang: "zh-TW",

    navbarLocales: {
      langName: "繁體中文",
      selectLangText: "選擇語言",
      selectLangAriaLabel: "選擇語言",
    },

    metaLocales: {
      prev: "上一頁",
      next: "下一頁",
      lastUpdated: "上次編輯於",
      contributors: "貢獻者",
      editLink: "編輯此頁",
    },

    blogLocales: {
      article: "文章",
      articleList: "文章列表",
      category: "分類",
      tag: "標籤",
      timeline: "時間軸",
      timelineTitle: "昨日不在",
      all: "全部",
      intro: "個人介紹",
      star: "收藏",
      slides: "幻燈片",
      encrypt: "加密",
    },

    outlookLocales: {
      themeColor: "主題色",
      darkmode: "主題模式",
      fullscreen: "全屏",
    },

    encryptLocales: {
      title: "請輸入密碼",
      errorHint: "請輸入正確密碼",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "這裡什麼也沒有",
        "我們是怎麼來到這兒的？",
        "這 是 四 零 四 !",
        "看起来你訪問了一個失效的鏈結",
      ],
      back: "返回上一頁",
      home: "帶我回家",
    },
  },

  "/de/": {
    lang: "de-AT",

    navbarLocales: {
      langName: "Deutsch",
      selectLangText: "Sprache",
      selectLangAriaLabel: "Sprache wählen",
    },

    metaLocales: {
      prev: "Prev",
      next: "Next",
      lastUpdated: "Zuletzt geändert",
      contributors: "Mitwirkende",
      editLink: "Diese Seite barbeiten",
    },

    blogLocales: {
      article: "Artikel",
      articleList: "Artikel Liste",
      category: "Kategorie",
      tag: "Tags",
      timeline: "Timeline",
      timelineTitle: "Yesterday Once More!",
      all: "Alle",
      intro: "Persönliche Einleitung",
      star: "Star",
      slides: "Slides",
      encrypt: "Verschlüsselt",
    },

    outlookLocales: {
      themeColor: "Design-Farbe",
      darkmode: "Design-Modus",
      fullscreen: "Full Screen",
    },

    encryptLocales: {
      title: "Passwort eingeben",
      errorHint: "Bitte das korrekte Passwort eingeben!",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "Hier gibt es nichts.",
        "Wie sind wir hier hergekommen?",
        "Das ist wohl eine Vier-Null-Vier.",
        "Sieht aus als hättest du einen kaputten Link gefunden.",
      ],
      back: "Zurück",
      home: "Zur Startseite",
    },
  },

  "/vi/": {
    lang: "vi-VN",

    navbarLocales: {
      langName: "Ngôn ngữ",
      selectLangText: "Tiếng Việt",
      selectLangAriaLabel: "Chọn ngôn ngữ",
    },

    metaLocales: {
      prev: "Prev",
      next: "Next",
      lastUpdated: "Cập nhật gần nhất lúc",
      contributors: "Người đóng góp",
      editLink: "Chỉnh sửa trang này",
    },

    blogLocales: {
      article: "Bài viết",
      articleList: "Danh sách Bài viết",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineTitle: "Yesterday Once More!",
      all: "Tất cả",
      intro: "Giới thiệu cá nhân",
      star: "Ngôi sao",
      slides: "Bài thuyết trình",
      encrypt: "Mã hóa",
    },

    outlookLocales: {
      themeColor: "Màu nền",
      darkmode: "Theme Mode",
      fullscreen: "Full Screen",
    },

    encryptLocales: {
      title: "Xin vui lòng nhập mật khẩu",
      errorHint: "Vui lòng nhập đúng mật khẩu",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "Ở đây chẳng có gì cả.",
        "Sao chúng ta lại đến đây?",
        "Đây là lỗi bốn-không-bốn",
        "Có vẻ chúng ta có vài broken link.",
      ],
      back: "Quay lại",
      home: "Trang chủ",
    },
  },

  "/ru/": {
    lang: "ru-RU",

    navbarLocales: {
      langName: "Русский",
      selectLangText: "Язык",
      selectLangAriaLabel: "Выберите язык",
    },

    metaLocales: {
      prev: "Prev",
      next: "Next",
      lastUpdated: "Последнее обновление",
      contributors: "Авторы",
      editLink: "Редактировать эту страницу",
    },

    blogLocales: {
      article: "Статьи",
      articleList: "Список статей",
      category: "Категория",
      tag: "Тэги",
      timeline: "Таймлайн",
      timelineTitle: "Вчера еще раз!",
      all: "Всё",
      intro: "Личное вступление",
      star: "Звезда",
      slides: "Слайды",
      encrypt: "Зашифровано",
    },

    outlookLocales: {
      themeColor: "Цвет темы",
      darkmode: "Режим темы",
      fullscreen: "Full Screen",
    },

    encryptLocales: {
      title: "Пожалуйста, введите пароль",
      errorHint: "Пожалуйста, введите правильный пароль!",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "Здесь ничего нет.",
        "Как мы сюда попали?",
        'Это "4-0-4".',
        "Похоже, у нас есть несколько неработающих ссылок.",
      ],
      back: "Вернуться назад",
      home: "Вернуться на главную",
    },
  },

  "/uk/": {
    lang: "uk-UA",

    navbarLocales: {
      langName: "Українська",
      selectLangText: "Мова",
      selectLangAriaLabel: "Оберіть мову",
    },

    metaLocales: {
      prev: "Prev",
      next: "Next",
      lastUpdated: "Останнє оновлення",
      contributors: "Автори",
      editLink: "Редагувати цю сторінку",
    },

    blogLocales: {
      article: "Статті",
      articleList: "Список статей",
      category: "Категорія",
      tag: "Теги",
      timeline: "Хронологія",
      timelineTitle: "Вчора ще раз!",
      all: "Все",
      intro: "Особистий вступ",
      star: "Зірка",
      slides: "Слайди",
      encrypt: "Зашифровано",
    },

    outlookLocales: {
      themeColor: "Колір теми",
      darkmode: "Тематичний режим",
      fullscreen: "Full Screen",
    },

    encryptLocales: {
      title: "Будь ласка, введіть пароль",
      errorHint: "Будь ласка, введіть правильний пароль!",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "Тут немає нічого.",
        "Як ми сюди потрапили?",
        'Це "4-0-4".',
        "Схоже, у нас є непрацюючі посилання.",
      ],
      back: "Повернутися назад",
      home: "Повернутися на головну",
    },
  },

  "/br/": {
    lang: "pt-BR",

    navbarLocales: {
      langName: "Português",
      selectLangText: "Língua",
      selectLangAriaLabel: "Selecione a língua",
    },

    metaLocales: {
      prev: "Prev",
      next: "Next",
      lastUpdated: "Última atualização",
      editLink: "Editar esta página",
      contributors: "Contribuidores",
    },

    blogLocales: {
      article: "Artigos",
      articleList: "Lista de Artigos",
      category: "Categorias",
      tag: "Tags",
      timeline: "Linha do Tempo",
      timelineTitle: "Ontem, de novo!",
      all: "Todos",
      intro: "Intro Pessoal",
      star: "Estrela",
      slides: "Slides",
      encrypt: "Encriptado",
    },

    outlookLocales: {
      themeColor: "Cor do Tema",
      darkmode: "Modo do Tema",
      fullscreen: "Full Screen",
    },

    encryptLocales: {
      title: "Por favor, entre a senha",
      errorHint: "Por favor, entre a senha correta!",
    },

    routeLocales: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "404msg": [
        "Não há nada aqui.",
        "Como chegou até aqui?",
        "Isto é um Quatro-Zero-Quatro.",
        "Parece que temos alguns links quebrados.",
      ],
      back: "Voltar",
      home: "Leve-me para casa",
    },
  },
};
