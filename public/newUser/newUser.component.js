// Register `forSale` component, along with its associated controller and template
angular.
  module('newUser').
  component('newUser', {
      templateUrl: 'newUser/newUser.template.html',

    controller: function newUserController($http) {

      $http.put('/insertUser').then(function(response) {
        var userId = response.data;

      });
    }
});