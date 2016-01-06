"use strict";
var time = require('../../help/time');
module.exports = function(sequelize, DataTypes) {

	var time = today();
  	var Result = sequelize.define("Result", {
		preValue: {type:DataTypes.INTEGER,defaultValue:0},
		trueValue : {type:DataTypes.INTEGER,defaultValue:0},
		time: {type:DataTypes.STRING, defaultValue:time,unique:true},
	});
  	return Result;
};

//获取今天的时间
function today(){
  var d = new Date();
  return time.timeToString(d);
}
