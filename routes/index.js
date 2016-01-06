var express = require('express');
var User = require('../db/models').User;
var Result = require('../db/models').Result;
var Guess = require('../db/models').Guess;
var Feeling = require('../db/models').Feeling;
var Stock = require('../db/models').Stock;
var weixin = require('../weixin');
var router = express.Router();
var moment = require('moment');
var time = require('../help/time');



//竞猜页面
///////////////////////////////////////////////////
router.get('/', function(req, res) {
  if (!req.session.user) {
    //获取url
    var url = weixin.getOathUrl();
    res.redirect(url);
  }else{
    var time = today();
    var tradeAble = tradeTime(time);
    Result.findOrCreate({where:{time:time},defaults:{time:time}})
    .spread(function(result){
      preValue = toStr(result.preValue);
      trueValue = toStr(result.trueValue);
      res.render('index', {
        title: '猜涨跌',
        time :time,
        tradeAble:tradeAble,
        preValue:preValue,
        trueValue:trueValue,
        user:req.session.user
      });
    });
  }
});

//用户个人主页，他人访问
///////////////////////////////////////////////////
router.get('/guesses/:userId',function(req,res){
  if (!req.session.user) {
    //获取url
    var url = weixin.getOathUrl();
    res.redirect(url);
  }else{
    var time = today();
    var tradeAble = tradeTime(time);
    var id = req.params.userId;
    Guess.findOrCreate({where:{time:time,UserId:id},defaults:{time:time,UserId:id}})
    .spread(function(guess){
      preValue = toStr(guess.preValue);
      trueValue = toStr(guess.trueValue);
      res.render('self', {
        title: '个人主页',
        time :time,
        tradeAble:tradeAble,
        preValue:preValue,
        trueValue:trueValue,
        user:req.session.user
      });
    });
  }
});

//用户个人主页，自己访问
///////////////////////////////////////////////////
router.get('/me',function(req,res){
  if (!req.session.user) {
    //获取url
    var url = weixin.getOathUrl();
    res.redirect(url);
  }else{
    var time = today();
    var tradeAble = tradeTime(time);
    var user = req.session.user;
    var id = user.id;
    Guess.findOrCreate({where:{time:time,UserId:id},defaults:{time:time,UserId:id}})
    .spread(function(guess){
      preValue = toStr(guess.preValue);
      trueValue = toStr(guess.trueValue);
      res.render('self', {
        title: '个人主页',
        time :time,
        tradeAble:tradeAble,
        preValue:preValue,
        trueValue:trueValue,
        user:req.session.user
      });
    });
  }
});


//琅琊榜页面
///////////////////////////////////////////////////
router.get('/ranklist',function(req,res){
  if (!req.session.user) {
    //获取url
    var url = weixin.getOathUrl();
    res.redirect(url);
  }else{
    var time = today();
    User.findAll({order:'rate desc'}).then(function(users){
      res.render('ranklist',{
        users:users,
        user:req.session.user,
        title:'琅琊榜',
        time:time
      })
    });
  }
});


//股票相关类的页面
///////////////////////////////////////////////////
//情绪页面
router.get('/feelings',function(req,res){
  var time = today();
  Feeling.findAll({order:"feelingIndex desc",where:{time:time,feelingIndex:{$ne:0}}}).then(function(feelings){
    res.render('feeling',{
      title:'舆情指数排行',
      feelings:feelings
    })
  }).catch(function(err){
    res.send(err);
  });
});


router.get('/feelings/:time',function(req,res){
  var time = req.params.time;
  Feeling.findAll({order:"id",where:{time:time}}).then(function(feelings){
    res.render('feeling',{
      title:'利好指数排行',
      feelings:feelings
    })
  }).catch(function(err){
    res.send(err);
  });
})


//股票情绪走势
router.get('/stocks/:StockId',function(req,res){
  var id = req.params.StockId;
  Stock.findOne({where:{id:id}}).then(function(stock){
    res.render('stock',{
      title:stock.stockName,
      stock:stock
    })
  }).catch(function(err){
    res.send(err);
  });
});


//概念面
///////////////////////////////////////////////////
router.get('/topics',function(req,res){
  res.render('topic',{
    title:'热门概念排行',
  });
});




//OAUTH验证
///////////////////////////////////////////////////
router.get('/oauth',function(req,res){
  var code = req.query.code;
  //获取用户信息
  weixin.getUserInfo(code,function(user){
    console.log(user);
    User.findOrCreate({where:{username:user.nickname},defaults:{username:user.nickname,imageUrl:user.headimgurl,password:"123456"}})
    .spread(function(u){
      req.session.user = u;
      res.redirect('/');
    });
  });
});




function toStr(value){
  if (value>0){
      return '涨';
    }else if (value<0){
      return '跌';
    }else{
      return '无';
  }
}


//获取今天的时间
function today(){
  var d = new Date();
  return time.timeToString(d);
}

//判断当天是否是交易时间
function tradeTime(time){
  var config = require('../config');
  var list = config["analyse"]["untradeTime"];
  if (list.indexOf(time)=== -1){
    return true;
  }else{
    return false;
  }
}


module.exports = router;
