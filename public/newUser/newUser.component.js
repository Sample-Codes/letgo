// Register `forSale` component, along with its associated controller and template
angular.
  module('newUser').
  component('newUser', {
      //** template
      templateUrl: '/static/newUser/newUser.template.html',
      //** controller
      controller: function newUserController($scope, $http, $location) {
      var self = this;
        //** click submit 
        self.redirect = function() {
          $http.post('/insertUser', $scope.$ctrl)
            .success(function(url, data, config) {
              console.log($scope.form);
              reloadBG();   //** reload background image *optional*
              $location.url('/forSale');
            })
            .error(function(res) {
              console.log("error: " + res);
            });
        }
        //** click cancel
        self.cancel = function() {
          console.log('User cancelled registration form. Return to login page');
          reloadBG();   //** reload background image *optional*
          $location.url('/login')
        }
    }
});