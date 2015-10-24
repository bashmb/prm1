angular.module('getContacts', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.contacts = {};

// Get all contact Data
    $http.get('/contacts')
        .success(function(data) {
            $scope.contacts = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
// Get contact names
$scope.getContactNames = function(){
    $http.get('/contacts')
        .success(function(data) {
            var results = []
            $scope.contacts = data;
            for (var i in data){
                results.push(data[i].firstname);
            }
            console.log(results);
            return results
        })
        .error(function(error){
            console.log('Error: ' + error);
        });
}


// Log a call
    $scope.addCall = function(req){
        console.log("You're gonna add a call here");
        console.log($scope.formData);
        $http.post('/calls', $scope.formData)
            .success(function(data){
                $scope.formData={};
                $scope.callData = data;
                console.log(data);
            })
            .error(function(error){
                console.log('Error: ' + error);
            })
    };

// Get All Calls
    $scope.getAllCalls = function(req){
    $http.get('/calls')
        .success(function(data) {
            $scope.calls = data;
            console.log(data);
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
            console.log(results)
            return results
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    }

// Get Call Count to Contact

    $scope.getCallCountToContact = function(req){
    $http.get('/calls')
        .success(function(data) {
            $scope.calls = data;
            var results = [];
            for (var i in data){
                if(data[i].contact === req){
                    results.push(data[i]);
                }
            }
            console.log(results.length)
            return results.length
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    }


// Create a new contact

    $scope.addContact = function(req){
        console.log('in add contact');
        console.log($scope.formData);
        $http.post('/contacts', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.contactData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
        });
    };
});