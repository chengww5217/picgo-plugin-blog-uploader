## picgo-plugin-blog-uploader

[![Downloads](https://img.shields.io/npm/dm/picgo-plugin-blog-uploader.svg?color=brightgreen)](https://npmcharts.com/compare/picgo-plugin-blog-uploader?minimal=true)
[![Version](https://img.shields.io/npm/v/picgo-plugin-blog-uploader.svg?color=brightgreen)](https://www.npmjs.com/package/picgo-plugin-blog-uploader)
[![License](https://img.shields.io/badge/license-mit-brightgreen.svg)](https://github.com/chengww5217/picgo-plugin-blog-uploader/blob/master/License)

English | [简体中文](./README-zh_CN.md)

A plugin for [PicGo](https://github.com/Molunerfinn/PicGo) with the addition of the image hosting of [JueJin](https://juejin.im), [JianShu](https://www.jianshu.com/) and [CSDN](https://blog.csdn.net/).

### Installation

- Online Installation

    Open the details window of [PicGo](https://github.com/Molunerfinn/PicGo), select **Plugin Settings**, and search **blog-uploader** for installation.
    Then restart the application.

- Offline Installation

    Clone this project and copy it to the folder below:
    - Windows: `%APPDATA%\picgo\`
    - Linux: `$XDG_CONFIG_HOME/picgo/` or `~/.config/picgo/`
    - macOS: `~/Library/Application\ Support/picgo/`

    Switch to the new directory and run `npm install ./picgo-plugin-blog-uploader`.
    Then restart the application.

### Cookie

JueJin don't need the cookie, other blogs need.
Moreover, the images uploaded to CSDN blog have cross-domain restrictions, which prohibit non-CSDN websites from accessing their images.

How to get the cookie:

After login to the corresponding chrome website, press F12 (right mouse button to select "check")

![](https://user-gold-cdn.xitu.io/2019/3/12/16971aba849c8d4a?w=944&h=1296&f=png&s=377596)

Select **NetWork** at the top and refresh the page. Pull down to find **Cookie** (if not, please change a website on the left).

Copy the contents of the **Cookie** into the plugin.


