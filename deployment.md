# 部署文档

1. 下载 [Hbuilder App 开发版](https://www.dcloud.io/hbuilderx.html)
2. `git clone https://github.com/shidenggui/ncov.git` 下载项目代码
3. 使用 Hbuilder 打开项目，并通过`菜单 - 运行 - 运行小程序模型器 - 微信小程序` 运行，此时微信开发者工具会自动打开并加载代码

## 云开发配置

* 创建云环境，并将 `domains/infrastructure/settings.js` 里的 `CLOUD_ENV` 改为创建的云环境名
* 云函数位于 `cloud-functions` 下，六个云函数需要全部部署，同时 `notifyByUpdatedPatientTravels` 的 `config.js` 包含的触发器配置也需要部署
* 小程序后台需要配置安全域名为 `https://2019ncov.nosugartech.com/`

## 发布

需要将 `manifest.json` 中 `mp-weixin` 字段下面的 `appid` 改为你自己申请的小程序 id

