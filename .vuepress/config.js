const CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
    "title": "花有重开日🌸人无再少年",//博客标题
    "description": "徐乐乐的碎碎念",//博客描述
    "dest": "public",//博客部署时输出的文件夹
    "base": "/xuaiyu/",
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/202108061505626.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],//favicon图标设置
    "theme": "reco",//vuepress挂载的主题
    "themeConfig": {
        "nav": [
            {
                "text": "首页 ⛺",
                "link": "/"
            },
            {
                "text": "分类 👨‍💻",
                "link": "/categories/"
            },
            {
                "text": "标签 🏷",
                "link": "/tag/"
            },
            {
                "text": "照片墙 📷",
                "link": "/photos/"
            },
            {
                "text": "时间轴 ⌛",
                "link": "/timeline/"
            },
            {
                "text": "书签 🔖",
                "items": [
                    {
                        "text": "文档 📄", "items": [
                            {
                                "text": "VuePress",
                                "link": "https://v1.vuepress.vuejs.org/zh/guide/",
                                "target": "_blank"
                            },
                            {
                                "text": "vuepress-theme-reco",
                                "link": "https://vuepress-reco-doc.vercel.app/views/1.x/",
                                "target": "_blank"
                            },
                            {
                                "text": "Markdown 基本语法",
                                "link": "https://www.jianshu.com/p/191d1e21f7ed",
                                "target": "_blank"
                            },
                            {
                                "text": "Markdown 技术文档写作规范",
                                "link": "https://www.jianshu.com/p/3b638180e42c",
                                "target": "_blank"
                            }
                        ]
                    },
                    {
                        "text": "工具 🧰", "items": [
                            {
                                "text": "json-generator",
                                "link": "https://www.json-generator.com/",
                                "target": "_blank"
                            },
                            {
                                "text": "Emoji 大全",
                                "link": "https://www.emojiall.com/zh-hans",
                                "target": "_blank"
                            },
                            {
                                "text": "免费、无版权高清图片",
                                "link": "https://unsplash.com/",
                                "target": "_blank"
                            },
                            {
                                "text": "简洁的 Mac 图床客户端 uPic",
                                "link": "https://blog.svend.cc/upic/",
                                "target": "_blank"
                            }


                        ]
                    },
                    {
                        "text": "接口 🤖", "items": [
                            {
                                "text": "免费api接口",
                                "link": "https://api.sumt.cn/",
                                "target": "_blank"
                            },
                            {
                                "text": "一言语句接口",
                                "link": "https://developer.hitokoto.cn/sentence/  ",
                                "target": "_blank"
                            },


                        ]
                    },
                ]
            },
        ],
        "subSidebar": "auto", //全局打开自动子侧边栏功能
        // "activeHeaderLinks": false,
        "type": "blog", //'blog' 'HomeBlog' 'Home'
        // 博客设置
        "blogConfig": {
            "socialLinks": [
                {
                    "icon": "reco-github",
                    "link": "https://github.com/",
                },
                {
                    "icon": "reco-qq",
                    "link": "http://wpa.qq.com/msgrd?v=3&uin=945912169&site=qq&menu=yes",
                },
                {
                    "icon": "reco-mail",
                    "link": "Mailto:945912169@qq.com",
                },
                {
                    "icon": "reco-weibo",
                    "link": "https://weibo.com/u/5063721546",
                },
            ]
        },
        "logo": "https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/gif2.gif",//博客自定义LOGO
        // 搜索设置
        "search": true,
        "searchMaxSuggestions": 10,//搜索框显示的搜索结果数量
        "lastUpdated": true, // string | boolean 最后更新时间 基于git
        "author": "徐乐乐",// 作者名字
        "authorAvatar": "https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/icon/authorAvatar.gif",// 作者头像
        // 备案
        "record": "豫ICP备2021010779号-1",
        "recordLink": "https://beian.miit.gov.cn/#/Integrated/recordQuery",
        "cyberSecurityRecord": "豫公网安备41018302000309号",
        "cyberSecurityLink": "http://www.beian.gov.cn/portal/index.do",
        "startYear": "2021",// 项目开始时间

        //评论配置项  https://valine.js.org/configuration.html
        "valineConfig": {
            // "appId": "QPhiwWAdU39MGOgqDWvKFtbt-MdYXbMMI",// your appId
            // "appKey": "6vqIjTp6jSMJjQ4RRSJbUDah", // your appKey
            // "placeholder": "快来评论啊",
            // "enableQQ": true
            "showComment": false
        },


        // 项目的默认加密方式，只是将加密页定位到实际内容上方，所以这种加密功能本身是没有什么作用的。
        // 如果需要绝对的加密，需要设置 absoluteEncryption: true
        // "keyPage": {
        //     "keys": ['202cb962ac59075b964b07152d234b70'], // 1.3.0 版本后需要设置为密文
        //     "color": '#42b983', // 登录页动画球的颜色
        //     "lineColor": '#42b983', // 登录页动画线的颜色
        //     "absoluteEncryption": true //绝对加密 不显示
        // },
    },
    "locales": {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 "/" 作为其路径。
        "/": {
            "lang": "zh-CN", // 将会被设置为 <html> 的 lang 属性
        }
    },
    "markdown": {
        "lineNumbers": false //   是否在每个代码块的左侧显示行号。
    },
    "configureWebpack": {

        "plugins": [new CompressionPlugin({

            "filename": "[path].gz", //编译后的文件名

            "algorithm": "gzip",

            "test": /\.js$|\.css$|\.html$/,//需要编译的文件

            "threshold": 10240,//需要编译的文件大小

            "minRatio": 0.8,//压缩比

            "deleteOriginalAssets": false,//编译时是否删除源文件

        })],

    },
    // "plugins": [
    //     //这是为 vuepress 自动生成侧边栏的插件  npm i vuepress-plugin-auto-sidebar -D
    //     //https://shanyuhai123.github.io/vuepress-plugin-auto-sidebar/zh/features/plugin-options.html
    //     // ["vuepress-plugin-auto-sidebar",
    //     //     {
    //     //         "title": {
    //     //             "map": {
    //     //                 "/docs/blog/course/": "🎉 技术教程 🎉",
    //     //                 "/docs/blog/vue3/": "🎉 vue3相关 🎉",
    //     //                 "/docs/travels/2020/": "💋 于乖与我 2020 💌",
    //     //             }
    //     //         },
    //     //     }
    //     // ],
    // ]
}