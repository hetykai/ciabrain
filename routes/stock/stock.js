var express = require('express');
var Stock = require('../../db/models').Stock;
var router = express.Router();

//获取当前用户的总数
///////////////////////////////////////////////////
router.route('/stocks')
	.get(function(req,res){
		Stock.findAll().then(function(c){
			res.json(c);
		}).catch(function(err){
			console.log(err);
		});
	})
	.post(function(req,res){
		var stockName = req.body.stockName;
		var ticker = req.body.ticker;
		Stock.findOrCreate({where:{ticker:ticker}})
		.spread(function(stock){
			stock.stockName=stockName;
			stock.ticker = ticker;
			stock.save();
		});
		res.send('股票更新成功!');
	});

//根据股票的名字获取股票的ID
///////////////////////////////////////////////////
router.route('/stockName/:stockName')
	.get(function(req,res){
		var stockName = req.params.stockName;
		Stock.findOne({where:{stockName:stockName}}).then(function(stock){
			res.json(stock);
		}).catch(function(err){
			console.log(err);
		});
	});
//根据股票的的代码获取股票的数据
///////////////////////////////////////////////////
router.route('/tickerName/:ticker')
	.get(function(req,res){
		var ticker = req.params.ticker;
		Stock.findOne({where:{ticker:ticker}}).then(function(stock){
			res.json(stock);
		}).catch(function(err){
			console.log(err);
		});
	});

module.exports = router;