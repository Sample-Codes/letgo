// Register `forSale` component, along with its associated controller and template
angular.
  module('newListing')
  .component('newListing', {
    templateUrl: '/static/newListing/newListing.template.html',

    controller: function newListingController($scope, $http, $location) {
      var self = this;

      self.redirect = function () {
        console.log('User clicked submit');
        console.log('service here')
        
        console.log($scope);
        console.log($scope.$ctrl);

         console.log('service here')
         console.dir($scope.$ctrl.myFile)
        var fd = new FormData();
        fd.append('file', $scope.$ctrl.myFile);
        fd.append('userId', $scope.$ctrl.userId);
        fd.append('description', $scope.$ctrl.description);
        fd.append('category', $scope.$ctrl.category);
        fd.append('price', $scope.$ctrl.price);
        fd.append('location', $scope.$ctrl.location);

        $http.post('/insertListing', fd, {
           transformRequest: angular.identity,
           headers: { 'Content-Type': undefined }
         }
         )
          .success(function (res, url, data, config) {
            console.log('res')
            console.dir(res)
            console.log("$http.post('/insertPost') triggered.");
            $location.url('/forSale')
          })
          .error(function (res) {
            console.log("error: " + res);
          });

      }
      self.cancel = function () {
        console.log('User cancelled posting form.');
        $location.url('/forSale')
      }
    }
  });