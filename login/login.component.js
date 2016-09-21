// Register `login` component, along with its associated controller and template
angular.
  module('login').
  component('login', {
      templateUrl: 'login/login.template.html',
    // template:
    //     '<ul>' +
    //       '<li ng-repeat="phone in $ctrl.phones">' +
    //         '<span>{{phone.name}}</span>' +
    //         '<p>{{phone.snippet}}</p>' +
    //       '</li>' +
    //     '</ul>',
    controller: function loginController($http) {
      var self = this;
            self.submit = function () {
                console.log('User clicked submit with ', self.userName);
                self.welcomeMessage = "Welcome, " + self.userName;
            }
      });
    }
});
