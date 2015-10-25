angular.module('getContacts', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
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
        console.log('in add contact');
        console.log($scope.formData);
        $http.post('/contacts', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.contactData = data;
                // console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
        });
    };
})
// ***********************------------------------------


.controller('viewFunctions', function($scope, $http){
   // Get Call Count to Contact

    $scope.contactNames = [];

// Get contact names and call counts
    $http.get('/contacts')
        .success(function(data) {
            var results = []
            $scope.contacts = data;
            for (var i in data){
                    results.push({id: data[i].id, firstname: data[i].firstname, count: 17});    
                }
            $scope.contactNames = results
            })
        .error(function(error){
            console.log('Error: ' + error);
        });

// Get All Calls
    $scope.getAllCalls = function(req){
    $http.get('/calls')
        .success(function(data) {
            $scope.calls = data;
            // console.log(data);
            return data
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    }


// Get Calls to a Contact
    $scope.getCallsToContact = function(req){
    $http.get('/calls')
        .success(function(data) {
            $scope.calls = data;
            var results = [];
            for (var i in data){
                if(data[i].contact === req){
                    results.push(data[i]);
                }
            }
            // console.log(results)
            return results
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    }

    $scope.getCallCountToContact = function(req){
        $http.get('/calls')
            .success(function(data) {
                var count = 0;
                for (var i in data){
                    if(data[i].contact === req){
                        count += 1
                    }
                }
                return count
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    }
});