// Register `forSale` component, along with its associated controller and template
angular.
  module('newUser').
  component('newUser', {
      templateUrl: '/static/newUser/newUser.template.html',

    controller: function newUserController($http, $location) {
      var self = this;
            self.redirect = function() {
              console.log('User clicked submit with ', self.name, self.email, self.location);
              //insertUser(self.name, self.email, self.location);
              $http.put('/insertUser').then(function(response) {
                var userId = response.data;
              });
              $location.url('/forSale')
            }
            self.cancel = function() {
              console.log('User cancelled registration form. Return to login page');
              $location.url('/login')
            }

     

    }
});