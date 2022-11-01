---
title: Twikoo
icon: comment
---

一个简洁、安全、免费的静态网站评论系统，基于 [腾讯云开发](https://curl.qcloud.com/KnnJtUom)。

<!-- more -->

## 快速上手

部署共有四种方式。

| 部署方式                    | 描述                                                                                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [一键部署](#一键部署)       | \[不建议\] 虽然方便，但是仅支持按量计费环境——也就是说，**一键部署的环境，当免费资源用尽后，将会产生费用**。且按量计费环境无法切换为包年包月环境。免费额度数据库读操作数只有 500 次 / 天，**无法支撑 Twikoo 的运行需求**。 |
| [手动部署](#手动部署)       | \[建议\] 手动部署到腾讯云云开发环境，在中国大陆访问速度较快。由于基础版 1 已从 0 元涨价至 6.9 元 / 月，需要付费购买环境才能部署。                                                                                         |
| [命令行部署](#命令行部署)   | \[不建议\] 仅针对有 Node.js 经验的开发者。                                                                                                                                                                                |
| [Vercel 部署](#vercel-部署) | \[建议\] 适用于想要免费部署的用户，在中国大陆访问速度较慢。                                                                                                                                                               |

### 一键部署

1. 点击以下按钮将 Twikoo 一键部署到云开发

   [![部署到云开发](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fimaegoo%2Ftwikoo&branch=dev)

1. 进入[环境 - 登录授权](https://console.cloud.tencent.com/tcb/env/login)，启用“匿名登录”
1. 进入[环境 - 安全配置](https://console.cloud.tencent.com/tcb/env/safety)，将网站域名添加到“WEB 安全域名”

### 手动部署

如果你打算部署到一个现有的云开发环境，请直接从第 3 步开始。

1. 进入[云开发 CloudBase](https://curl.qcloud.com/KnnJtUom)活动页面，滚动到“新用户专享”部分，选择适合的套餐，点击“立即购买”，按提示创建好环境。

   ::: tip 提示

   - 推荐创建上海环境。如选择广州环境，需要在 `twikoo.init()` 时额外指定环境 `region: "ap-guangzhou"`
   - 环境名称自由填写
   - 推荐选择计费方式`包年包月`，套餐版本`基础版 1`，超出免费额度不会收费
   - 如果提示选择“应用模板”，请选择“空模板”

   :::

1. 进入[云开发控制台](https://console.cloud.tencent.com/tcb/)<br>
1. 进入[环境-登录授权](https://console.cloud.tencent.com/tcb/env/login)，启用“匿名登录”
1. 进入[环境-安全配置](https://console.cloud.tencent.com/tcb/env/safety)，将网站域名添加到“WEB 安全域名”
1. 进入[环境-云函数](https://console.cloud.tencent.com/tcb/scf/index)，点击“新建云函数”
1. 函数名称请填写 `twikoo`，创建方式请选择 `空白函数`，运行环境请选择 `Nodejs 10.15`，函数内存请选择 `128MB`，点击“下一步”
1. 清空输入框中的示例代码，复制以下代码、粘贴到“函数代码”输入框中，点击“确定”

   ```js
   exports.main = require("twikoo-func").main;
   ```

1. 创建完成后，点击“twikoo”进入云函数详情页，进入“函数代码”标签，点击“文件 - 新建文件”，输入 `package.json`，回车
1. 复制以下代码、粘贴到代码框中，点击“保存并安装依赖”

   ```json
   { "dependencies": { "twikoo-func": "1.5.0" } }
   ```

### 命令行部署

::: warning 注意

- 请确保你已经安装了 [Node.js](https://nodejs.org/en/download/)
- 请将命令、代码中“你的环境 ID”替换为你自己的环境 ID
- 第 7 步会弹出浏览器要求授权，需在有图形界面的系统下进行

:::

如果你打算部署到一个现有的云开发环境，请直接从第 3 步开始。

1. 进入[云开发 CloudBase](https://curl.qcloud.com/KnnJtUom)活动页面，滚动到“新用户专享”部分，选择适合的套餐 (一般 0 元套餐即可) ，点击“立即购买”，按提示创建好环境。
1. 进入[云开发控制台](https://console.cloud.tencent.com/tcb/)
1. 进入[环境 - 登录授权](https://console.cloud.tencent.com/tcb/env/login)，启用“匿名登录”
1. 进入[环境 - 安全配置](https://console.cloud.tencent.com/tcb/env/safety)，将网站域名添加到“WEB 安全域名”
1. 克隆本仓库

   ```sh
   git clone https://github.com/imaegoo/twikoo.git # 或 git clone https://e.coding.net/imaegoo/twikoo/twikoo.git
   cd twikoo
   ```

   > 如果你没有安装 Git，也可以从 [Release](https://github.com/imaegoo/twikoo/releases) 页面下载最新的 Source code
   >
   > 如果你所在的地区访问 GitHub 速度慢，也可以尝试另一个仓库地址: [https://imaegoo.coding.net/public/twikoo/twikoo/git](https://imaegoo.coding.net/public/twikoo/twikoo/git)

1. 安装依赖项

   ```sh
   npm install -g yarn # 如 yarn 已安装，可以跳过此步
   yarn install
   ```

1. 授权云开发环境 (此命令会弹出浏览器要求授权，需在有图形界面的系统下进行)

   ```sh
   yarn run login
   ```

1. 自动部署

   ```sh
   yarn deploy -e 你的环境id
   ```

### Vercel 部署

[查看视频教程](https://www.bilibili.com/video/BV1Fh411e7ZH)

1. 申请 [MongoDB](https://www.mongodb.com/cloud/atlas/register) 账号
1. 创建免费 MongoDB 数据库，区域推荐选择 `AWS / N. Virginia (us-east-1)`
1. 在 Clusters 页面点击 CONNECT，按步骤设置允许所有 IP 地址的连接 ([为什么？](https://vercel.com/support/articles/how-to-allowlist-deployment-ip-address)) ，创建数据库用户，并记录数据库连接字符串，请将连接字符串中的 `<password>` 修改为数据库密码
1. 申请 [Vercel](https://vercel.com/signup) 账号
1. 点击以下按钮将 Twikoo 一键部署到 Vercel

   [![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/dev/src/vercel-min)

1. 进入 Settings - Environment Variables，添加环境变量 `MONGODB_URI`，值为第 3 步的数据库连接字符串
1. 进入 Overview，点击 Domains 下方的链接，如果环境配置正确，可以看到 “Twikoo 云函数运行正常” 的提示
1. Vercel Domains (包含 `https://` 前缀，例如 `https://xxx.vercel.app`) 即为你的环境 ID
