angular.module('getContacts', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.newContact = {};
    $scope.contacts = {};

// Get all contact Data
    $http.get('/contacts')
        .success(function(data) {
            $scope.contacts = data;
            // console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

// Log a call
    $scope.addCall = function(req){
        $http.post('/calls', $scope.formData)
            .success(function(data){
                $scope.formData={};
                $scope.callData = data;
                // console.log(data);
            })
            .error(function(error){
                console.log('Error: ' + error);
            })
    };
// Create a new contact

    $scope.addContact = function(req){
        $http.post('/contacts', $scope.newContact)
            .success(function(data) {
                
                var newFirstName = $scope.newContact.firstname
                
                $scope.formData = {};
                $scope.contactData = data;
                $scope.contacts.push({firstname: newFirstName})


                console.log("******")
                console.log($scope.newContact)
                console.log($scope.contacts)

                console.log("******")
            })
            .error(function(error) {
                console.log('Error: ' + error);
        });
    };
})
// ***********************------------------------------

// Details Page Controllers
.controller('details', ['$scope', '$routeParams', function($scope, $http){
    $http.get('/calls/:id')
        .success(function(data) {

        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    }])



// ***********************------------------------------


// Charts Controllers
.controller('callsBar', function($scope, $http){
    $http.get('/count/calls/' )
        .success(function(data) {
            var xData = []
            var yData = []
            for(i = 0; i < data.length; i++){
                xData.push(data[i].firstname)
                yData.push(parseInt(data[i].count))
            }

    $(function () { 
        $('#callBar').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Recent Calls'
            },
            xAxis: {
                categories: xData
            },
            yAxis: {
                title: {
                    text: ''
                },
                tickInterval: 1
            },
            series: [
            // {
            //     name: 'Visits',
            //     data: [1, 2, 3, 2, 2]
            // }, 
            {
                name: 'Calls',
                data: yData
            }]
        });
    });

            $scope.barData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    })


// call count by date
.controller('dateLine', function($scope, $http){
    $http.get('/count/date')
        .success(function(data) {
        var chartData = []
        console.log(data)
        for (i = 0; i < data.length; i ++){
            var date = data[i].date.split("T")
            var dateSplit = date[0].split('-')
            console.log(dateSplit)
            chartData.push([Date.UTC(dateSplit[0], dateSplit[1]-1, dateSplit[2]), parseInt(data[i].count)])
        }
        console.log("chartData:")
        console.log(chartData)

$(function () {
    $('#dateLineChart').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Calls'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e %b %y'
            },
            
            title: {
                text: 'Date'
            }
        },
        yAxis: {    
            title: {
                text: 'Calls'
            },
            min: 0
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: [{
            name: 'Total Calls',
            data: chartData
                 }]
    });
});



    
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    })

