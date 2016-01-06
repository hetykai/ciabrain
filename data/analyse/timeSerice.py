# -*- coding: UTF-8 -*-
#分析股票的时间序列数据
import requests
import json

#获取股票的数据
feeling_url = "http://localhost:4444/api/feelings/2664"
trade_url = "http://localhost:4444/api/trades/2664"

#请求数据
def getData(url):
	r = requests.get(url)
	return json.loads(r.text)
#获取股票的数据
feeling_list = getData(feeling_url)
trade_list = getData(trade_url)

