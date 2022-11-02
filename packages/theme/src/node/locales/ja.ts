import type { HopeThemeLocaleData } from "../../shared/index.js";

export const jaLocale: HopeThemeLocaleData = {
  lang: "ja-JP",

  navbarLocales: {
    langName: "日本語",
    selectLangAriaLabel: "言語の選択",
  },

  metaLocales: {
    author: "著者",
    date: "執筆日",
    origin: "オリジナル",
    views: "来場者数",
    category: "カテゴリ",
    tag: "タグ",
    readingTime: "読書時間",
    words: "単語数",
    toc: "このページの内容",
    prev: "前のページへ",
    next: "次のページ",
    lastUpdated: "最終更新日",
    contributors: "投稿者",
    editLink: "このページを編集",
  },

  blogLocales: {
    article: "記事",
    articleList: "記事一覧",
    category: "カテゴリ",
    tag: "タグ",
    timeline: "タイムライン",
    timelineTitle: "昨日もう一度!",
    all: "すべて",
    intro: "自己紹介",
    star: "コレクション",
    slides: "スライド",
    encrypt: "暗号化",
  },

  paginationLocales: {
    prev: "前のページへ",
    next: "次のページ",
    navigate: "ジャンプする",
    action: "行く",
    errorText: "1 から $page までの数値を入力してください!",
  },

  outlookLocales: {
    themeColor: "テーマの色",
    darkmode: "テーマモード",
    fullscreen: "全画面",
  },

  encryptLocales: {
    iconLabel: "記事は暗号化されています",
    placeholder: "パスワードの入力",
    remember: "パスワードを記憶する",
    errorHint: "正しいパスワードを入力してください!",
  },

  routeLocales: {
    notFoundMsg: [
      "ここには何もありません。",
      "どうやってここにたどり着いたのか?",
      "それは404です",
      "私たちはいくつかの壊れたリンクを持っているように見えます。",
    ],
    back: "前のページへ戻る",
    home: "メインページに戻る",
    openInNewWindow: "新しいウィンドウで開く",
  },
};
