$(function () { 
    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Recent Calls'
        },
        xAxis: {
            categories: ['Mom', 'Dad', 'Kathryn', 'Caroline', 'Charlie']
        },
        yAxis: {
            title: {
                text: ''
            },
            tickInterval: 1
        },
        series: [{
            name: 'Visits',
            data: [1, 2, 3, 2, 2]
        }, {
            name: 'Calls',
            data: [4, 5, 3, 3, 4]
        }]
    });
});