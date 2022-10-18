const sidebar =
    {
        "/guide/":
            [
                {
                    text: "指南",
                    prefix: "/guide/",
                    icon: "repo",
                    children: [
                        { text: "安装与使用", link: "index/",  icon: "flower" },
                        { text: "配置项", link: "option/", icon: "style"  },
                    ]
                },
            ],
        "/dev-doc/":
            [
                {
                    text: "开发文档",
                    prefix: "/dev-doc/",
                    icon: "back-stage",
                    children: [
                        { text: "开发简介", link: "index/" , icon: "template"},
                        { text: "第一步-导出", link: "export/" , icon: "editor"},
                    ]
                }
            ]
    }

const twSidebar =
  {
    "/zh-TW/guide/":
      [
        {
          text: "指南繁中",
          prefix: "/zh-TW/guide/",
          icon: "repo",
          children: [
            { text: "安装与使用繁中", link: "index/",  icon: "flower" },
            { text: "配置项繁中", link: "option/", icon: "style"  },
          ]
        },
      ],
    "/zh-TW/dev-doc/":
      [
        {
          text: "开发文档繁中",
          prefix: "/zh-TW/dev-doc/",
          icon: "back-stage",
          children: [
            { text: "开发简介繁中", link: "index/" , icon: "template"},
            { text: "第一步-导出繁中", link: "export/" , icon: "editor"},
          ]
        }
      ]
  }
export { sidebar,twSidebar }
