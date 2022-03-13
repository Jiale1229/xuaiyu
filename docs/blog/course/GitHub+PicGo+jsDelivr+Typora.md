---
title: GitHub+PicGo+jsDelivr+Typora
cover: https://api.btstu.cn/sjbz/api.php?lx=suiji&format=images
date: '2021-08-05'
categories:
 - 技术教程
tags:
 - Markdown
next: ./Markdown

---

::: tip 敲黑板
Markdown文档写作利器套装<br>免费cdn加速图床<br>丝滑到底，所有截图复制进来后，瞬间上传成功并且将图片链接替换为自定义的cdn域名
:::

<!-- more -->


## 前期准备

- **[Github账号：全球最大的代码仓库托管平台，缺陷每个仓库1G容量](https://github.com/)**
- **[PicGo：一个用于快速上传图片并获取图片 URL 链接的工具](https://molunerfinn.com/PicGo/)**
- **[Typora：markdown编辑器](https://www.typora.io/)**

## 创建GitHub仓库

#### **新建一个用来放图片的库，在github首页右上角点击 `+`  ，选择 `new reporsitory`**

![image](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/image.jpg)

#### **创建完成后进入，选择右上角的 `Settings`**

![image](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108051642394.jpg)

#### **在最下面选择 `Developer setting`** 

![image (1)](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108051649620.jpg)

#### **选择  `Personal access tokens` ，点击 `Generate new token`**

![image](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108051731129.jpg)

#### **填写内容**

![image (1)](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108051744416.jpg)

#### **完成创建跳转到生成好的token令牌界面 此处 token只出现一次，一定要另外保存 ，在配置picgo时也需要填入token**

![image](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108051749702.jpg)

## PicGo配置

**打开详细窗口**

![image (1)](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108051819183.jpg)

```yaml
自定义加速域名
https://cdn.jsdelivr.net/gh/GitHub用户名/仓库名@master
```

## 配置Typora集成PicGo

![image-20210806111836657](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108061126676.png)

## 大功告成，尽享丝滑

![image-20210806112422408](https://cdn.jsdelivr.net/gh/Jiale1229/PicGoCdn@master/images/picgo/202108061126089.png)
