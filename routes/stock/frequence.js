"use strict";
var Frequence = require('../../db/models').Frequence;
var time = require('../../help/time');
var s = require('../../help/sort');
var express = require('express');
var router = express.Router();

//获取指定话题的所有热度数据
router.route('/frequences/:TopicId')
	.get(function(req,res){
		var id = req.params.TopicId;
		Frequence.findAll({order:"time",where:{TopicId:id}}).then(function(frequences){
			res.json(frequences);
		}).catch(function(err){
			res.send(err);
		});
	});

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
			var topicNames = {};
			var results = [];
			var location = 0;
			frequences.forEach(function(result){
				var topicName = result.topicName;
				var frequence = result.frequence;
				var TopicId = result.TopicId;
				if (topicNames[topicName]||topicNames[topicName]==0){
					results[topicNames[topicName]]["frequence"] = results[topicNames[topicName]]["frequence"] + frequence;
				}else{
					topicNames[topicName]=location
					results.push({"frequence":frequence,"TopicId":TopicId,"topicName":topicName});
					location++;
				}
			});
			//对result进行排序
			res.json(s.sortObj(results,'frequence','dasc'));
		});
	});


module.exports = router;
