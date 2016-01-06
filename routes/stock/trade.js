var express = require('express');
var Trade = require('../../db/models').Trade;
var router = express.Router();

//获取所有的股票历史数据
///////////////////////////////////////////////////
router.route('/trades')
	.get(function(req,res){
		Trade.findAll().then(function(c){
			res.json(c);
		}).catch(function(err){
			console.log(err);
		});
	})
	.post(function(req,res){
		var turnoverVol = req.body.turnoverVol;
		var turnoverValue = req.body.turnoverValue;
		var turnoverRate = req.body.turnoverRate;
		var time = req.body.tradeDate;
		var ticker = req.body.ticker;
		var stockName = req.body.stockName;
		var preClosePrice = req.body.preClosePrice;
		var PE = req.body.PE;
		var PB = req.body.PB;
		var openPrice = req.body.openPrice;
		var negMarketValue = req.body.negMarketValue;
		var marketValue = req.body.marketValue;
		var lowestPrice = req.body.lowestPrice;
		var highestPrice = req.body.highestPrice;
		var closePrice = req.body.closePrice;
		var actPreClosePrice = req.body.actPreClosePrice;
		var id = req.body.StockId;

		Trade.findOrCreate({where:{ticker:ticker,time:time},defaults:{
			turnoverVol : turnoverVol,
			turnoverValue : turnoverValue,
			turnoverRate : turnoverRate,
			preClosePrice : preClosePrice,
			PE : PE,
			PB : PB,
			stockName:stockName,
			openPrice : openPrice,
			negMarketValue : negMarketValue,
			marketValue : marketValue,
			lowestPrice : lowestPrice,
			highestPrice : highestPrice,
			closePrice : closePrice,
			actPreClosePrice : actPreClosePrice,
			StockId : id
		}})
		.spread(function(trade){
			trade.turnoverVol = turnoverVol;
			trade.turnoverValue = turnoverValue;
			trade.turnoverRate = turnoverRate;
			trade.preClosePrice = preClosePrice;
			trade.PE = PE;
			trade.PB = PB;
			trade.stockName = stockName;
			trade.openPrice = openPrice;
			trade.negMarketValue = negMarketValue;
			trade.marketValue = marketValue;
			trade.lowestPrice = lowestPrice;
			trade.highestPrice = highestPrice;
			trade.closePrice = closePrice;
			trade.actPreClosePrice = actPreClosePrice;
			trade.StockId = id;
			trade.save();
			res.send('股票数据更新成功！');
		}).catch(function(err){
			res.send(err);
		});
	});


//按照股票寻找股票价格
router.get('/trades/:StockId',function(req,res){
	var id = req.params.StockId;
	Trade.findAll({where:{StockId:id}}).then(function(trades){
		res.json(trades);
	}).catch(function(err){
		res.send(err);
	});
})
module.exports = router;
