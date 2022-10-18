import { HeadConfig } from 'vuepress'

const head: HeadConfig[] = [
    [
        "meta",
        {
            name: "viewport",
            content:
                "width=device-width,width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        }
    ],
    ['link', {rel: 'icon', href: '/icons/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
]

export { head }
