// Register `login` component, along with its associated controller and template
angular.
  module('login').
  component('login', {
    templateUrl: '/static/login/login.template.html',
    // template:
    //     '<ul>' +
    //       '<li ng-repeat="phone in $ctrl.phones">' +
    //         '<span>{{phone.name}}</span>' +
    //         '<p>{{phone.snippet}}</p>' +
    //       '</li>' +
    //     '</ul>',
    controller: function loginController($http, $location) {
      var self = this;
      self.redirect = function () {
        console.log('User clicked submit with ', self.userName);
        var email = encodeURIComponent(self.userName);

        $location.url('/forSale/' + email);
      }
      self.register = function () {
        $location.url('/newUser')
      }
    }

  });
