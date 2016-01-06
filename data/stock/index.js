var Promise = require("bluebird");
var cp = require('child_process');
var exec = Promise.promisify(cp.exec);


//更新情绪面
exports.updateFeeling = function(){
	exec('python ../data/stock/updateFeeling.py',{
		maxBuffer: 5000 * 1024
	})
		.then(function(stdout){
			console.log(stdout);
		})
		.catch(function(e){
		    console.log(e);
    });
}

//更新交易数据数据
exports.updateTrade = function(){
	exec('python ../data/stock/updateTrade.py',{
		maxBuffer: 5000 * 1024
	})
		.then(function(stdout){
			console.log(stdout);
		})
		.catch(function(e){
		    console.log(e);
    });
}


