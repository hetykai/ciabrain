// 所有关于数据的工作
var stock = require('./stock');
var topic = require('./topic');
var time = require('../help/time');
var schedule = require('node-schedule');
var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];

// 所有关于数据的跑批工作
// =============================================================================
exports.schedule = function(){
	//每隔一个小时更新一次情绪指数
	updateFeeling()
	//每隔1个小时更新一次话题
	updateTopic()
	//每天早晨零点更新昨日股票交易信息
	updateTrade()

}

// 辅助函数
// =============================================================================
function updateTrade(){
	schedule.scheduleJob(config["updateTrade"],function(){
		stock.updateTrade();
	});
}

function updateTopic(){
	schedule.scheduleJob(config["updateTopic"],function(){
		topic.updateTopic();
	});
}


function updateFeeling(){
	schedule.scheduleJob(config["updateFeeling"],function(){
		stock.updateFeeling();
	});
}

//获取今天的时间
function today(){
  var d = new Date();
  return time.timeToString(d);
}

//判断当天是否是交易时间
function tradeTime(time){
	var config = require("../config");
	var list = config["analyse"]["untradeTime"];
	if (list.indexOf(time)=== -1){
	return true;
	}else{
	return false;
	}
}
// topic.updateTopic();