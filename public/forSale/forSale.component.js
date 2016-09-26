// Register `forSale` component, along with its associated controller and template
angular.
  module('forSale', ['ngCookies']).
  component('forSale', {
      templateUrl: '/static/forSale/forSale.template.html',

      controller: function forSaleController($scope, $http, $location, $cookies) {
        var self = this;
        self.orderProp = 'insert_ts';

        $http.get('/getListings').then(function(response) {
          self.listings = response.data;

        });

        //** click Sign Out
        self.signout = function() {
          $cookies.remove('userid');
          $cookies.remove('email');
          $cookies.remove('name');
          $cookies.remove('location');
          reloadBG();   //** reload background image *optional*
          $location.url('/login');
        }    
    }
});