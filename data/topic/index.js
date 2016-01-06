var Topic = require('../../db/models').Topic;
var request = require('request-promise');
var config = require('../../config')['api'];

exports.updateTopic = function(){
	topicUrl = config['topic'];
	request(topicUrl).then(function(topics){
		topics = JSON.parse(topics);
		topics.forEach(function(topic,i){
			var key = topic.key;
			var frequence = topic.frequence;
			var entropy = topic.entropy;
			var gatherDgree = topic.gatherDgree;
			Topic.findOrCreate({where:{key:key},defaults:{frequence:frequence,entropy:entropy,gatherDgree:gatherDgree}})
			.spread(function(t){
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
