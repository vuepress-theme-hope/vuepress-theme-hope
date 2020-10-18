---
icon: bitbucket
---

# BitBucket OAuth Consumer

## Create a new OAuth Consumer

- Go to **Bitbucket settings - OAuth**
- Click **Add consumer**

->![Set up OAuth App - Bitbucket 01](/img/oauth-app-bitbucket-01.png)<-
->![Set up OAuth App - Bitbucket 02](/img/oauth-app-bitbucket-02.png)<-
->![Set up OAuth App - Bitbucket 03](/img/oauth-app-bitbucket-03.png)<-

- Set the `Callback URL` to your site URL (Here we take `localhost:8080` for example)
- Unselect `This is a private consumer`
- Select `Account - Read` and `Issues - Write` permissions

->![Set up OAuth App - Bitbucket 04](/img/oauth-app-bitbucket-04.png)<-
->![Set up OAuth App - Bitbucket 05](/img/oauth-app-bitbucket-05.png)<-

## Get the Client ID

Then you’ve created a new OAuth Consumer, and here is your **Key** (`Client ID`).

->![Set up OAuth App - Bitbucket 06](/img/oauth-app-bitbucket-06.png)<-

## Config and start your Vssue

Copy the `Client ID`, and set `owner` and `repo`.

> The URL pattern of bitbucket repo is `https://bitbucket.org/${owner}/${repo}`

Here we take `https://bitbucket.org/meteorlxy/vssue-demo` for example, and set the `title` of issue to `Vssue Demo`.

Then run `anywhere -h localhost 8080` to serve the `index.html` on `localhost:8080`.

->![Set up OAuth App - Bitbucket 07](/img/oauth-app-bitbucket-07.png)<-

## Try out Vssue locally

Vssue has already run here. Click `Login` to login with Bitbucket account.

->![Set up OAuth App - Bitbucket 08](/img/oauth-app-bitbucket-08.png)<-

Redirect to Bitbucket Authorization page. Click `Grant access` to login.

->![Set up OAuth App - Bitbucket 09](/img/oauth-app-bitbucket-09.png)<-
->![Set up OAuth App - Bitbucket 10](/img/oauth-app-bitbucket-10.png)<-

Oops, failed to load comments. Your repository should enable the **Issue Tracker** to make Vssue works.

->![Set up OAuth App - Bitbucket 11](/img/oauth-app-bitbucket-11.png)<-

Leave a comment on this page ~

->![Set up OAuth App - Bitbucket 12](/img/oauth-app-bitbucket-12.png)<-
->![Set up OAuth App - Bitbucket 13](/img/oauth-app-bitbucket-13.png)<-

::: tip
You can go to the repository [meteorlxy/vssue-demo](https://bitbucket.org/meteorlxy/vssue-demo) to get the demo code. Check the [#1 issue](https://bitbucket.org/meteorlxy/vssue-demo/issues/1) of that repository to see what happened.
:::
