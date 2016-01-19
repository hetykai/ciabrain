"use strict";
var Frequence = require('../../db/models').Frequence;
var time = require('../../help/time');
var s = require('../../help/sort');
var express = require('express');
var router = express.Router();

//获取连续几日的词频
router.route('/frequenceIndex/:type')
	.get(function(req,res){
		var type = req.params.type;
		var day1 = new Date();
		var day2 = new Date(day1.getTime() - type*24*60*60*1000);
		var time1 = time.timeToString(day1);
		var time2 = time.timeToString(day2);
		Frequence.findAll({where:{time:{$gt:time2,$lte:time1},frequence:{$ne:0}}}).then(function(frequences){
			//将获取到得内容进行归类统计
			var keys = {};
			var results = [];
			var location = 0;
			frequences.forEach(function(result){
				var key = result.key;
				var frequence = result.frequence;
				var TopicId = result.TopicId;
				if (keys[key]||keys[key]==0){
					results[keys[key]]["frequence"] = results[keys[key]]["frequence"] + frequence;
				}else{
					keys[key]=location
					results.push({"frequence":frequence,"TopicId":TopicId,"key":key});
					location++;
				}
			});
			console.log(keys);
			//对result进行排序
			res.json(s.sortObj(results,'frequence','dasc'));
		});
	});


module.exports = router;
