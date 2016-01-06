#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import time
import datetime
# from datetime import datetime
import requests
from dataapiclient import Client
client = Client()
client.init('925d3d1fa72df1e083f80e1e4153c18151d16763583e87bd194e724a09b0bb16')

class Stock:
	#获得沪深300的每日行情
	def getHS300(self,time):
		url = '/api/market/getMktIdxd.json?field=&beginDate=&endDate=&indexID=&ticker=399300&tradeDate='+time
		code, result = client.getData(url)
		a = json.loads(result)
		return a
	#获得沪深股票的列表
	def getStockInfo(self):
		url = '/api/equity/getEqu.json?field=&listStatusCD=&secID=&ticker=&equTypeCD=A'
		code, result = client.getData(url)
		a = json.loads(result)
		return a
	#获取历史的股票信息
	def getTradeData(self,ticker):
		url = '/api/market/getMktEqud.json?field=&beginDate=20150901'+'&endDate=&secID=&ticker='+ticker+'&tradeDate='
		code, result = client.getData(url)
		a = json.loads(result)
		return a
	#获取昨日股票收盘价
	def getNewData(self,ticker):
		yestoday = getTime(1)
		url = '/api/market/getMktEqud.json?field=&beginDate=&endDate=&secID=&ticker='+ticker+'&tradeDate='+yestoday
		code, result = client.getData(url)
		a = json.loads(result)
		return a
	#获取昨日股票
	def getStockData(self,ticker):
		if ticker[:2] =='60':
			stockName = ticker+'.sh'
		else:
			stockName = ticker+'.sz'
		url = "http://cjhq.baidu.com/quote?s4="+stockName
		r = requests.get(url)
		rlist = r.text.split('"')
		print rlist
		op =float(rlist[7])
		la = float(rlist[17])
		return la

#辅助函数
# 转化时间格式
def getTime(day):
	now = datetime.datetime.now()
	time = now - datetime.timedelta(days=day)
	year = str(time.year)
	month = str(time.month)
	day = str(time.day)
	if len(month) == 1:
		month = '0'+month
	if len(day) == 1:
		day = '0'+ day
	return year+month+day

if __name__ == '__main__':
	s = Stock()
	print s.getNewData('601628')