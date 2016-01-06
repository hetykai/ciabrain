
# -*- coding: UTF-8 -*-
from stockapi import Stock
import requests
import json

#将股票的数据保存到数据库中
def save():
	c = config()
	url = c['url']+'/api/stocks'
	r = requests.get(url)
	stocklist = json.loads(r.text)
	for i in xrange(len(stocklist)):
		saveTradeData(stocklist[i])
#将股票的交易数据保存到数据库中
def saveTradeData(stock):
	c = config()
	s = Stock()
	#获取股票对应的ID
	id = stock['id']
	stockName = stock['stockName']
	ticker = stock['ticker']
	#获取该股票的历史数据
	tradeDatas = s.getTradeData(ticker)
	#判断该股票是否有当天的信息
	if tradeDatas['retCode'] != -1:
		for t in tradeDatas["data"]:
			url2 = c['url']+'/api/trades'
			turnoverVol= t['turnoverVol']
			turnoverRate = t['turnoverRate']
			turnoverValue = t['turnoverValue']
			tradeDate = t['tradeDate'].replace('-','')
			preClosePrice = t['preClosePrice']
			PE = t['PE']
			PB =t['PB']
			openPrice = t['openPrice']
			negMarketValue = t['negMarketValue']
			marketValue = t['marketValue']
			lowestPrice = t['lowestPrice']
			highestPrice = t['highestPrice']
			closePrice = t['closePrice']
			actPreClosePrice = t['actPreClosePrice']
			data = {'ticker':ticker,'StockId':id,'stockName':stockName,'turnoverVol':turnoverVol,'turnoverValue':turnoverValue,'turnoverRate':turnoverRate,'tradeDate':tradeDate,'preClosePrice':preClosePrice,'PE':PE,'PB':PB,'openPrice':openPrice,
			'negMarketValue':negMarketValue,'marketValue':marketValue,'lowestPrice':lowestPrice,'highestPrice':highestPrice,'closePrice':closePrice,'actPreClosePrice':actPreClosePrice}
			print data
			r = requests.post(url2,data = data)
			print r.text.encode('utf8')


#读取配置信息
def config():
	f = file("../config.json")
	s = json.load(f)
	return s['analyse']

if __name__ == '__main__':
	save()
