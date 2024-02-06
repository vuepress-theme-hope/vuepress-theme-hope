import type { ThemeLocaleData } from "../../shared/index.js";

export const koLocale: ThemeLocaleData = {
  lang: "ko-KR",

  navbarLocales: {
    langName: "한국어",
    selectLangAriaLabel: "언어 선택",
  },

  metaLocales: {
    author: "작성자",
    date: "작성일",
    origin: "원본",
    views: "조회수",
    category: "카테고리",
    tag: "태그",
    readingTime: "읽는 시간",
    words: "단어",
    toc: "이 페이지에서",
    prev: "이전",
    next: "다음",
    lastUpdated: "마지막 수정",
    contributors: "기여자",
    editLink: "이 페이지 수정",
    print: "인쇄",
  },

  blogLocales: {
    article: "게시글",
    articleList: "글 목록",
    category: "카테고리",
    tag: "태그",
    timeline: "타임라인",
    timelineTitle: "어제 한 번 더!",
    all: "모두",
    intro: "프로필",
    star: "스타",
    empty: "$text가 비어있습니다.",
  },

  paginationLocales: {
    prev: "이전",
    next: "다음",
    navigate: "이동",
    action: "가기",
    errorText: "1에서 $page 사이의 숫자를 입력하세요!",
  },

  outlookLocales: {
    themeColor: "테마 색상",
    darkmode: "테마 모드",
    fullscreen: "전체 화면",
  },

  encryptLocales: {
    iconLabel: "페이지 암호화",
    placeholder: "비밀번호 입력",
    remember: "비밀번호 기억",
    errorHint: "정확한 비밀번호를 입력해주세요!",
  },

  routeLocales: {
    skipToContent: "본문으로 건너뛰기",
    notFoundTitle: "페이지를 찾을 수 없습니다.",
    notFoundMsg: [
      "여기에는 아무것도 없습니다.",
      "어떻게 여기까지 오셨나요?",
      "4-0-4 입니다.",
      "깨진 링크가 있는 것 같습니다.",
    ],
    back: "뒤로가기",
    home: "메인으로",
    openInNewWindow: "새 창에서 열기",
  },
};
