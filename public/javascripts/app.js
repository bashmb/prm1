angular.module('getContacts', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.contacts = {};

    // Get all contacts
    $http.get('/contacts')
        .success(function(data) {
            $scope.contacts = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

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