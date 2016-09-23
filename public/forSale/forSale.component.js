// Register `forSale` component, along with its associated controller and template
angular.
  module('forSale').
  component('forSale', {
    templateUrl: '/static/forSale/forSale.template.html',
    // template:
    //     '<ul>' +
    //       '<li ng-repeat="phone in $ctrl.phones">' +
    //         '<span>{{phone.name}}</span>' +
    //         '<p>{{phone.snippet}}</p>' +
    //       '</li>' +
    //     '</ul>',
    controller: function forSaleController($http, $routeParams, $location) {
      var self = this;
      self.orderProp = 'insert_ts';
      self.username = decodeURIComponent($routeParams.username);
      console.log("params: " + self.username);

      $http.get('/getListings').then(function (response) {
        self.listings = response.data;

      });

       self.redirect = function () {
        
        $location.url('/newListing/');
      }

    }
  });