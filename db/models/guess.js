"use strict";
var time = require('../../help/time');
module.exports = function(sequelize, DataTypes) {

	var time = today();
  	var Guess = sequelize.define("Guess", {
		preValue: {type:DataTypes.INTEGER,defaultValue:0},
		time: {type:DataTypes.STRING, defaultValue:time},
		trueValue : {type:DataTypes.INTEGER,defaultValue:0}
	});
  	return Guess;
};

//获取今天的时间
function today(){
  var d = new Date();
  return time.timeToString(d);
}
