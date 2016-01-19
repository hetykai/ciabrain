var Topic = require('../../db/models').Topic;
var Frequence = require('../../db/models').Frequence;
var time = require('../../help/time');
var request = require('request-promise');
var config = require('../../config')['api'];

exports.updateTopic = function(){
	topicUrl = config['topic'];
	request(topicUrl).then(function(topics){
		topics = JSON.parse(topics);
		topics.forEach(function(topic,i){
			var topicName = topic.key;
			var frequence = topic.frequence;
			var entropy = topic.entropy;
			var gatherDgree = topic.gatherDgree;
			Topic.findOrCreate({where:{topicName:topicName},defaults:{frequence:frequence,entropy:entropy,gatherDgree:gatherDgree}})
			.spread(function(t){
				var id = t.id;
				updateFrequence(frequence-t.frequence,id,t.topicName,today());
				//更新话题
				t.frequence = frequence;
				t.entropy =entropy;
				t.gatherDgree = gatherDgree;
				t.save();
				console.log('话题更新成功');
			}).catch(function(err){
				console.log(err);
			});
		});
	});
}


//更新频率
function updateFrequence(frequence,id,topicName,time){
	Frequence.findOrCreate({where:{topicName:topicName,time:time},defaults:{frequence:frequence,topicName:topicName,TopicId:id}})
	.spread(function(f){
		f.frequence = frequence+f.frequence;
		f.save();
	}).catch(function(err){
		console.log(err);
	});
};

//获取今天的时间
function today(){
  var d = new Date();
  return time.timeToString(d);
}