(function($){
    window.onload = function(){
        var href = window.location.href;
        var url = '/api/frequences'+ href.substr(href.indexOf('s/')+1);
        var id = href.substr(href.indexOf('s/')+2);
        $.ajax({
            url:url,
            type:'GET',
            success:function(results){
                var timeSet = ['x'];
                var hotlist =['概念热度'];
                results.forEach(function(result,i){
                    hotlist.push(result['frequence']);
                    timeSet.push(result['time']);
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
                            hotlist
                        ]
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                count: Math.min(results.length,7),
                                format: '%Y%m%d'
                            }
                        }
                    },
                    color:{
                        pattern:['#1f77b4', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728']
                    }
                });
            }
        });
    }
})(jQuery); // end of jQuery name space

