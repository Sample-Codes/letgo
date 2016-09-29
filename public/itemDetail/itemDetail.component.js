//Details
angular.
  module('itemDetail').
  component('itemDetail', {
    templateUrl: '/static/itemDetail/itemDetail.template.html',
    controller: function itemDetailController($scope, $http, $location, $cookies) {
      var self = this;

      self.listid = $location.$$search.id;
      self.city = $location.$$search.loc;

      //** click go back to forSale
      self.goback = function () {
        $location.url('/forSale');
      }

      //** click chat
      self.ask = function() {
        document.getElementById("chat").style.display = "block";
      }
      
      //** click chat
      self.closechat = function() {
        document.getElementById("chat").style.display = "none";
      }      
    }
  });