"use strict";

module.exports = function(sequelize, DataTypes) {
  var Frequence = sequelize.define("Frequence", {
    frequence:{type:DataTypes.INTEGER,defaultValue:0},
    key:DataTypes.STRING,//帖子时间
    time:DataTypes.STRING,
    TopicId:DataTypes.INTEGER
  });
  return Frequence;
};