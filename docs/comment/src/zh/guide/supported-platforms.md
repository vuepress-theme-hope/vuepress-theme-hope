---
icon: support
---

# 支持的代码托管平台

## GitHub

指南: [创建 GitHub OAuth App](./github.md)

### GitHub REST API V3

- Vssue API 包: [@vssue/api-github-v3](https://www.npmjs.com/package/@vssue/api-github-v3)
- 特点 / 缺点:
  - 需要设置 [clientSecret](../options/README.md#clientsecret)
  - 评论无法排序
  - 评论可以编辑
  - 评论可以删除
  - 可以不登录浏览评论，但 API 有调用频率限制
- 开发者参考: [官方文档](https://developer.github.com/v3)

### GitHub GraphQL API V4

- Vssue API 包: [@vssue/api-github-v4](https://www.npmjs.com/package/@vssue/api-github-v4)
- 特点 / 缺点:
  - 需要设置 [clientSecret](../options/README.md#clientsecret)
  - 评论可以排序
  - 评论可以编辑
  - 评论可以删除
  - 要求登陆后才能浏览评论
- 开发者参考: [官方文档](https://developer.github.com/v4)

## GitLab

指南: [创建 GitLab Application](./gitlab.md)

### Gitlab API V4 (Gitlab v11.0+)

- Vssue API 包: [@vssue/api-gitlab-v4](https://www.npmjs.com/package/@vssue/api-gitlab-v4)
- 特点 / 缺点:
  - 评论可以排序
  - 评论可以编辑
  - 评论可以删除
  - 要求登陆后才能浏览评论
- 开发者参考: [官方文档](https://docs.gitlab.com/ce/api)

## Bitbucket

指南: [创建 Bitbucket OAuth Consumer](./bitbucket.md)

### Bitbucket API V2

- Vssue API 包 [@vssue/api-bitbucket-v2](https://www.npmjs.com/package/@vssue/api-bitbucket-v2)
- 特点 / 缺点:
  - 评论可以排序
  - 评论可以编辑
  - 评论可以删除
  - 可以不登录浏览评论
  - 不能对评论做出 emoji 响应 (喜欢、点赞、踩 等)
- 开发者参考: [官方文档](https://developer.atlassian.com/bitbucket/api/2/reference)

## Gitee

指南: [创建 Gitee 第三方应用](./gitee.md)

### Gitee API V5

- Vssue API 包: [@vssue/api-gitee-v5](https://www.npmjs.com/package/@vssue/api-gitee-v5)
- 特点 / 缺点:
  - 需要设置 [clientSecret](../options/README.md#clientsecret)
  - 评论无法排序
  - 评论可以编辑
  - 评论可以删除
  - 可以不登录浏览评论，但 API 有调用频率限制
  - 不能对评论做出 emoji 响应 (喜欢、点赞、踩 等)
- 开发者参考: [官方文档](https://gitee.com/api/v5/swagger)
