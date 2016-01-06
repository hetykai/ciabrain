(function($){
	var url = '/api/topics'
	$.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
        	response.forEach(function(topic,i){
        		var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '#'>"+topic["key"]+"</a></td><td class = 'center'>"+topic["frequence"]+"</td></tr>"
				$("#test1").append(html);
        	})
        },
        error: function(){
        	alert('获取数据失败');
       	}
    });
})(jQuery); // end of jQuery name space