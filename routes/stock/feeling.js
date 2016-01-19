var express = require('express');
var Feeling = require('../../db/models').Feeling;
var s = require('../../help/sort');
var router = express.Router();


//获取当前用户的总数
///////////////////////////////////////////////////
router.route('/feelings')
	.get(function(req,res){
		Feeling.findAll().then(function(c){
			res.json(c);
		}).catch(function(err){
			console.log(err);
		});
	})
	.post(function(req,res){
		var time = req.body.time;
		var id = req.body.StockId;
		var index = req.body.feelingIndex;
		var stockName = req.body.stockName;
		var weekAverageIndex = req.body.weekAverageIndex;
		console.log(time);
		Feeling.findOrCreate({where:{StockId:id,time:time},defaults:{StockId:id,time:time,feelingIndex:index,stockName:stockName,weekAverageIndex:weekAverageIndex}})
		.spread(function(stock){
			stock.feelingIndex = index;
			stock.weekAverageIndex = weekAverageIndex;
			stock.stockName = stockName;
			stock.save();
		});
		res.send('舆情指数更新成功');
	});

router.route('/feelings/:StockId')
	.get(function(req,res){
		var id = req.params.StockId;
		Feeling.findAll({order:"time",where:{StockId:id}}).then(function(feelings){
			res.json(feelings);
		}).catch(function(err){
			res.send(err);
		});
	});


//获取5日数据
router.route('/feelingIndex/:type')
	.get(function(req,res){
		var type = req.params.type;
		var day1 = new Date();
		var day2 = new Date(day1.getTime() - type*24*60*60*1000);
		var time1 = timeToString(day1);
		var time2 = timeToString(day2);
		Feeling.findAll({where:{time:{$gt:time2,$lte:time1},feelingIndex:{$ne:0}}}).then(function(feelings){
			//将获取到得内容进行归类统计
			var stocks = {};
			var results = [];
			var location = 0;
			feelings.forEach(function(result){
				var stock = result.stockName;
				var feelingIndex = result.feelingIndex;
				var StockId = result.StockId;
				if (stocks[stock]||stocks[stock]==0){
					results[stocks[stock]]["feelingIndex"] = results[stocks[stock]]["feelingIndex"] + feelingIndex;
				}else{
					stocks[stock]=location
					results.push({"feelingIndex":feelingIndex,"StockId":StockId,"stockName":stock});
					location++;
				}
			});
			//对result进行排序
			res.json(s.sortObj(results,'feelingIndex','dasc'));
		});
	});


//根据起始时间、终止时间和股票名称获取该股票时间段的平均值的数据
router.route('/index/:type')
	.get(function(req,res){
		var type = req.params.type;
		var number = parseInt(type);
		var id = req.body.StockId;
		var stockName = req.body.stockName;
		var start = req.body.start;
		var end = req.body.end;
		Feeling.findOrCreate({where:{StockId:id,time:end},defaults:{StockId:id,time:end,stockName:stockName}})
		.spread(function(stock){
			Feeling.sum('feelingIndex',{where:{stockName:stockName,time:{$gt:start,$lte:end},feelingIndex:{$ne:0}}}).then(function(sum){
				if(sum){
					var average = parseFloat(sum/number);
					stock.weekAverageIndex = average;
					stock.save();
					res.json(average);
				}else{
					res.json(0);
				}
			});
		}).catch(function(err){
			res.json(err);
		});
	});

//将时间转换为字符串
function timeToString(d){
  var year = d.getFullYear().toString();
  var month = (d.getMonth()+1).toString();
  var day = d.getDate().toString();
  if (month.length===1){
  	month = '0'+month;
  }
  if (day.length===1){
  	day = '0'+day;
  }
  var time = year+month+day;
  return time;
}


module.exports = router;


