import type { ThemeLocaleData } from "../../shared/index.js";

export const viLocale: ThemeLocaleData = {
  lang: "vi-VN",

  navbarLocales: {
    langName: "Tiếng Việt",
    selectLangAriaLabel: "Chọn ngôn ngữ",
  },

  metaLocales: {
    author: "Người viết",
    date: "Ngày viết",
    origin: "Nguồn",
    views: "Lượt xem trang",
    category: "Danh mục",
    tag: "Thẻ",
    readingTime: "Thời gian đọc",
    words: "Từ",
    toc: "Trong trang này",
    prev: "Trước",
    next: "Tiếp",
    contributors: "Người đóng góp",
    editLink: "Chỉnh sửa trang này",
    print: "In",
  },

  blogLocales: {
    article: "Bài viết",
    articleList: "Danh sách Bài viết",
    category: "Danh mục",
    tag: "Thẻ",
    timeline: "Dòng thời gian",
    timelineTitle: "Ngày hôm qua một lần nữa!",
    all: "Tất cả",
    intro: "Giới thiệu cá nhân",
    star: "Ngôi sao",
    empty: "$text trống",
  },

  paginationLocales: {
    prev: "Bài trước",
    next: "Bài kế",
    navigate: "Đi đến",
    action: "Đi",
    errorText: "Xin hãy nhập 1 số từ 1 đến $page !",
  },

  outlookLocales: {
    themeColor: "Màu nền",
    darkmode: "Chế độ giao diện",
    fullscreen: "Toàn màn hình",
  },

  encryptLocales: {
    iconLabel: "Trang đã được mã hóa",
    placeholder: "Nhập mật khẩu",
    remember: "Ghi nhớ mật khẩu",
    errorHint: "Vui lòng nhập đúng mật khẩu",
  },

  routerLocales: {
    skipToContent: "Bỏ qua nội dung chính",
    notFoundTitle: "Trang không tìm thấy",
    notFoundMsg: [
      "Ở đây chẳng có gì cả.",
      "Sao chúng ta lại đến đây?",
      "Đây là lỗi bốn-không-bốn",
      "Có vẻ chúng ta có vài broken link.",
    ],
    back: "Quay lại",
    home: "Trang chủ",
  },
};
