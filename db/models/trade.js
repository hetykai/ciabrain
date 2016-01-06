"use strict";

module.exports = function(sequelize, DataTypes) {
  var Trade = sequelize.define("Trade", {
    turnoverVol   :DataTypes.DOUBLE,//成交量
    turnoverValue :DataTypes.DOUBLE,//成交金额
    turnoverRate  :DataTypes.DOUBLE,//日换手率
    time          :DataTypes.STRING,//交易日
    ticker        :DataTypes.STRING,//证券代码
    stockName     :DataTypes.STRING,
    preClosePrice :DataTypes.DOUBLE,//昨收盘
    PE            :DataTypes.DOUBLE,//滚动市盈率
    PB            :DataTypes.DOUBLE,//市净率
    openPrice     :DataTypes.DOUBLE,//今开盘
    negMarketValue:DataTypes.DOUBLE,//流通市值
    marketValue   :DataTypes.DOUBLE,//总市值
    lowestPrice   :DataTypes.DOUBLE,//最低价
    highestPrice  :DataTypes.DOUBLE,//最高价
    closePrice    :DataTypes.DOUBLE,//今收盘
    actPreClosePrice:DataTypes.DOUBLE//实际昨收盘
  });
  return Trade;
};
