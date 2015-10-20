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
});