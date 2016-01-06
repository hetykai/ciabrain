"use strict";
module.exports = function(sequelize, DataTypes) {
  var Feeling = sequelize.define("Feeling", {
  	feelingIndex:{type:DataTypes.INTEGER,defaultValue:0},
  	weekAverageIndex:{type:DataTypes.DOUBLE(3,2),defaultValue:0},
  	time:DataTypes.STRING,
  	stockName:DataTypes.STRING
  });
  return Feeling;
};
