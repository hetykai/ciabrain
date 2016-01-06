var express = require('express');
var wechat = require('wechat');
var weixinCon = require('../config')["weixin"];
var weixin = require('./index');
var request = require('request-promise');
var config = {
  token: weixinCon["token"],
  appid: weixinCon["appID"],
  // encodingAESKey: 'encodinAESKey'
};
module.exports = function(app){
  app.use(express.query());
  app.use('/api/weixin/confirm', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(message);
    if (message.Event ==='subscribe'){
      // 用户首次登陆时发消息提示
      res.reply('欢迎使用鹰眼投资策略系统！')

    }else if (message.MsgType === 'text') {
      // 回复屌丝(普通回复)
      var url = 'http://www.tuling123.com/openapi/api?key='+weixinCon["robotKey"]+'&info='+message.Content
      request(url).then(function(response){
        console.log(response);
        res.reply(response.text);
      });
    }
  }));
}

// weixin.createMenu(function(r){
//   console.log(r);
// })
