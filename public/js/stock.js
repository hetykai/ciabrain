(function($){
	window.onload = function(){
		var href = window.location.href;
		var url = '/api/feelings'+ href.substr(href.indexOf('s/')+1);
		$.ajax({
			url:url,
			type:'GET',
			success:function(results){
				var timeSet = [];
				var indexlist = [];
				var weekAverageIndex = [];
				results.forEach(function(result,i){
					indexlist.push(result['feelingIndex']);
					weekAverageIndex.push(result['weekAverageIndex']);
					timeSet.push(result['time'].substr(4));
				})
				var lineChartData = {
					labels :timeSet,
					datasets : [
						{
							label: "猜涨跌结果",
							fillColor : "rgba(151,187,205,0.2)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							pointHighlightFill : "#fff",
							pointHighlightStroke : "#fff",
							data : weekAverageIndex
						}
					]
				}
				var ctx = document.getElementById("canvas").getContext("2d");
				window.myLine = new Chart(ctx).Line(lineChartData, {
					responsive: true,
					scaleFontColor : "#fff",
					scaleShowGridLines : false,
					scaleShowLabels : true,
					pointHitDetectionRadius : 4,
				});
			}
		})
	}
})(jQuery); // end of jQuery name space

