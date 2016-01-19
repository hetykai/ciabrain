(function($){
    var url = '/api/topics'
    $.ajax({
        url: url,
        type: 'GET',
        success: function(response) {
            $("#test0").empty();
            response.forEach(function(topic,i){
                var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '#'>"+topic["key"]+"</a></td><td class = 'center'>"+topic["frequence"]+"</td></tr>"
                $("#test0").append(html);
            })
        },
        error: function(){
            alert('获取数据失败');
        }
    });
    //今日概念
    $('#1day').click(function(){
        var url = '/api/frequenceIndex/1'
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                $("#test1").empty();
                response.forEach(function(topic,i){
                    var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '#'>"+topic["key"]+"</a></td><td class = 'center'>"+topic["frequence"]+"</td></tr>"
                    $("#test1").append(html);
                })
            },
            error: function(){
                alert('获取数据失败');
            }
        });
    });
    //3日概念
    $('#3day').click(function(){
        var url = '/api/frequenceIndex/3'
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                $("#test3").empty();
                response.forEach(function(topic,i){
                    var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '#'>"+topic["key"]+"</a></td><td class = 'center'>"+topic["frequence"]+"</td></tr>"
                    $("#test3").append(html);
                })
            },
            error: function(){
                alert('获取数据失败');
            }
        });
    });
    //7日概念
    $('#7day').click(function(){
        var url = '/api/frequenceIndex/7'
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                $("#test7").empty();
                response.forEach(function(topic,i){
                    var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '#'>"+topic["key"]+"</a></td><td class = 'center'>"+topic["frequence"]+"</td></tr>"
                    $("#test7").append(html);
                })
            },
            error: function(){
                alert('获取数据失败');
            }
        });
    });
    //获取14数据
    $('#14day').click(function(){
        var url = '/api/frequenceIndex/14'
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
                $("#test14").empty();
                response.forEach(function(topic,i){
                    var html = "<tr><td class='center'>"+(i+1)+"</td><td class='center'><a href = '#'>"+topic["key"]+"</a></td><td class = 'center'>"+topic["frequence"]+"</td></tr>"
                    $("#test14").append(html);
                })
            },
            error: function(){
                alert('获取数据失败');
            }
        });
    });
})(jQuery); // end of jQuery name space