# 疫程

当前患者不断确诊，患者的历史行程也在持续披露中，疫程帮助用户查询自己的行程中是否有患者确诊，同时支持订阅行程，在行程出现疫情时及时通过微信通知用户。

## 特性

* 基于小程序，即扫即用
* 可以通过模板消息订阅行程

## 依赖

* uniapp
* 云开发

## 部署说明

参见 [deployment.md](deployment.md)

## 贡献指南

参见 [contributing.md](contributing.md)

## Bug 反馈

如有 Bug，请通过 issue 提交反馈

## 联系方式

longlyshidenggui@gmail.com

## 变更日志

参见 [changelog.md](changelog.md)

## LICENSE

[MIT](LICENSE)


## 技术框架

* 小程序框架：使用 uniapp，基于 Vue 的语法
* CSS 框架：tailwindcss，基于原子类设计思想
* 后端框架：基于云开发，6 个云函数加 1 个触发器
* 架构：使用领域驱动设计（DDD）

## 结果展示

### 查询患者行程

- 点击右上角的按钮订阅对应的行程通知
- 点击患者行程可以复制来源链接到浏览器中打开


![](https://gitee.com/shidenggui/assets/raw/master/uPic/1.%20查询.jpeg)

### 订阅界面

![](https://gitee.com/shidenggui/assets/raw/master/uPic/2.%20订阅.jpeg)

### 订阅提醒

![3.提醒](https://gitee.com/shidenggui/assets/raw/master/uPic/3.%20提醒.jpeg)

### 历史通知

![4.历史通知](https://gitee.com/shidenggui/assets/raw/master/uPic/4.%20历史通知.jpeg)


## 目录结构

```
.
├── cloud-functions // 云函数
├── pages // 页面
├── components // 页面组件
├── domains // 业务逻辑
├── mock // 测试数据
```

## cloud-functions

云函数，主要包括对订阅数据的增删改查和一个定时触发器用于行程提醒

```
cloud-functions
├── subscribeTravel // 订阅行程通知
└── unsubscribeTravel // 取消订阅行程通知
├── isTravelSubscribed // 查询行程是否被订阅
├── travelSubscriptions // 已订阅行程
├── notifyHistory // 订阅提醒历史
├── notifyByUpdatedPatientTravels // 订阅提醒触发器
```

## pages

```
pages
├── index.vue // 查询行程
└── subscriptions.vue // 订阅列表
├── history.vue // 订阅提醒历史
```

## components

```
components
└── ncov-travel.vue // 行程组件
├── ncov-patient-travel.vue // 患者行程组件
```

## domains

主要封装了前端相关的业务逻辑

```
domains
├── infrastructure // 非业务领域的技术细节封装
└── travel-query // 业务逻辑
```

### infrastructure

```
infrastructure
├── permissions // 微信权限申请
├── presentation // 微信界面封装，包括 toast、loading 等
├── requests // 网络请求的封装
└── storage // 存储相关
├── settings.js // 配置文件
```

### travel-query 
基于领域驱动设计（DDD)，处理业务逻辑

```
travel-query
└── value-objects // 模型定义
├── services // 业务服务接口
├── repositories // 存储的封装
├── apis // 对第三方网络 api 的封装
├── constants.js // 常量
```

## mock

测试数据

```
mock
├── data.js
└── mock-travels.js
```
