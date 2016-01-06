//将时间转化为字符串
exports.timeToString = function(d){
	var year = d.getFullYear().toString();
	var month = (d.getMonth()+1).toString();
	var day = d.getDate().toString();
	if (month.length===1){
		month = '0'+month;
	}
	if (day.length===1){
		day = '0'+day;
	}
	var time = year+month+day;
	return time;
}