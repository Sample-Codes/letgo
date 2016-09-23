// Register `forSale` component, along with its associated controller and template
angular.
  module('newUser').
  component('newUser', {
      templateUrl: '/static/newUser/newUser.template.html',

    controller: function newUserController($scope, $http, $location) {
      var self = this;
        self.redirect = function() {
          console.log('User clicked submit with ', self.name, self.email, self.location);

        $http.post('/insertUser', $scope.$ctrl)
          .success(function(url, data, config) {
            console.log($scope.form);
            console.log('url: ', self.url);
            console.log('data: ', self.data);
            console.log('config: ', self.config);
            console.log("$http.post('/insertUser') triggered.");
            $location.url('/forSale');
          })
          .error(function(res) {
            console.log("error: " + res);
          });

        }
        self.cancel = function() {
          console.log('User cancelled registration form. Return to login page');
          $location.url('/login')
        }
    }
});