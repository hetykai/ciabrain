"use strict";

module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define("Topic", {
    key:{type:DataTypes.STRING, unique: true},//帖子时间
    frequence:DataTypes.INTEGER,//帖子内容
    entropy:DataTypes.DOUBLE,
    gatherDegree:DataTypes.DOUBLE
  });
  return Topic;
};