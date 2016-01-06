"use strict";
module.exports = function(sequelize, DataTypes) {
  var Stock = sequelize.define("Stock", {
  	ticker:{type:DataTypes.STRING,unique:true},
  	stockName:DataTypes.STRING
  });
  return Stock;
};
