// Register `forSale` component, along with its associated controller and template
angular.
  module('forSale').
  component('forSale', {
    templateUrl: '/static/forSale/forSale.template.html',
    controller: function forSaleController($scope, $http, $location, $cookies, ListingService) {
      var self = this;
      console.log(this);
      self.orderProp = 'insert_ts';
      //self.username = decodeURIComponent($routeParams.username);
      //console.log("params: " + self.username);

      var cUserid = $cookies.get('userid');
      var cUsername = $cookies.get('name');
      var cLocation = $cookies.get('location');
      self.username = cUsername;
      self.location = cLocation;
      self.userId = cUserid;
      self.watching = 0;

      if (cUserid == undefined) {
        $location.url('/login');
      }

      //set/remove from watchlist
      self.likeMe = function (listing) {

        console.dir(listing)
        listing.liked = !listing.liked;

        console.dir(listing)
        self.listId = listing.listid;

        if (listing.liked) {
          listing.liked = true;

          console.log('listId' + self.listId)
          console.log('userId' + self.userId)


          $http.post('/insertWatchList/' + self.userId + '/' + self.listId)
            .success(function (response) {
              ++self.watching;
            })
            .error(function (res) {
              console.log("error: " + res);
            });
        } else {
          listing.liked = false;
          $http.post('/deleteWatchList/' + self.userId + '/' + self.listId)
            .success(function (response) {
              --self.watching;
            })
            .error(function (res) {
              console.log("error: " + res);
            });
        }

      }

      self.watchlist = function () {
        $http.get('/getWatchList/' + cUserid).then(function (response) {
          self.listings = response.data;
          for (var i = 0; i < self.listings.length; i++) {
            self.listings[i].liked = true;
          }
        });
      }

      //get all the listings
      ListingService.allList().then(function(dataResponse) {
        self.listings = dataResponse.data;
        console.log('listing count' + self.listings.length)

        if (self.listings.length > 0) {
          $http.get('/getWatchList/' + cUserid).then(function (response) {

            mylistings = response.data;
            console.log('my watch count' + mylistings.length)
            self.watching = mylistings.length;

            for (var i = 0; i < self.listings.length; i++) {
              self.listings[i].liked = false;
              for (var my = 0; my < mylistings.length; my++) {
                if (self.listings[i].listid === mylistings[my].listid) {
                  self.listings[i].liked = true;
                }
              }
            }
          });
        }
      });
      
      //** click item to get more details
      self.itemdetail = function(listing) {
        console.log(listing);
        //$location.url('/itemDetail').search({id: listing.listid, loc: listing.location});
        $location.url('/itemDetail/'+listing.listid)
      }

      //** click submit
      self.redirect = function () {
        $location.url('/newListing/');
      }

      //** click Sign Out
      self.signout = function () {
        $cookies.remove('userid');
        $cookies.remove('email');
        $cookies.remove('name');
        $cookies.remove('location');
        reloadBG();   //** reload background image *optional*
        $location.url('/login');
      }

      self.unsubscribe = function () {
        console.log('unsubcribe here')
        ListingService.unsubscribeUser(self.userId).then(function (dataResponse) {
          console.dir(dataResponse)
          self.signout();
        });
      }


    }
  }).directive('backImg', function () {
    return function (scope, element, attrs) {
      var img = attrs.backImg;
      var tImg = new Image();
      var tHeight, sH;

      tImg.onload = function () {
        tHeight = (Number(this.height) * 300) / Number(this.width);  //calculate proportional height
        sH = tHeight.toString() + 'px';
        element.css({
          'background-image': 'url(' + img + ')',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          'max-width': '100%',
          'width': '300px',
          'height': sH,
        });
      }
      tImg.src = img;
      console.log("image file: " + img);
    };
  });