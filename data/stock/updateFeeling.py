# -*- coding: UTF-8 -*-
#关于股票的现骨干数据都在这里
import MySQLdb
import requests
import datetime
import json
import string
import traceback
db=MySQLdb.connect(host="rds4ek6486f81kpp056bo.mysql.rds.aliyuncs.com",user="cia",passwd="ciacia",db="cia",charset="utf8")
cursor = db.cursor()

#查询当天的情趣指数
def updateFeeling(stocks):
	#获取当前时间
	day = 0
	time = getTime(day)
	#生成sql开始保存数据
	c = config()
	sql = "SELECT keyword,count(*) b from t_news_zw a where a.rate > 0 AND servicetype = 2 AND \
	 a.publishtime < DATE_SUB(CURRENT_DATE(),INTERVAL %d DAY) AND a.publishtime >= DATE_SUB(CURRENT_DATE(),INTERVAL %d DAY)  GROUP BY a.keyword  ORDER BY b DESC"%(day-1,day)
	try:
		cursor.execute(sql)
		results = cursor.fetchall()
		for result in results:
			#获取股票对应的ID
			url1 = c['url']+'/api/stockName/'+result[0]
			stock = requests.get(url1)
			id = json.loads(stock.text)["id"]
			#将情绪数据存储到数据库中
			feelingIndex = result[1] - countNegative(result[0],day)
			data = {"feelingIndex":feelingIndex,"StockId":id,"time":time,"stockName":result[0]}
			print data
			url2 = c['url']+'/api/feelings'
			r = requests.post(url2,data=data)
			print r.text.encode('utf8')
			db.commit()
	except:
		traceback.print_exc()
	#遍历所有股票更新情绪数据
	for stock in stocks:
		#计算并保存股票7日平均值
		weekAverageIndex = getAverage(0,7,stock);
		print weekAverageIndex

#获取关键字的负面新闻条数
def countNegative(keyword,day):
	sql = "SELECT count(*) b from t_news_zw a where a.keyword= '%s' AND a.rate < 0 AND servicetype = 2 AND \
	 a.publishtime < DATE_SUB(CURRENT_DATE(),INTERVAL %d DAY) AND a.publishtime >= DATE_SUB(CURRENT_DATE(),INTERVAL %d DAY)  GROUP BY a.keyword  ORDER BY b DESC"%(keyword,day-1,day)
	try:
		cursor.execute(sql)
		result = cursor.fetchone()
		if result == None:
			return 0
		else:
			return result[0]
	except:
		traceback.print_exc()


#获取股票的在时间段内情绪的平均值
def getAverage(day,num,stock):
	c = config()
	time1 = getTime(day+num)
	time2 = getTime(day)
	stockName = stock["stockName"]
	StockId = stock["id"]
	data = {"stockName":stockName,"start":time1,"end":time2,"StockId":StockId}
	url = c['url']+'/api/index/'+str(num)
	r = requests.get(url,data=data)
	return  string.atof(r.text)

#获取所有的股票数
def getAllStock():
	c = config()
	url = c['url']+'/api/stocks'
	r = requests.get(url);
	return json.loads(r.text);


#读取配置信息
def config():
	f = file("../config.json")
	s = json.load(f)
	return s['analyse']

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
	stocks = getAllStock()
	updateFeeling(stocks)
	db.close()
