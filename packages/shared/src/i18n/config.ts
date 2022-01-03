import type {
  HopeThemeLocaleConfigItem,
  HopeLangPath,
  HopeLang,
} from "./types";

export const langs: HopeLang[] = [
  "zh-CN",
  "en-US",
  "vi-VN",
  "de-AT",
  "ru-RU",
  "uk-UA",
  "pt-BR",
];

export const lang2PathConfig: Record<HopeLang, HopeLangPath> = {
  "zh-CN": "/zh/",
  "en-US": "/en/",
  "de-AT": "/de/",
  "vi-VN": "/vi/",
  "ru-RU": "/ru/",
  "uk-UA": "/uk/",
  "pt-BR": "/br/",
};

export const path2langConfig: Record<HopeLangPath, HopeLang> = {
  "/zh/": "zh-CN",
  "/en/": "en-US",
  "/de/": "de-AT",
  "/vi/": "vi-VN",
  "/ru/": "ru-RU",
  "/uk/": "uk-UA",
  "/br/": "pt-BR",
};

export const localesConfig: Record<HopeLang, HopeThemeLocaleConfigItem> = {
  "zh-CN": {
    lang: "zh-CN",
    selectText: "选择语言",
    label: "简体中文",
    meta: {
      contributor: "贡献者",
      editLink: "编辑此页",
      updateTime: "上次编辑于",
    },
    themeColor: {
      themeColor: "主题色",
      themeMode: "主题模式",
    },
    encrypt: {
      title: "请输入密码",
      errorHint: "请输入正确密码",
    },
    error404: {
      hint: [
        "这里什么也没有",
        "我们是怎么来到这儿的？",
        "这 是 四 零 四 !",
        "看起来你访问了一个失效的链接",
      ],
      back: "返回上一页",
      home: "带我回家",
    },
    blog: {
      article: "文章",
      articleList: "文章列表",
      category: "分类",
      tag: "标签",
      timeline: "时间轴",
      timelineText: "昨日不在",
      allText: "全部",
      intro: "个人介绍",
      star: "收藏",
      slides: "幻灯片",
      encrypt: "加密",
    },
  },

  "en-US": {
    lang: "en-US",
    selectText: "Language",
    label: "English",
    ariaLabel: "Select language",
    meta: {
      contributor: "Contributors",
      editLink: "Edit this page",
      updateTime: "Last update",
    },
    themeColor: {
      themeColor: "Theme Color",
      themeMode: "Theme Mode",
    },
    encrypt: {
      title: "Please enter password",
      errorHint: "Please enter the correct password!",
    },
    error404: {
      hint: [
        "There’s nothing here.",
        "How did we get here?",
        "That’s a Four-Oh-Four.",
        "Looks like we've got some broken links.",
      ],
      back: "Go back",
      home: "Take me home",
    },
    blog: {
      article: "Articles",
      articleList: "Article List",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineText: "Yesterday Once More!",
      allText: "All",
      intro: "Personal Intro",
      star: "Star",
      slides: "Slides",
      encrypt: "Encrypted",
    },
  },

  "de-AT": {
    lang: "de-AT",
    selectText: "Sprache",
    label: "Deutsch",
    ariaLabel: "Sprache wählen",
    meta: {
      contributor: "Mitwirkende",
      editLink: "Diese Seite barbeiten",
      updateTime: "Zuletzt geändert",
    },
    themeColor: {
      themeColor: "Design-Farbe",
      themeMode: "Design-Modus",
    },
    encrypt: {
      title: "Passwort eingeben",
      errorHint: "Bitte das korrekte Passwort eingeben!",
    },
    error404: {
      hint: [
        "Hier gibt es nichts.",
        "Wie sind wir hier hergekommen?",
        "Das ist wohl eine Vier-Null-Vier.",
        "Sieht aus als hättest du einen kaputten Link gefunden.",
      ],
      back: "Zurück",
      home: "Zur Startseite",
    },
    blog: {
      article: "Artikel",
      articleList: "Artikel Liste",
      category: "Kategorie",
      tag: "Tags",
      timeline: "Timeline",
      timelineText: "Yesterday Once More!",
      allText: "Alle",
      intro: "Persönliche Einleitung",
      star: "Star",
      slides: "Slides",
      encrypt: "Verschlüsselt",
    },
  },

  "vi-VN": {
    lang: "vi-VN",
    selectText: "Ngôn ngữ",
    label: "Tiếng Việt",
    ariaLabel: "Chọn ngôn ngữ",
    meta: {
      contributor: "Người đóng góp",
      editLink: "Chỉnh sửa trang này",
      updateTime: "Cập nhật gần nhất lúc",
    },
    themeColor: {
      themeColor: "Màu nền",
      themeMode: "Theme Mode",
    },
    encrypt: {
      title: "Xin vui lòng nhập mật khẩu",
      errorHint: "Vui lòng nhập đúng mật khẩu",
    },
    error404: {
      hint: [
        "Ở đây chẳng có gì cả.",
        "Sao chúng ta lại đến đây?",
        "Đây là lỗi bốn-không-bốn",
        "Có vẻ chúng ta có vài broken link.",
      ],
      back: "Quay lại",
      home: "Trang chủ",
    },
    blog: {
      article: "Bài viết",
      articleList: "Danh sách Bài viết",
      category: "Category",
      tag: "Tags",
      timeline: "Timeline",
      timelineText: "Yesterday Once More!",
      allText: "Tất cả",
      intro: "Giới thiệu cá nhân",
      star: "Ngôi sao",
      slides: "Bài thuyết trình",
      encrypt: "Mã hóa",
    },
  },

  "ru-RU": {
    lang: "ru-RU",
    selectText: "Язык",
    label: "Русский",
    ariaLabel: "Выберите язык",
    meta: {
      contributor: "Авторы",
      editLink: "Редактировать эту страницу",
      updateTime: "Последнее обновление",
    },
    themeColor: {
      themeColor: "Цвет темы",
      themeMode: "Режим темы",
    },
    encrypt: {
      title: "Пожалуйста, введите пароль",
      errorHint: "Пожалуйста, введите правильный пароль!",
    },
    error404: {
      hint: [
        "Здесь ничего нет.",
        "Как мы сюда попали?",
        'Это "4-0-4".',
        "Похоже, у нас есть несколько неработающих ссылок.",
      ],
      back: "Вернуться назад",
      home: "Вернуться на главную",
    },
    blog: {
      article: "Статьи",
      articleList: "Список статей",
      category: "Категория",
      tag: "Тэги",
      timeline: "Таймлайн",
      timelineText: "Вчера еще раз!",
      allText: "Всё",
      intro: "Личное вступление",
      star: "Звезда",
      slides: "Слайды",
      encrypt: "Зашифровано",
    },
  },

  "uk-UA": {
    lang: "uk-UA",
    selectText: "Мова",
    label: "Українська",
    ariaLabel: "Оберіть мову",
    meta: {
      contributor: "Автори",
      editLink: "Редагувати цю сторінку",
      updateTime: "Останнє оновлення",
    },
    themeColor: {
      themeColor: "Колір теми",
      themeMode: "Тематичний режим",
    },
    encrypt: {
      title: "Будь ласка, введіть пароль",
      errorHint: "Будь ласка, введіть правильний пароль!",
    },
    error404: {
      hint: [
        "Тут немає нічого.",
        "Як ми сюди потрапили?",
        'Це "4-0-4".',
        "Схоже, у нас є непрацюючі посилання.",
      ],
      back: "Повернутися назад",
      home: "Повернутися на головну",
    },
    blog: {
      article: "Статті",
      articleList: "Список статей",
      category: "Категорія",
      tag: "Теги",
      timeline: "Хронологія",
      timelineText: "Вчора ще раз!",
      allText: "Все",
      intro: "Особистий вступ",
      star: "Зірка",
      slides: "Слайди",
      encrypt: "Зашифровано",
    },
  },

  "pt-BR": {
    lang: "pt-BR",
    selectText: "Língua",
    label: "Português",
    ariaLabel: "Selecione a língua",
    meta: {
      contributor: "Contribuidores",
      editLink: "Editar esta página",
      updateTime: "Última atualização",
    },
    themeColor: {
      themeColor: "Cor do Tema",
      themeMode: "Modo do Tema",
    },
    encrypt: {
      title: "Por favor, entre a senha",
      errorHint: "Por favor, entre a senha correta!",
    },
    error404: {
      hint: [
        "Não há nada aqui.",
        "Como chegou até aqui?",
        "Isto é um Quatro-Zero-Quatro.",
        "Parece que temos alguns links quebrados.",
      ],
      back: "Voltar",
      home: "Leve-me para casa",
    },
    blog: {
      article: "Artigos",
      articleList: "Lista de Artigos",
      category: "Categorias",
      tag: "Tags",
      timeline: "Linha do Tempo",
      timelineText: "Ontem, de novo!",
      allText: "Todos",
      intro: "Intro Pessoal",
      star: "Estrela",
      slides: "Slides",
      encrypt: "Encriptado",
    },
  },
};
