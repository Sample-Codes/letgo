//Details
angular.
  module('itemDetail').
  component('itemDetail', {
    templateUrl: '/static/itemDetail/itemDetail.template.html',
    controller: function itemDetailController($scope, $http, $location, $cookies, $routeParams, ListingService ) {
      var self = this;

      // self.listid = $location.$$search.id;
      //var listing = ListingService.singleItem(self.listid,)
      //self.city = $location.$$search.loc;

      self.listid = $routeParams.listid;
      console.log("listid from route params: " + self.listid);
      
      ListingService.allList().then(function(dataResponse) {
                    // category:"soccer"
                    // description:"soccer ball"
                    // imageFile:"456"
                    // insertDt:"2016-09-23 14:08:48"
                    // listid:1
                    // location:"Baltimore"
                    // price:25
                    // status:"POSTED"
                    // userEmail:"test@letgo.com"
                    // userName:"testsqlname"
                    // userid:1
        //self.listings = dataResponse.data[self.listid-1];
        self.listing = ListingService.singleItem(self.listid, dataResponse.data);
      });


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