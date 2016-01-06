(function($){
	window.onload = function(){
		var href = window.location.href;
		var url = '/api/feelings'+ href.substr(href.indexOf('s/')+1);
		var id = href.substr(href.indexOf('s/')+2)
		$.ajax({
			url:url,
			type:'GET',
			success:function(results){
				stockPrice(id,function(trades){
					var timeSet = ['x'];
					var indexlist = [];
					var weekAverageIndex = ['7日利好'];
					var closePriceList =['收盘价'];
					results.forEach(function(result,i){
						// 查找当前时间的位置
						trades = array(trades);
						var trade = trades.find({ time : result['time'] });
						indexlist.push(result['feelingIndex']);
						weekAverageIndex.push(result['weekAverageIndex']);
						timeSet.push(result['time']);
						if(trade&&i>=0){
							closePriceList.push(trade["closePrice"]);
						}else if(i>=0){
							closePriceList.push(closePriceList[closePriceList.length-1]);
						};
					});
					var chart = c3.generate({
						padding: {
					        top: 10,
					        right: 60,
					        bottom: 10,
					        left: 60,
					    },
					    data: {
					        x: 'x',
					        xFormat: '%Y%m%d',
					        columns: [
					            timeSet,
					            weekAverageIndex,
					            closePriceList
					        ],
					        axes:{
					        	'收盘价':'y2'
					        }
					    },
					    axis: {
					        x: {
					            type: 'timeseries',
					            tick: {
					            	count: 4,
					                format: '%Y%m%d'
					            }
					        },
					        y: {
						        label: {
						          text: '7日利好',
						          position: 'outer-middle'
						        }
						    },
					        y2:{
					        	show:true,
					        	label: {
						          text: '收盘价',
						          position: 'outer-middle'
						        }
					        }
					    },
					    color:{
					    	pattern:['#1f77b4', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728']
					    }
					});
				});
			}
		})
	}
	//获取股票的价格
	function stockPrice(ID,callback){
		var url = '/api/trades/'+ID;
		$.ajax({
			url:url,
			type:'GET',
			success:function(trades){
				callback(trades);
			}
		});
	}
})(jQuery); // end of jQuery name space

