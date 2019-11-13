---
icon: github
---

# GitHub OAuth App

> Vssue can also work with self-hosted GitHub Enterprise Server. Set the `baseURL` options to your Github URL. See [Options Reference - baseURL](../options/README.md#baseurl)

> GitHub requires `clientSecret` because [GitHub does not support implicit grant type](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)
> ![Set up OAuth App - Github 00](/assets/img/oauth-app-github-00.png)

## Create a new OAuth App

- Go to [Settings - Developer Settings - OAuth Apps](https://github.com/settings/developers)
- Click [New OAuth App](https://github.com/settings/applications/new)

->![Set up OAuth App - Github 01](/assets/img/oauth-app-github-01.png)<-
->![Set up OAuth App - Github 02](/assets/img/oauth-app-github-02.png)<-
->![Set up OAuth App - Github 03](/assets/img/oauth-app-github-03.png)<-

- Set the `Homepage URL` and `Authorization callback URL` to your website URL (Here we take `localhost:8080` for example)

->![Set up OAuth App - Github 04](/assets/img/oauth-app-github-04.png)<-

## Get the Client ID and Secret

Then you've created a new OAuth App, and here is your `Client ID` and `Client Secret`.

->![Set up OAuth App - Github 05](/assets/img/oauth-app-github-05.png)<-

## Config and start your Vssue

Copy the `Client ID` and `Client Secret`, and set `owner` and `repo`.

> The URL pattern of github repo is `https://github.com/${owner}/${repo}`

Here we take `https://github.com/meteorlxy/vssue-demo` for example, and set the `title` of issue to `Vssue Demo`.

Then run `anywhere -h localhost 8080` to serve the `index.html` on `localhost:8080`.

->![Set up OAuth App - Github 06](/assets/img/oauth-app-github-06.png)<-

## Try out Vssue locally

Vssue has already run here. Click `Login` to login with github account.

->![Set up OAuth App - Github 07](/assets/img/oauth-app-github-07.png)<-

Redirect to Github Authorization page. Click `Authorize ${your account}` to login.

->![Set up OAuth App - Github 08](/assets/img/oauth-app-github-08.png)<-

Leave a comment on this page ~

->![Set up OAuth App - Github 09](/assets/img/oauth-app-github-09.png)<-

->![Set up OAuth App - Github 10](/assets/img/oauth-app-github-10.png)<-

::: tip
You can go to the repo [meteorlxy/vssue-demo](https://github.com/meteorlxy/vssue-demo) to get the demo code. Check the [#1 issue](https://github.com/meteorlxy/vssue-demo/issues/1) of that repo to see what happened.
:::
