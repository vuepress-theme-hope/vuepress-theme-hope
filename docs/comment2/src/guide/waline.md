---
title: Waline
icon: waline
---

Welcome to Waline. In just a few steps, you can enable Waline to provide comments and page views on your site.

<!-- more -->

## LeanCloud Settings (Database)

1. [sign in](https://console.leancloud.app/login) or [sign up](https://console.leancloud.app/register) LeanCloud and enter [Console](https://console.leancloud.app/apps).

1. Click [Create app](https://console.leancloud.app/apps) button to create a new app and enter a name you like:

   ![Create App](./assets/leancloud-app-1.jpg)

1. Enter the app, then select `Settings` > `App Keys` at the left bottom corner. You will see `APP ID`, `APP Key` and `Master Key` of your app. We will use them later

   ![ID and Key](./assets/leancloud-app-2.jpg)

## Deploy to Vercel (Server)

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

1. Click the blue button above, it will redirect you to vercel to deploy with waline template.

   ::: note

   If you haven’t logged in, we recommend you to sign in with GitHub.

   :::

1. Input your Vercel project name then click `Create`.

   ![skip team](/assets/image/vercel-2.png)

1. Repo which named you input before will be created and initialized automatically base on waline example template by Vercel.

   ![deploy](/assets/image/vercel-3.png)

   After one minute or two, vercel should finish the deployment. Click `Go to Dashboard` button to redirect to your application dashboard.

   ![deploy](/assets/image/vercel-4.png)

1. Click `Settings` menu on the top, and `Environment Variables` button on the side to go to environment variables setting page. Then set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY`. The variables’ value should be the ones you got in the previous step. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

   ![set environment variables](/assets/image/vercel-5.png)

1. To let your environment variables setting active, you need redeploy your application. Click `Deployments` menu on the top and find the latest deployment at the top of list, click `Redeploy` button in the right dropdown menu.

   ![redeploy](/assets/image/vercel-6.png)

1. If everything is ok, vercel will redirect to `Overview` page to start redeployment. Wait a moment the `STATUS` will change to `Ready`. Now you can click `Visit` to visit the site. This link is your server address.

   ![redeploy success](/assets/image/vercel-7.png)

## Assign Domain (Optional)

1. Click `Settings` - `Domains` to go to domain setting page.

1. Input domain you want to assign and click `Add` button.

   ![Add domain](/assets/image/vercel-8.png)

1. Add a new `CNAME` record in your domain service server.

   | Type  | Name    | Value                |
   | ----- | ------- | -------------------- |
   | CNAME | example | cname.vercel-dns.com |

1. You can use your own domain to visit waline comment system after go into effect. :tada:

   - serverURL：example.your-domain.com
   - admin panel：example.your-domain.com/ui

   ![success](/assets/image/vercel-9.png)

## Client

### Using plugin

Set `provider: "waline"` in the plugin options, and set `serverURL` as the link obtained in the previous step.

Then, place the `<CommentService>` component at a suitable location in your site (usually at the bottom of the page), you will be able to see the comment box.

::: tip

You can also pass in other options supported by Waline (except `el`).

For details, see [Waline Config](../config/waline.md)

:::

## Comment Management (Management)

1. After the deployment is complete, please visit `<serverURL>/ui/register` to register. The first person to register will be set as an administrator.
1. After you log in as administrator, you can see the comment management interface. You can edit, mark or delete comments here.
1. Users can also register their account through comment box, and they will be redirected to their profile page after logging in.
