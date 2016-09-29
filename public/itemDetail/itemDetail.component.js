//Details
angular.
  module('itemDetail').
  component('itemDetail', {
    templateUrl: '/static/itemDetail/itemDetail.template.html',
    controller: function itemDetailController($scope, $http, $location, $cookies) {
      var self = this;

      var cLocation = $cookies.get('location');

      self.city = cLocation;
      console.log(self);
    }
  });