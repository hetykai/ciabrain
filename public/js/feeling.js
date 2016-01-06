(function($){
	//三日利好
	$('#3day').click(function(){
		var url = '/api/feelingIndex/3'
		$.ajax({
	        url: url,
	        type: 'GET',
	        success: function(response) {
	        	response.forEach(function(stock,i){
	        		var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '/stocks/"+stock["StockId"]+"'>"+stock["stockName"]+"</a></td><td class = 'center'>"+stock["feelingIndex"]+"</td></tr>"
					$("#test3").append(html);
	        	})
	        },
	        error: function(){
	        	alert('获取数据失败');
	       	}
	    });
	});
	//获取五日数据
	$('#7day').click(function(){
		var url = '/api/feelingIndex/7'
		$.ajax({
	        url: url,
	        type: 'GET',
	        success: function(response) {
	        	response.forEach(function(stock,i){
	        		var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '/stocks/"+stock["StockId"]+"'>"+stock["stockName"]+"</a></td><td class = 'center'>"+stock["feelingIndex"]+"</td></tr>"
					$("#test7").append(html);
	        	})
	        },
	        error: function(){
	        	alert('获取数据失败');
	       	}
	    });
	});
	//获取五日数据
	$('#14day').click(function(){
		var url = '/api/feelingIndex/14'
		$.ajax({
	        url: url,
	        type: 'GET',
	        success: function(response) {
	        	response.forEach(function(stock,i){
	        		var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '/stocks/"+stock["StockId"]+"'>"+stock["stockName"]+"</a></td><td class = 'center'>"+stock["feelingIndex"]+"</td></tr>"
					$("#test14").append(html);
	        	})
	        },
	        error: function(){
	        	alert('获取数据失败');
	       	}
	    });
	});
})(jQuery); // end of jQuery name space