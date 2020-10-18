---
icon: support
---

# Supported Platforms

## GitHub

Guide: [Set up GitHub OAuth App](./github.md)

### GitHub REST API V3

- Vssue API package: [@vssue/api-github-v3](https://www.npmjs.com/package/@vssue/api-github-v3)
- Features or drawbacks:
  - [clientSecret](../options/README.md#clientsecret) is required
  - Comments not sortable
  - Comments editable
  - Comments deletable
  - Can view comments without login, but has API rate limitation
- Developer Reference: [Official Docs](https://developer.github.com/v3)

### GitHub GraphQL API V4

- Vssue API package: [@vssue/api-github-v4](https://www.npmjs.com/package/@vssue/api-github-v4)
- Features or drawbacks:
  - [clientSecret](../options/README.md#clientsecret) is required
  - Comments sortable
  - Comments editable
  - Comments deletable
  - Requires login to view comments
- Developer Reference: [Official Docs](https://developer.github.com/v4)

## GitLab

Guide: [Set up GitLab Application](./gitlab.md)

### Gitlab API V4 (Gitlab v11.0+)

- Vssue API package: [@vssue/api-gitlab-v4](https://www.npmjs.com/package/@vssue/api-gitlab-v4)
- Features or drawbacks:
  - Comments sortable
  - Comments editable
  - Comments deletable
  - Requires login to view comments
- Developer Reference: [Official Docs](https://docs.gitlab.com/ce/api)

## Bitbucket

Guide: [Set up Bitbucket OAuth Consumer](./bitbucket.md)

### Bitbucket API V2

- Vssue API package: [@vssue/api-bitbucket-v2](https://www.npmjs.com/package/@vssue/api-bitbucket-v2)
- Features or drawbacks:
  - Comments sortable
  - Comments editable
  - Comments deletable
  - Can view comments without login
  - Cannot post emoji reactions to comments (heart, like, unlike, etc.)
- Developer Reference: [Official Docs](https://developer.atlassian.com/bitbucket/api/2/reference)

## Gitee

Guide: [Set up Gitee OAuth Application](./gitee.md)

### Gitee API V5

- Vssue API package: [@vssue/api-gitee-v5](https://www.npmjs.com/package/@vssue/api-gitee-v5)
- Features or drawbacks:
  - [clientSecret](../options/README.md#clientsecret) is required
  - Comments not sortable
  - Comments editable
  - Comments deletable
  - Can view comments without login
  - Cannot post emoji reactions to comments (heart, like, unlike, etc.)
- Developer Reference: [Official Docs](https://gitee.com/api/v5/swagger)
