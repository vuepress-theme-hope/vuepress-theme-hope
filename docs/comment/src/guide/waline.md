---
title: Waline
icon: waline
---

Welcome to Waline. In just a few steps, you can enable Waline to provide comments and pageviews on your site.

<!-- more -->

## LeanCloud settings (Database)

1. [sign in](https://console.leancloud.app/login.html#/signin) or [sign up](https://console.leancloud.app/login.html#/signup) LeanCloud and enter [Console](https://console.leancloud.app/applist.html#/apps).

1. Click [Create app](https://console.leancloud.app/applist.html#/newapp) button to create a new app and enter a name you like:

   ![Create App](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

1. Enter the app, then select `Settings` > `App Keys` at the left bottom corner. You will see `APP ID`, `APP Key` and `Master Key` of your app. We will use them later

   ![ID and Key](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)

## Deploy to Vercel (Server)

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/walinejs/waline/tree/main/example)

1. Click the blue button above, it will redirect you to vercel to deploy with waline template.

1. If you haven’t logined, we recommend you to sign in with GitHub.

1. Input your Vercel project name then click `Continue`.

   ![Create project](https://p2.ssl.qhimg.com/t018cd2a91a8896a555.png)

1. Input your new GitHub repo name then click `Continue`. So that repo will be created and initiallized automatically base on waline example template by Vercel.

   ![Select repo](https://p4.ssl.qhimg.com/t01bb30e74f85ddf5b3.png)

1. After repo is initialized, enter `Environment Variables` and set `LEAN_ID`, `LEAN_KEY` and `LEAN_MASTER_KEY`. The variables’ value should be the ones you got in the previous step. `APP ID` is the value of `LEAN_ID`, and `APP Key` to `LEAN_KEY`, `Master Key` to `LEAN_MASTER_KEY`.

   ![Set environment variables](https://p5.ssl.qhimg.com/t019aec05e3e5fea5cc.png)

1. Click `Deploy` button, and after one minute or two, vercel should finish the deployment. Click `Visit` button to visit the site. This link is your server address.

   ![Deploy](https://p0.ssl.qhimg.com/t0142b58c2e8f886b28.png)

## Client

### Using plugin

Set `type: 'waline'` in the plugin options, and set `serverURL` as the link obtained in the previous step.

Then, place the `<Comment>` component at a suitable location in your website (usually at the bottom of the page), you will be able to see the comment box.

### Using theme

In `themeConfig.comment`, set `type: 'waline'` and `serverURL` as the link obtained in the previous step.

Now Waline will run successfully on your site. :tada:

::: tip

You can also pass in other options supported by Waline (except `el`).

For details, see [Waline Config](../config/waline.md)

:::

## Comment management (Management)

1. After the deployment is complete, please visit `<serverURL>/ui/register` to register. The first person to register will be set as an administrator.
1. After you log in as administrator, you can see the comment management interface. You can edit, mark or delete comments here.
1. Users can also register their account in the comment box, and they will be redirected to their profile page after logging in.
