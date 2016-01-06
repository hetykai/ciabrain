
# -*- coding: UTF-8 -*-
from stockapi import Stock
import requests
import json

#将股票的数据保存到数据库中
def save(stocklist):
	for stock in stocklist:
		c = config()
		ticker = stock['ticker']
		secShortName = stock['secShortName']
		data ={"ticker":ticker,"stockName":secShortName}
		url =c["url"]+"/api/stocks"
		r = requests.post(url,data=data)
		print r.text.encode('utf8')


#读取配置信息
def config():
	f = file("../config.json")
	s = json.load(f)
	return s['analyse']

if __name__ == '__main__':
	s = Stock()
	stocklist = s.getStockInfo()["data"]
	save(stocklist)
