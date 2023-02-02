import { type ThemeLocaleData } from "../../shared/index.js";

export const koLocale: ThemeLocaleData = {
  lang: "ko-KR",

  navbarLocales: {
    langName: "한국어",
    selectLangAriaLabel: "언어 선택",
  },

  metaLocales: {
    author: "저자",
    date: "작성일",
    origin: "원본",
    views: "조회수",
    category: "카테고리",
    tag: "태그",
    readingTime: "분량",
    words: "단어",
    toc: "이 페이지에서",
    prev: "이전",
    next: "다음",
    lastUpdated: "마지막 업데이트",
    contributors: "기여자",
    editLink: "이 페이지 수정",
  },

  blogLocales: {
    article: "조항",
    articleList: "기사 목록",
    category: "범주",
    tag: "꼬리표",
    timeline: "타임라인",
    timelineTitle: "어제 한 번 더!",
    all: "모두",
    intro: "개인 소개",
    star: "별",
  },

  paginationLocales: {
    prev: "이전",
    next: "다음",
    navigate: "이동",
    action: "가다",
    errorText: "1에서 $page 사이의 숫자를 입력하세요!",
  },

  outlookLocales: {
    themeColor: "테마 색상",
    darkmode: "테마 모드",
    fullscreen: "전체 화면",
  },

  encryptLocales: {
    iconLabel: "페이지 암호화",
    placeholder: "암호를 입력",
    remember: "비밀번호 기억",
    errorHint: "정확한 비밀번호를 입력해주세요!",
  },

  routeLocales: {
    skipToContent: "본문으로 건너뛰기",
    notFoundTitle: "페이지를 찾을 수 없습니다.",
    notFoundMsg: [
      "여기에는 아무것도 없습니다.",
      "어떻게 여기까지 왔어?",
      "포-오-포입니다.",
      "깨진 링크가 있는 것 같습니다.",
    ],
    back: "돌아가기",
    home: "집에 데려다줘",
    openInNewWindow: "새 창에서 열기",
  },
};
