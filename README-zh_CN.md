## picgo-plugin-blog-uploader

[![下载](https://img.shields.io/npm/dm/picgo-plugin-blog-uploader.svg?color=brightgreen)](https://npmcharts.com/compare/picgo-plugin-blog-uploader?minimal=true)
[![版本](https://img.shields.io/npm/v/picgo-plugin-blog-uploader.svg?color=brightgreen)](https://www.npmjs.com/package/picgo-plugin-blog-uploader)
[![许可](https://img.shields.io/badge/license-mit-brightgreen.svg)](https://github.com/chengww5217/picgo-plugin-blog-uploader/blob/master/License)

[English](./README.md) | 简体中文

为 [PicGo](https://github.com/Molunerfinn/PicGo) 开发的一款插件，新增了[掘金](https://juejin.im)、[简书](https://www.jianshu.com/)和[语雀](https://www.yuque.com)图床。

### 安装

- 在线安装

    打开 [PicGo](https://github.com/Molunerfinn/PicGo) 详细窗口，选择**插件设置**，搜索**blog-uploader**安装，然后重启应用即可。

- 离线安装

    克隆该项目，复制项目到 以下目录：
    - Windows: `%APPDATA%\picgo\`
    - Linux: `$XDG_CONFIG_HOME/picgo/` or `~/.config/picgo/`
    - macOS: `~/Library/Application\ Support/picgo/`

    切换到新目录执行 `npm install ./picgo-plugin-blog-uploader`，然后重启应用即可。

### Cookie

掘金不需要 cookie，其他博客需要 cookie。
~~且 CSDN 博客上传后的图片有跨域限制，其禁止非 CSDN 网址访问其图片。~~
> 已经移除对 CSDN 图床的支持。

Cookie 的获取：

chrome 对开对应网站登录后，按 F12 (鼠标右键选择 "检查")

![](https://user-gold-cdn.xitu.io/2019/3/12/16971aba849c8d4a?w=944&h=1296&f=png&s=377596)

选择上方 **NetWork** 后刷新页面，下拉找到 **Cookie** 一项（如果没有请在左侧换一个网址查看），
复制上述 **Cookie** 后面的内容到插件中。
