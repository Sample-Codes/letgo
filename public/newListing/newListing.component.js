// Register `forSale` component, along with its associated controller and template
angular.
  module('newListing').
  component('newListing', {
      templateUrl: '/static/newListing/newListing.template.html',

    controller: function newListingController($scope, $http, $location) {
      var self = this;
        self.redirect = function() {
          console.log('User clicked submit');
          console.log($scope.$ctrl);

        $http.post('/insertListing', $scope.$ctrl)
          .success(function(url, data, config) {
            console.log("$http.post('/insertPost') triggered.");
            $location.url('/forSale')
          })
          .error(function(res) {
            console.log("error: " + res);
          });

        }
        self.cancel = function() {
          console.log('User cancelled posting form.');
          $location.url('/forSale')
        }
    }
});