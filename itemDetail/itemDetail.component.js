angular.
  module('itemDetail').
  component('itemDetail', {
    template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>',
    controller: ['$routeParams',
      function PhoneDetailController($routeParams) {
        this.listId = $routeParams.listId;
      }
    ]
  });